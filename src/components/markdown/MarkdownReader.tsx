"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ExternalLink, Tag } from "lucide-react";

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
  useEffect(() => {
    if (staticFilePath) {
      loadStaticFile(staticFilePath);
    }
  }, [staticFilePath]);

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
                <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-base prose-h6:text-sm prose-p:text-base prose-p:leading-7 prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      // 헤딩 스타일링
                      h1: ({ children }) => {
                        if (frontmatter?.title) {
                          return (
                            <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">
                              {children}
                            </h2>
                          );
                        }
                        return (
                          <h1 className="text-3xl font-bold mt-8 mb-6 text-foreground">
                            {children}
                          </h1>
                        );
                      },
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-bold mt-6 mb-3 text-foreground">{children}</h3>
                      ),
                      h4: ({ children }) => (
                        <h4 className="text-lg font-bold mt-5 mb-2 text-foreground">{children}</h4>
                      ),
                      h5: ({ children }) => (
                        <h5 className="text-base font-bold mt-4 mb-2 text-foreground">
                          {children}
                        </h5>
                      ),
                      h6: ({ children }) => (
                        <h6 className="text-sm font-bold mt-3 mb-2 text-foreground">{children}</h6>
                      ),
                      // 리스트 스타일링
                      ul: ({ children }) => (
                        <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>
                      ),
                      li: ({ children }) => <li className="text-base leading-7">{children}</li>,
                      // 단락 스타일링
                      p: ({ children }) => <p className="text-base leading-7 my-4">{children}</p>,
                      // 이미지 크기 제한
                      img: ({ src, alt, ...props }) => (
                        <img
                          src={src}
                          alt={alt}
                          className="max-w-[50vw] max-h-[50vh] object-contain rounded-lg shadow-sm my-4"
                          {...props}
                        />
                      ),
                      // 링크 스타일링
                      a: ({ href, children, ...props }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-500 transition-colors"
                          {...props}
                        >
                          {children}
                          <ExternalLink className="w-3 h-3 inline-block" />
                        </a>
                      ),
                      // 코드 스타일링
                      code: ({ className, children, ...props }) => {
                        const isInline = !className?.includes("language-");
                        return isInline ? (
                          <code className="bg-muted px-2 py-1 rounded text-sm font-mono" {...props}>
                            {children}
                          </code>
                        ) : (
                          <code
                            className={`${className} block bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto`}
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                      // 인용구 스타일링
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-primary/30 pl-4 my-6 italic text-muted-foreground">
                          {children}
                        </blockquote>
                      ),
                      // 테이블 스타일링
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
                      // 수평선 스타일링
                      hr: () => <hr className="my-8 border-0 border-t border-border" />,
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
