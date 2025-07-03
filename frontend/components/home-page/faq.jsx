import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionBadge from "@/components/home-page/section-badge";

const faqQuestionsAndAnswers = [
  {
    question: "What is Blink?",
    answer:
      "Blink is a versatile bio link service that allows you to create a personalized online hub, linking to your website, social media profiles, portfolio, and more.",
  },
  {
    question: "Who can use Blink?",
    answer:
      "Anyone can use Blink, from individuals to businesses and organizations. It's a great tool for personal branding, marketing, and sharing information.",
  },
  {
    question: "Can I customize the look and feel of my Blink profile?",
    answer:
      "Absolutely! You can choose from a variety of themes, customize colors, fonts, and layouts to match your personal style or brand identity.",
  },
  {
    question: "Can I use Blink to sell products or services?",
    answer:
      "Yes, you can. Blink offers features like product listings and 'Buy Now' buttons, making it easy to sell directly from your profile.",
  },
  {
    question: "How do I create a Blink profile?",
    answer:
      "Creating a Blink profile is simple. Just sign up for an account and follow the on-screen instructions.",
  },
  {
    question: "Can I edit my Blink profile after it's created?",
    answer:
      "Yes, you can easily edit and update your profile whenever you need to.",
  },
  {
    question: "Is Blink free to use?",
    answer:
      "Blink offers a free plan with basic features. For advanced features and customization options, there are paid plans available.",
  },
  {
    question: "What kind of support is available for Blink users?",
    answer:
      "Blink provides customer support to help users with any questions or issues they may encounter. You can typically contact support through email or live chat. Blink support is available for the paid plans.",
  },
];

export default function FAQ() {
  return (
    <div className="my-12 grid md:grid-cols-2 gap-2" id="faq">
      <div>
        <SectionBadge>FAQ</SectionBadge>
        <h2 className="mt-6 text-3xl font-bold">
          You Might be <br /> Wondering . . .
        </h2>
        <p className="mt-4 text-gray-600 dark:text-neutral-400">
          Here are some of the most frequently asked questions about Blink.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqQuestionsAndAnswers.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq?.question}
            </AccordionTrigger>
            <AccordionContent>{faq?.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
