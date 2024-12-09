import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      "Tracking an Instagram account is easy and completely free! Simply enter the username of the account you want to track, and let our tool do the work for you. Please note, we can only track public accounts — private profiles are not accessible.",
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

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
          Frequently Asked Questions
        </h1>
        <Card className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
