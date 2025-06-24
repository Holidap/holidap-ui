"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Upload, FileText } from "lucide-react";

interface MarkdownViewerProps {
  staticFilePath?: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ staticFilePath }) => {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const loadStaticFile = async (filePath: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(filePath);
      if (!response.ok) throw new Error("파일을 불러올 수 없습니다");
      const content = await response.text();
      setMarkdownContent(content);
      setFileName(filePath.split("/").pop() || "sample.md");
    } catch (error) {
      console.error("파일 로드 실패:", error);
      alert("파일을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".md")) {
      alert("Markdown 파일(.md)만 업로드 가능합니다.");
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = e => {
      const content = e.target?.result as string;
      setMarkdownContent(content);
      setFileName(file.name);
      setIsLoading(false);
    };

    reader.onerror = () => {
      alert("파일을 읽는데 실패했습니다.");
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  const closeFile = () => {
    setMarkdownContent("");
    setFileName("");
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

      {markdownContent && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{fileName}</CardTitle>
            <Button onClick={closeFile} variant="ghost" size="sm" className="h-8 w-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: ({ node, className, children, ...props }) => {
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
