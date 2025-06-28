import { GuideItemType } from "@/type/guide";

export const GuideData: GuideItemType[] = [
  {
    id: "documents",
    title: "서류",
    category: "한국에서",
    tags: "금융, 뱅킹",
    filePath: "public/content/documents.md",
  },
  {
    id: "basic-prep",
    title: "기본준비물 (document)",
    category: "한국에서",
    tags: "생활용품, 필수품",
    filePath: "public/content/basic-prep.md",
  },
  {
    id: "flight-prep",
    title: "비행기 짐도 예비 (항공사별 수화물 차이 등)",
    category: "항공",
    tags: "수화물, 항공사",
    filePath: "public/content/flight-prep.md",
  },
  {
    id: "additional-prep",
    title: "수화물 준비 (캐리어, 이민가방, 이삿박스 비교 등)",
    category: "항공",
    tags: "수화물, 이삿짐",
    filePath: "public/content/additional-prep.md",
  },
];
