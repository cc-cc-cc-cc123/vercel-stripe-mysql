"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is RecentlyfoLowed?",
    answer:
      "RecentlyfoLowed is an online tool that allows you to view the recent followers or following of any public Instagram account, completely free and anonymously.",
  },
  {
    question: "Is it safe to use RecentlyfoLowed?",
    answer:
      "Yes, RecentlyfoLowed is completely safe to use. We don't store any of your personal information or Instagram credentials. Our tool only accesses publicly available information.",
  },
  {
    question: "How accurate is the information provided by RecentlyfoLowed?",
    answer:
      "RecentlyfoLowed provides the most up-to-date information available from public Instagram profiles. However, due to Instagram's API limitations, the data might not always be 100% real-time.",
  },
  {
    question: "Do I need an Instagram account to use RecentlyfoLowed?",
    answer:
      "No, you don't need an Instagram account to use RecentlyfoLowed. You can view information about any public Instagram account without logging in.",
  },
  {
    question: "Is RecentlyfoLowed free to use?",
    answer:
      "Yes, RecentlyfoLowed is completely free to use for basic features. We also offer premium features for users who need more advanced analytics.",
  },
  // TODO: Add more FAQs
  {
    question: "How can I track someone's Instagram account?",
    answer:
      "Tracking an Instagram account is easy and completely free! Simply <span>enter the username</span> of the account you want to track, and let our tool do the work for you. Please note, we can only track public accounts — private profiles are not accessible.",
  },
  {
    question: "Do I need to provide my Instagram account details?",
    answer:
      "No, you don't need to provide any of your personal Instagram details. You can track Instagram accounts even without having an Instagram account yourself. It's 100% anonymous and free to use.",
  },
  {
    question: "Will the Instagram accounts I track know I'm tracking them?",
    answer:
      "No, there are 0 risks involved. Your tracking is completely anonymous. We ensure that your activity remains confidential, so you can track with peace of mind.",
  },
  {
    question: "Can I track Instagram accounts that I don't follow?",
    answer:
      "Yes, absolutely! You don't need to follow the account you're tracking. Simply enter the username, and we'll gather the information for you. Just remember, we can only track public accounts — private accounts are not visible.",
  },
  {
    question: "Can I track multiple Instagram accounts?",
    answer:
      "Yes, you can track multiple Instagram accounts! Whether you’re tracking competitors, influencers, or other accounts of interest, our platform gives you the flexibility to monitor multiple Instagram profiles.",
  },
];
function FAQItem({ question, answer }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-semibold flex items-center">
          {/* <span className="mr-2">{emoji}</span> */}
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>
      {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
}

export function FAQSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#000000]">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
