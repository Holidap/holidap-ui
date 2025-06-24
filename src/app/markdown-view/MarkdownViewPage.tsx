import MarkdownViewer from "@/components/markdown/MarkdownViewer";

function MarkdownViewPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">마크다운 뷰어 테스트</h1>
      <MarkdownViewer staticFilePath="/content/sample.md" />
    </div>
  );
}

export default MarkdownViewPage;
