import { GuideItemType } from "@/type/guide";

export const CategoryData: string[] = ["캐나다", "한국", "항공"];

export const GuideData: GuideItemType[] = [
  {
    id: "canada_sim_card_application",
    title: "캐나다 유심 신청 및 현지 사용",
    category: "캐나다",
    tags: "모바일",
    filePath: "/content/canada_sim_card_application.md",
  },
  {
    id: "canada-immigration-packing-guide",
    title: "수화물 준비",
    category: "한국",
    tags: "항공",
    filePath: "/content/canada-immigration-packing-guide.md",
  },
  {
    id: "basic-documents",
    title: "기본준비물 (Document)",
    category: "한국",
    tags: "서류",
    filePath: "/content/basic-documents.md",
  },
  {
    id: "one-way-ticket-booking",
    title: "비행기 편도 예매",
    category: "한국",
    tags: "항공",
    filePath: "/content/one-way-ticket-booking.md",
  },
  {
    id: "job-platforms-in-canada",
    title: "현지 잡 구하는 플랫폼 소개",
    category: "캐나다",
    tags: "취업",
    filePath: "/content/job-platforms-in-canada.md",
  },
  {
    id: "useful-apps-in-canada",
    title: "캐나다 유용한 앱 추천",
    category: "캐나다",
    tags: "생활",
    filePath: "/content/useful-apps-in-canada.md",
  },
];
