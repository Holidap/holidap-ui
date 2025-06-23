import { useState } from "react";
import { ChevronRight, ChevronDown, MessageCircle, FileText, Clock } from "lucide-react";

const relatedTips = [
  {
    title: "First Week Survival Guide",
    readTime: "6 min read",
    icon: <FileText className="w-5 h-5 text-blue-500" />,
  },
  {
    title: "Finding Accommodation",
    readTime: "8 min read",
    icon: <FileText className="w-5 h-5 text-green-500" />,
  },
  {
    title: "Job Search Strategies",
    readTime: "5 min read",
    icon: <Clock className="w-5 h-5 text-purple-500" />,
  },
];

const TodoPage = () => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [expandedSection, setExpandedSection] = useState<number | null>(5);

  const sections = [
    {
      id: 1,
      title: "Post-Arrival Setup",
      items: [
        {
          id: 101,
          title: "SIN Number Application",
          description: "Apply for Social Insurance Number at Service Canada",
        },
        {
          id: 102,
          title: "Temporary Accommodation",
          description: "Secure temporary housing for first weeks",
        },
        {
          id: 103,
          title: "Airport to City Transport",
          description: "Arrange transportation from airport to accommodation",
        },
      ],
    },
    {
      id: 2,
      title: "Mobile Phone Service",
      items: [
        {
          id: 201,
          title: "Canadian SIM Card",
          description: "Get Canadian mobile service with Rogers, Bell, or Telus",
        },
        {
          id: 202,
          title: "Korean Budget Plan Research",
          description: "Research Korean budget mobile plans for maintaining Korean number",
        },
      ],
    },
    {
      id: 3,
      title: "Insurance Coverage",
      items: [
        {
          id: 301,
          title: "Provincial Health Insurance",
          description: "Register for provincial health insurance",
        },
        {
          id: 302,
          title: "Private Insurance",
          description: "Get private insurance coverage during waiting period",
        },
      ],
    },
    {
      id: 4,
      title: "Banking Setup",
      items: [
        {
          id: 401,
          title: "Bank Account Opening",
          description: "Open Canadian bank account with major banks",
        },
        {
          id: 402,
          title: "Travel Credit Card",
          description: "Apply for travel-friendly credit cards with no foreign transaction fees",
        },
      ],
    },
    {
      id: 5,
      title: "Medical Certificate & Health Services",
      items: [
        {
          id: 501,
          title: "Medical Records Transfer",
          description: "Transfer medical records from home country",
        },
        {
          id: 502,
          title: "Vaccination Records",
          description: "Organize vaccination records and certificates",
        },
        {
          id: 503,
          title: "Family Doctor Registration",
          description: "Find and register with a family doctor",
        },
      ],
    },
  ];

  const toggleCheck = (id: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleSection = (sectionId: number | null) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Canada Arrival Item Check List
              </h1>
              <p className="text-gray-600">
                Check off these items to ensure a successful transition to life in Canada.
              </p>
            </div>

            <div className="space-y-4">
              {sections.map(section => (
                <div
                  key={section.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200"
                >
                  <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleCheck(section.id)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                          checkedItems[section.id]
                            ? "bg-black border-black"
                            : "border-gray-300 hover:border-black"
                        }`}
                      >
                        {checkedItems[section.id] && (
                          <svg
                            className="w-5 h-5 text-white"
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
                      <span
                        className={`text-lg font-medium cursor-pointer ${
                          checkedItems[section.id] ? "line-through text-gray-500" : "text-gray-900"
                        }`}
                        onClick={() => toggleSection(section.id)}
                      >
                        {section.title}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center justify-center"
                    >
                      {expandedSection === section.id ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {expandedSection === section.id && (
                    <div className="px-6 pb-6">
                      <div className="ml-12 space-y-4">
                        {section.id === 5 && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-gray-50 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                              <p className="text-sm text-gray-600">
                                Register for provincial health insurance and obtain necessary
                                medical documentation.
                              </p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900 mb-2">
                                Required Documents
                              </h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Provincial health card application</li>
                                <li>• Proof of residence in province</li>
                                <li>• Medical records from home country</li>
                                <li>• Vaccination records</li>
                              </ul>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900 mb-2">Estimated Time</h4>
                              <p className="text-sm text-gray-600 mb-3">First month</p>
                              <h4 className="font-semibold text-gray-900 mb-2">FAQs</h4>
                              <p className="text-sm text-gray-600">
                                Health card may take 2-3 months to receive
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="bg-white rounded-lg divide-y divide-gray-100">
                          {section.items.map(item => (
                            <div
                              key={item.id}
                              className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors"
                            >
                              <button
                                onClick={() => toggleCheck(item.id)}
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors mt-0.5 ${
                                  checkedItems[item.id]
                                    ? "bg-black border-black"
                                    : "border-gray-300 hover:border-black"
                                }`}
                              >
                                {checkedItems[item.id] && (
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
                              <div className="flex-1">
                                <h5
                                  className={`font-medium ${
                                    checkedItems[item.id]
                                      ? "line-through text-gray-500"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {item.title}
                                </h5>
                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80">
            {/* Need Help */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
              <button className="w-full bg-black text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                <MessageCircle className="w-4 h-4" />
                Get Support
              </button>
            </div>

            {/* Related Tips */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Helpful Resources</h3>
              <div className="space-y-4">
                {relatedTips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      {tip.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm leading-tight mb-1">
                        {tip.title}
                      </h4>
                      <p className="text-gray-500 text-xs">{tip.readTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
