"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronDown, Folder, File } from "lucide-react";
import _ from "lodash";
import { CategoryData, GuideData } from "@/data/GuideData";
import { GuideItemType } from "@/type/guide";

function GuidePage() {
  const router = useRouter();

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(CategoryData));

  const categorizedItems = useMemo(() => {
    return _.groupBy(GuideData, "category");
  }, []);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = _.clone(prev);
      newSet.has(categoryName) ? newSet.delete(categoryName) : newSet.add(categoryName);
      return newSet;
    });
  };

  const handleItemClick = (item: GuideItemType) => {
    router.push(`/guide/${item.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Guide</h1>
          </div>

          <div className="p-6">
            {Object.entries(categorizedItems).map(([categoryName, items]) => {
              const isExpanded = expandedCategories.has(categoryName);

              return (
                <div key={categoryName} className="mb-4">
                  <button
                    onClick={() => toggleCategory(categoryName)}
                    className="flex items-center gap-3 w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Folder className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {categoryName}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="ml-8 mt-2 space-y-2">
                      {items.map((item: GuideItemType) => {
                        return (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                            onClick={() => handleItemClick(item)}
                          >
                            <File className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <div className="flex-1">
                              <div className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                                {item.title}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {item.tags}
                              </div>
                            </div>
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
    </div>
  );
}

export default GuidePage;
