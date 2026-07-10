import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ | Points Applied",
  description: "Everything you need to know about using Points Applied.",
};

interface FaqItem {
  q: string;
  a?: string;
  html?: string;
  listIntro?: string;
  list?: string[];
  listOutro?: string;
}

interface FaqSection {
  category: string;
  items: FaqItem[];
}

const faqs: FaqSection[] = [
  {
    category: "General",
    items: [
      {
        q: "What is Points Applied?",
        a: "Points Applied is a credit card portfolio management tool. It helps you track which cards you hold, when you opened them, what sign-up bonuses you've earned, and which benefits are coming up for renewal. It's designed for people who take rewards strategy seriously and want one organized view of their full card portfolio and history.",
      },
      {
        q: "Is Points Applied free?",
        a: "There is no fee for using Points Applied.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    items: [
      {
        q: "Does Points Applied connect to my bank accounts?",
        a: "No. Points Applied does not link to any bank accounts, credit card accounts, or financial institutions. You enter your card information manually. There is no Plaid integration, no credential storage, and no read access to your financial accounts. Your data stays private by design.",
      },
    ],
  },
  {
    category: "Using the App",
    items: [
      {
        q: "What information do I enter?",
        listIntro:
          "You enter the cards you hold or have held, along with details like:",
        list: [
          "Card name and issuer",
          "Application and approval date",
          "Sign-up bonus amount and whether you earned it",
          "Annual fee",
          "Any notes you want to keep",
        ],
        listOutro:
          "The app uses that information to calculate metrics like your Chase 5/24 status, lifetime sign-up bonus value, and upcoming annual fee windows.",
      },
      {
        q: "Which cards can I track?",
        html: 'You can track any credit card — all major issuers (Chase, Amex, Citi, Capital One, Bilt, etc.) are included in the card catalog. You can also add custom cards manually for cards not in the system, such as cards from credit unions or other niche cards. If you have a card that\'s not in the catalog that you think belongs, let us know <a href="mailto:support@pointsapplied.com" class="text-primary font-medium hover:underline">support@pointsapplied.com</a>!',
      },
      {
        q: "Can I track closed cards?",
        a: "Yes. You can mark cards as closed and keep them in your portfolio history. This is useful for tracking lifetime sign-up bonus value, understanding your issuer history for eligibility rules, and maintaining an accurate history.",
      },
    ],
  },
  {
    category: "Support",
    items: [
      {
        q: "How do I contact support?",
        html: 'Email us at <a href="mailto:support@pointsapplied.com" class="text-primary font-medium hover:underline">support@pointsapplied.com</a>. We aim to respond within one business day.',
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 md:px-8 md:py-16">
      <header className="mb-10 max-w-3xl">
        <p className="pa-label mb-3">Points Applied</p>
        <h1 className="text-4xl font-black text-slate-900 mb-2">FAQ</h1>
        <p className="text-slate-500 text-base">
          Everything you need to know about using Points Applied.
        </p>
      </header>

      <div className="space-y-6">
        {faqs.map((section) => (
          <div
            key={section.category}
            className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden px-5 md:px-6"
          >
            <p className="pa-label pt-5 pb-2 md:pt-6">{section.category}</p>
            <Accordion>
              {section.items.map((item) => (
                <AccordionItem key={item.q} value={item.q}>
                  <AccordionTrigger className="text-slate-900 font-semibold text-base">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-slate-600 text-sm leading-relaxed space-y-3">
                      {item.a && <p>{item.a}</p>}
                      {item.html && (
                        <p dangerouslySetInnerHTML={{ __html: item.html }} />
                      )}
                      {item.listIntro && (
                        <>
                          <p>{item.listIntro}</p>
                          <ul className="list-disc list-inside space-y-1 pl-1">
                            {item.list?.map((li) => (
                              <li key={li}>{li}</li>
                            ))}
                          </ul>
                          {item.listOutro && <p>{item.listOutro}</p>}
                        </>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      <div className="mt-12 md:mt-16 rounded-[2rem] bg-primary text-white text-center p-6 md:p-8 max-w-3xl mx-auto">
        <p className="font-semibold text-lg mb-1">Still have questions?</p>
        <p className="text-white/70 text-sm mb-4">We&apos;re happy to help.</p>
        <a
          href="mailto:support@pointsapplied.com"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-white font-black shadow-xl hover:bg-accent/90 transition-all active:scale-95"
        >
          Contact Support
        </a>
      </div>
    </main>
  );
}
