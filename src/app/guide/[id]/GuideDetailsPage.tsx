"use client";

import { useParams } from "next/navigation";
import _ from "lodash";
import MarkdownReader from "@/components/markdown/MarkdownReader";
import { GuideData } from "@/data/GuideData";
import { GuideItemType } from "@/type/guide";

function GuideDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const currentGuide: GuideItemType | undefined = _.find(GuideData, { id: id });

  if (!id || !currentGuide) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">가이드를 찾을 수 없습니다</h1>
        <p>요청하신 가이드가 존재하지 않습니다.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* <h1 className="text-3xl font-bold mb-8">{currentGuide.title}</h1> */}
      <MarkdownReader staticFilePath={currentGuide?.filePath || "/content/sample.md"} />
    </div>
  );
}

export default GuideDetailsPage;
