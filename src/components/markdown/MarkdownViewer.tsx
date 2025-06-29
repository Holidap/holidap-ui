"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Upload, FileText, ExternalLink, Tag, AlertCircle } from "lucide-react";

interface MarkdownViewerProps {
  staticFilePath?: string;
}

interface Frontmatter {
  title?: string;
  tags?: string[];
  [key: string]: any;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ staticFilePath }) => {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [frontmatter, setFrontmatter] = useState<Frontmatter | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      setFileName(filePath.split("/").pop() || "sample.md");
    } catch (error) {
      console.error("파일 로드 실패:", error);
      setError(error instanceof Error ? error.message : "파일을 불러오는데 실패했습니다.");
      setMarkdownContent("");
      setFrontmatter(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".md")) {
      setError("Markdown 파일(.md)만 업로드 가능합니다.");
      return;
    }

    setIsLoading(true);
    setError("");
    const reader = new FileReader();

    reader.onload = e => {
      const rawContent = e.target?.result as string;
      const { frontmatter, content } = parseFrontmatter(rawContent);

      setFrontmatter(frontmatter);
      setMarkdownContent(content);
      setFileName(file.name);
      setIsLoading(false);
    };

    reader.onerror = () => {
      setError("파일을 읽는데 실패했습니다.");
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  const closeFile = () => {
    setMarkdownContent("");
    setFrontmatter(null);
    setFileName("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Markdown 뷰어
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {staticFilePath && (
              <Button
                onClick={() => loadStaticFile(staticFilePath)}
                variant="outline"
                disabled={isLoading}
              >
                샘플 파일 로드
              </Button>
            )}

            <Button onClick={triggerFileInput} variant="outline" disabled={isLoading}>
              <Upload className="w-4 h-4 mr-2" />
              MD 파일 업로드
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".md"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {markdownContent && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{fileName}</CardTitle>
            <Button onClick={closeFile} variant="ghost" size="sm" className="h-8 w-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-6">
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
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Remove h1 from markdown content if we're showing title from frontmatter
                    h1: ({ children }) => {
                      // frontmatter가 있고 title이 있으면 h1을 h2로 변환
                      return frontmatter?.title ? (
                        <h2 className="text-2xl font-semibold mt-8 mb-4">{children}</h2>
                      ) : (
                        <h1 className="text-3xl font-bold mt-8 mb-6">{children}</h1>
                      );
                    },
                    // 이미지 크기 제한 추가
                    img: ({ src, alt, ...props }) => (
                      <img
                        src={src}
                        alt={alt}
                        className="max-w-[50vw] max-h-[50vh] object-contain rounded-lg shadow-sm my-4"
                        {...props}
                      />
                    ),
                    a: ({ href, children, ...props }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-400 underline decoration-primary/50 hover:decoration-primary transition-colors"
                        {...props}
                      >
                        {children}
                        <ExternalLink className="w-3 h-3 inline-block" />
                      </a>
                    ),
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
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading...</span>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MarkdownViewer;
