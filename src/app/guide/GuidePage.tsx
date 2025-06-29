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

  const [expandedTags, setExpandedTags] = useState<Set<string>>(() => {
    const allTagKeys = new Set<string>();
    Object.entries(_.groupBy(GuideData, "category")).forEach(([categoryName, items]) => {
      const tagGroups = _.groupBy(items, "tags");
      Object.keys(tagGroups).forEach(tagName => {
        allTagKeys.add(`${categoryName}-${tagName}`);
      });
    });
    return allTagKeys;
  });

  const structuredData = useMemo(() => {
    const categorizedItems = _.groupBy(GuideData, "category");

    const result: Record<string, Record<string, GuideItemType[]>> = {};

    Object.entries(categorizedItems).forEach(([categoryName, items]) => {
      result[categoryName] = _.groupBy(items, "tags");
    });

    return result;
  }, []);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  const toggleTag = (categoryName: string, tagName: string) => {
    const tagKey = `${categoryName}-${tagName}`;
    setExpandedTags(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tagKey)) {
        newSet.delete(tagKey);
      } else {
        newSet.add(tagKey);
      }
      return newSet;
    });
  };

  const handleItemClick = (item: GuideItemType) => {
    router.push(`/guide/${item.id}`);
  };

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Guide</h1>
          </div>

          <div className="p-6">
            {Object.entries(structuredData).map(([categoryName, tagGroups]) => {
              const isCategoryExpanded = expandedCategories.has(categoryName);

              return (
                <div key={categoryName} className="mb-4">
                  <button
                    onClick={() => toggleCategory(categoryName)}
                    className="flex items-center gap-3 w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Folder className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {categoryName}
                    </span>
                    {isCategoryExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                    )}
                  </button>

                  {isCategoryExpanded && (
                    <div className="ml-6 mt-2 space-y-2">
                      {Object.entries(tagGroups).map(([tagName, items]) => {
                        const tagKey = `${categoryName}-${tagName}`;
                        const isTagExpanded = expandedTags.has(tagKey);

                        return (
                          <div key={tagKey}>
                            <button
                              onClick={() => toggleTag(categoryName, tagName)}
                              className="flex items-center gap-3 w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                              <Folder className="w-4 h-4 text-green-600 dark:text-green-400" />
                              <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                                {tagName}
                              </span>
                              {isTagExpanded ? (
                                <ChevronDown className="w-3 h-3 text-gray-400 ml-auto" />
                              ) : (
                                <ChevronRight className="w-3 h-3 text-gray-400 ml-auto" />
                              )}
                            </button>

                            {isTagExpanded && (
                              <div className="ml-6 mt-1 space-y-1">
                                {items.map((item: GuideItemType) => (
                                  <div
                                    key={item.id}
                                    className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                                    onClick={() => handleItemClick(item)}
                                  >
                                    <File className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    <div className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                                      {item.title}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
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
