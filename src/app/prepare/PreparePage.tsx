import { useState } from "react";
import { ChevronDown, ChevronRight, MessageCircle, Clock, FileText, Users } from "lucide-react";

const PreparePage = () => {
  const [expandedStep, setExpandedStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Post-Arrival Setup",
      description:
        "Complete essential registrations and services setup immediately after arriving in Canada.",
      requiredDocuments: [
        "Temporary accommodation confirmation",
        "Work permit and passport",
        "Emergency contact information",
        "Pre-researched service provider list",
      ],
      estimatedTime: "First 3-5 days after arrival",
    },
    {
      id: 2,
      title: "Mobile Phone Service",
      description: "Establish communication by setting up a Canadian mobile phone plan and number.",
      requiredDocuments: [
        "Valid ID (passport + work permit)",
        "Canadian address proof",
        "Credit check or security deposit",
        "Unlocked phone or purchase new device",
      ],
      estimatedTime: "Within first week",
      faqs: ["Consider prepaid plans if you have no Canadian credit history"],
    },
    {
      id: 3,
      title: "Insurance Coverage",
      description:
        "Secure comprehensive insurance coverage including health, travel, and rental insurance.",
      requiredDocuments: [
        "Work permit documentation",
        "Proof of residence",
        "Previous insurance history",
        "Employment letter (if available)",
      ],
      estimatedTime: "First 2 weeks",
    },
    {
      id: 4,
      title: "Banking Setup",
      description: "Open a Canadian bank account to manage your finances and receive payments.",
      requiredDocuments: [
        "Two pieces of government-issued ID",
        "Proof of Canadian address",
        "Initial deposit ($100-500 recommended)",
        "Employment letter or offer letter",
      ],
      estimatedTime: "Within first week",
    },
    {
      id: 5,
      title: "Medical Certificate & Health Services",
      description:
        "Register for provincial health insurance and obtain necessary medical documentation.",
      requiredDocuments: [
        "Provincial health card application",
        "Proof of residence in province",
        "Medical records from home country",
        "Vaccination records",
      ],
      estimatedTime: "First month",
      faqs: ["Health card may take 2-3 months to receive"],
    },
  ];

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

  const toggleStep = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? 0 : stepId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Canada Arrival Preparation Guide
              </h1>
              <p className="text-gray-600">
                Essential steps to take when you first arrive in Canada for work or study
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              {steps.map(step => (
                <div key={step.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {step.id}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    </div>
                    {expandedStep === step.id ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {expandedStep === step.id && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                        {/* Description */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {step.description}
                          </p>
                        </div>

                        {/* Required Documents */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Required Documents</h4>
                          <ul className="space-y-1">
                            {step.requiredDocuments.map((doc, index) => (
                              <li key={index} className="text-gray-600 text-sm flex items-start">
                                <span className="text-gray-400 mr-2">•</span>
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Estimated Time & FAQs */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Estimated Time</h4>
                          <p className="text-gray-600 text-sm mb-4">{step.estimatedTime}</p>

                          {step.faqs && (
                            <>
                              <h4 className="font-semibold text-gray-900 mb-2">FAQs</h4>
                              <ul className="space-y-1">
                                {step.faqs.map((faq, index) => (
                                  <li key={index} className="text-gray-600 text-sm">
                                    {faq}
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
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

export default PreparePage;
