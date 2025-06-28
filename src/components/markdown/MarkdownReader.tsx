"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertCircle } from "lucide-react";

interface MarkdownReaderProps {
  staticFilePath: string;
}

const MarkdownReader: React.FC<MarkdownReaderProps> = ({ staticFilePath }) => {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
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

  const loadStaticFile = async (filePath: string) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: 파일을 불러올 수 없습니다`);
      }

      const content = await response.text();
      setMarkdownContent(content);
      setFileName(filePath.split("/").pop() || "Unknown File");
    } catch (error) {
      console.error("파일 로드 실패:", error);
      setError(error instanceof Error ? error.message : "파일을 불러오는데 실패했습니다.");
      setMarkdownContent("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {fileName || "Markdown Reader"}
          </CardTitle>
          {staticFilePath && (
            <p className="text-sm text-muted-foreground">파일 경로: {staticFilePath}</p>
          )}
        </CardHeader>
        <CardContent>
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

          {!isLoading && !error && markdownContent && (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
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
                    <div className="overflow-x-auto">
                      <table className="border-collapse border border-border">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-border px-4 py-2 bg-muted text-left">
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

          {!isLoading && !error && !markdownContent && staticFilePath && (
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
