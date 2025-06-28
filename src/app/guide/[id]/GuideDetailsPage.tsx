import MarkdownReader from "@/components/markdown/MarkdownReader";

function GuideDetailsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Guide Details</h1>
      <MarkdownReader staticFilePath="/content/sample.md" />
    </div>
  );
}

export default GuideDetailsPage;
