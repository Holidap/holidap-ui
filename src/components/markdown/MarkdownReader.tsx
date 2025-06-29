"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Tag } from "lucide-react";

interface MarkdownReaderProps {
  staticFilePath?: string;
}

interface Frontmatter {
  title?: string;
  tags?: string[];
  [key: string]: any;
}

const MarkdownReader: React.FC<MarkdownReaderProps> = ({
  staticFilePath = "/content/sample.md",
}) => {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [frontmatter, setFrontmatter] = useState<Frontmatter | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && staticFilePath) {
      loadStaticFile(staticFilePath);
    }
  }, [staticFilePath, isMounted]);

  if (!isMounted) {
    return null;
  }

  const parseFrontmatter = (
    content: string,
  ): { frontmatter: Frontmatter | null; content: string } => {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
      return { frontmatter: null, content };
    }

    const [, yamlContent, markdownContent] = match;

    try {
      const frontmatter: Frontmatter = {};
      const lines = yamlContent.split("\n");
      let currentKey = "";
      let isArray = false;

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        if (trimmedLine.startsWith("- ")) {
          // Array item
          if (isArray && currentKey) {
            if (!frontmatter[currentKey]) frontmatter[currentKey] = [];
            (frontmatter[currentKey] as string[]).push(trimmedLine.substring(2).trim());
          }
        } else if (trimmedLine.includes(":")) {
          const colonIndex = trimmedLine.indexOf(":");
          const key = trimmedLine.substring(0, colonIndex).trim();
          const value = trimmedLine.substring(colonIndex + 1).trim();

          currentKey = key;
          isArray = false;

          if (value) {
            frontmatter[key] = value.replace(/['"]/g, "");
          } else {
            isArray = true;
            frontmatter[key] = [];
          }
        }
      }

      return { frontmatter, content: markdownContent };
    } catch (error) {
      console.error("Frontmatter parsing error:", error);
      return { frontmatter: null, content: markdownContent };
    }
  };

  const loadStaticFile = async (filePath: string) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: 파일을 불러올 수 없습니다`);
      }

      const rawContent = await response.text();
      const { frontmatter, content } = parseFrontmatter(rawContent);

      setFrontmatter(frontmatter);
      setMarkdownContent(content);
    } catch (error) {
      console.error("파일 로드 실패:", error);
      setError(error instanceof Error ? error.message : "파일을 불러오는데 실패했습니다.");
      setMarkdownContent("");
      setFrontmatter(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardContent className="p-6">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2">Loading...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {!isLoading && !error && (frontmatter || markdownContent) && (
            <div className="space-y-6">
              {/* Frontmatter Section */}
              {frontmatter && (
                <div className="border-b pb-6 mb-6">
                  {frontmatter.title && (
                    <h1 className="text-3xl font-bold mb-4">{frontmatter.title}</h1>
                  )}

                  {frontmatter.tags &&
                    Array.isArray(frontmatter.tags) &&
                    frontmatter.tags.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <Tag className="w-4 h-4 text-muted-foreground" />
                        <div className="flex gap-2 flex-wrap">
                          {frontmatter.tags.map((tag: string, index: number) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Display other frontmatter fields */}
                  {Object.entries(frontmatter).map(([key, value]) => {
                    if (key === "title" || key === "tags") return null;
                    return (
                      <div key={key} className="mt-2 text-sm text-muted-foreground">
                        <span className="font-medium capitalize">{key}:</span> {String(value)}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Markdown Content */}
              {markdownContent && (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      // Remove h1 from markdown content if we're showing title from frontmatter
                      h1: ({ children }) => {
                        if (frontmatter?.title) {
                          return <h2 className="text-2xl font-semibold mt-8 mb-4">{children}</h2>;
                        }
                        return <h1 className="text-3xl font-bold mt-8 mb-6">{children}</h1>;
                      },
                      code: ({ className, children, ...props }) => {
                        const isInline = !className?.includes("language-");
                        return isInline ? (
                          <code className="bg-muted px-1 py-0.5 rounded text-sm" {...props}>
                            {children}
                          </code>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-6">
                          <table className="border-collapse border border-border w-full">
                            {children}
                          </table>
                        </div>
                      ),
                      th: ({ children }) => (
                        <th className="border border-border px-4 py-2 bg-muted text-left font-semibold">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="border border-border px-4 py-2">{children}</td>
                      ),
                    }}
                  >
                    {markdownContent}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          )}

          {!isLoading && !error && !markdownContent && !frontmatter && staticFilePath && (
            <div className="text-center py-8 text-muted-foreground">
              파일이 비어있거나 로드되지 않았습니다.
            </div>
          )}

          {!staticFilePath && (
            <div className="text-center py-8 text-muted-foreground">파일 경로를 제공해주세요.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MarkdownReader;
