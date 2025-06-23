"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  FileText,
  Shield,
  CreditCard,
  Heart,
  MapPin,
  Plane,
  Building,
  X,
  Flag,
} from "lucide-react";

interface ChecklistItem {
  id: string;
  title: string;
  icon: React.ElementType;
  isCompleted?: boolean;
  details?: {
    description: string;
    requiredDocuments: string[];
    estimatedTime: string;
    tips: string[];
  };
}

interface ChecklistCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  items: ChecklistItem[];
  isExpanded: boolean;
}

export default function CheckListPage() {
  const [selectedItem, setSelectedItem] = useState<ChecklistItem | null>(null);
  const [categories, setCategories] = useState<ChecklistCategory[]>([
    {
      id: "korea",
      title: "한국에서",
      icon: Flag,
      isExpanded: false,
      items: [
        {
          id: "documents",
          title: "서류",
          icon: FileText,
          isCompleted: false,
          details: {
            description: "캐나다 입국에 필요한 기본 서류들을 준비하세요.",
            requiredDocuments: [
              "여권 (유효기간 6개월 이상)",
              "비자 또는 eTA",
              "입학허가서 또는 취업허가서",
              "재정증명서",
            ],
            estimatedTime: "2-3주",
            tips: ["모든 서류는 영문으로 번역 공증 받으세요", "원본과 사본을 각각 준비하세요"],
          },
        },
        {
          id: "basic-prep",
          title: "기본준비물 (document)",
          icon: FileText,
          isCompleted: true,
          details: {
            description: "캐나다 생활에 필요한 기본 서류들을 미리 준비하세요.",
            requiredDocuments: ["출생증명서", "졸업증명서", "성적증명서", "경력증명서"],
            estimatedTime: "1-2주",
            tips: ["아포스티유 확인서 발급받으세요", "영문 번역본도 함께 준비하세요"],
          },
        },
      ],
    },
    {
      id: "travel",
      title: "항공",
      icon: Plane,
      isExpanded: false,
      items: [
        {
          id: "flight-prep",
          title: "비행기 짐도 예비 (항공사별 수화물 차이 등)",
          icon: Plane,
          isCompleted: false,
          details: {
            description: "항공사별 수화물 규정을 확인하고 짐을 준비하세요.",
            requiredDocuments: ["항공권 예약 확인서", "수화물 신고서", "면세품 영수증"],
            estimatedTime: "출발 1주일 전",
            tips: [
              "액체류는 100ml 이하로 준비하세요",
              "전자기기는 휴대용 배터리 용량을 확인하세요",
            ],
          },
        },
        {
          id: "additional-prep",
          title: "수화물 준비 (캐리어, 이민가방, 이삿박스 비교 등)",
          icon: Shield,
          isCompleted: false,
          details: {
            description: "장기 체류용 수화물을 효율적으로 준비하세요.",
            requiredDocuments: ["수화물 목록서", "가전제품 영수증", "개인용품 목록"],
            estimatedTime: "출발 2주일 전",
            tips: ["이삿박스가 가장 경제적입니다", "깨지기 쉬운 물건은 휴대용으로"],
          },
        },
      ],
    },
    {
      id: "medical",
      title: "의료",
      icon: Heart,
      isExpanded: false,
      items: [
        {
          id: "health-insurance",
          title: "보험 관련 (한국/캐나다)",
          icon: Shield,
          isCompleted: false,
          details: {
            description: "한국과 캐나다 양쪽의 의료보험을 준비하세요.",
            requiredDocuments: ["해외여행보험 가입증명서", "기존 의료기록", "예방접종 증명서"],
            estimatedTime: "출발 1개월 전",
            tips: [
              "캐나다 도착 후 3개월간은 사설보험이 필요합니다",
              "치과 보험은 별도로 가입하세요",
            ],
          },
        },
        {
          id: "medical-records",
          title: "출국 전 예방접종",
          icon: Heart,
          isCompleted: false,
          details: {
            description: "캐나다 입국에 필요한 예방접종을 완료하세요.",
            requiredDocuments: [
              "국제예방접종증명서",
              "의료기록 영문번역본",
              "처방전 (복용 중인 약물)",
            ],
            estimatedTime: "출발 2개월 전",
            tips: [
              "COVID-19 백신 접종 증명서도 준비하세요",
              "만성질환이 있다면 의사 소견서를 받으세요",
            ],
          },
        },
        {
          id: "prescription",
          title: "출국 전 건강검진",
          icon: Heart,
          isCompleted: false,
          details: {
            description: "출국 전 종합건강검진을 받고 기록을 준비하세요.",
            requiredDocuments: ["종합건강검진 결과서", "X-ray 검사 결과", "혈액검사 결과"],
            estimatedTime: "출발 1개월 전",
            tips: ["영문으로 된 건강검진서를 요청하세요", "치과 검진도 함께 받으세요"],
          },
        },
      ],
    },
    {
      id: "finance",
      title: "금융",
      icon: CreditCard,
      isExpanded: false,
      items: [
        {
          id: "travel-card",
          title: "트래블전용 카드 / ATM 정보",
          icon: CreditCard,
          isCompleted: false,
          details: {
            description: "캐나다에서 사용할 수 있는 금융 카드를 준비하세요.",
            requiredDocuments: [
              "해외사용 가능 체크카드",
              "신용카드 발급 신청서",
              "은행 잔고증명서",
            ],
            estimatedTime: "출발 2주일 전",
            tips: ["VISA나 MasterCard를 추천합니다", "해외 수수료가 적은 카드를 선택하세요"],
          },
        },
        {
          id: "currency-exchange",
          title: "한국 계좌를 캐나다에서 사용하는 것 관련",
          icon: CreditCard,
          isCompleted: false,
          details: {
            description: "한국 계좌를 캐나다에서 효율적으로 사용하는 방법을 알아보세요.",
            requiredDocuments: [
              "온라인뱅킹 해외접속 신청서",
              "해외송금 서비스 가입",
              "금융인증서 발급",
            ],
            estimatedTime: "출발 1주일 전",
            tips: ["해외 접속이 가능한지 미리 확인하세요", "송금 한도를 미리 설정해두세요"],
          },
        },
        {
          id: "money-transfer",
          title: "캐나다에서 하나은행 계좌 신오픈",
          icon: Building,
          isCompleted: false,
          details: {
            description: "캐나다 현지에서 한국계 은행 계좌를 개설하세요.",
            requiredDocuments: ["여권", "캐나다 주소 증명서", "취업/학업 증명서", "초기 입금액"],
            estimatedTime: "도착 후 1주일 내",
            tips: ["하나은행 캐나다 지점을 이용하면 편리합니다", "한국어 서비스가 가능합니다"],
          },
        },
      ],
    },
    {
      id: "canada",
      title: "캐나다에서",
      icon: MapPin,
      isExpanded: false,
      items: [
        {
          id: "sin-number",
          title: "SIN 번호 신청",
          icon: FileText,
          isCompleted: false,
          details: {
            description: "캐나다에서 일하기 위해 필요한 SIN 번호를 신청하세요.",
            requiredDocuments: ["여권", "입학허가서 또는 취업허가서", "캐나다 주소 증명서"],
            estimatedTime: "도착 후 1주일 내",
            tips: ["온라인으로도 신청 가능합니다"],
          },
        },
      ],
    },
  ]);

  const toggleCategory = (categoryId: string) => {
    setCategories(prev =>
      prev.map(cat => (cat.id === categoryId ? { ...cat, isExpanded: !cat.isExpanded } : cat)),
    );
  };

  const handleItemClick = (item: ChecklistItem) => {
    if (item.details) {
      setSelectedItem(item);
    }
  };

  const toggleItemComplete = (categoryId: string, itemId: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map(item =>
                item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item,
              ),
            }
          : cat,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-6">
        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              캐나다 이민 체크리스트
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              캐나다 이민 준비를 위한 단계별 체크리스트
            </p>
          </div>

          <div className="p-6">
            {categories.map(category => {
              const CategoryIcon = category.icon;
              return (
                <div key={category.id} className="mb-4">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="flex items-center gap-3 w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <CategoryIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {category.title}
                    </span>
                    {category.isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                    )}
                  </button>

                  {category.isExpanded && (
                    <div className="ml-8 mt-2 space-y-2">
                      {category.items.map(item => {
                        const ItemIcon = item.icon;
                        return (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            <button
                              onClick={() => toggleItemComplete(category.id, item.id)}
                              className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                item.isCompleted
                                  ? "bg-green-500 border-green-500"
                                  : "border-gray-300 dark:border-gray-600"
                              }`}
                            >
                              {item.isCompleted && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </button>
                            <ItemIcon className="w-4 h-4 text-red-500" />
                            <button
                              onClick={() => handleItemClick(item)}
                              className="flex-1 text-left text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                              {item.title}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black bg-opacity-50" onClick={() => setSelectedItem(null)} />
          <div className="w-96 bg-white dark:bg-gray-800 shadow-xl overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedItem.title}
                </h2>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">설명</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {selectedItem.details?.description}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">필요 서류</h3>
                <ul className="space-y-1">
                  {selectedItem.details?.requiredDocuments.map((doc, index) => (
                    <li
                      key={index}
                      className="text-gray-600 dark:text-gray-300 text-sm flex items-start gap-2"
                    >
                      <span className="text-gray-400 mt-1">•</span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">예상 소요시간</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {selectedItem.details?.estimatedTime}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">팁</h3>
                <ul className="space-y-1">
                  {selectedItem.details?.tips.map((tip, index) => (
                    <li
                      key={index}
                      className="text-gray-600 dark:text-gray-300 text-sm flex items-start gap-2"
                    >
                      <span className="text-blue-500 mt-1">💡</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
