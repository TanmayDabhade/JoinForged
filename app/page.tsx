"use client"

import { useState } from "react"
import { Navbar } from "@/app/components/navbar"
import { Button } from "@/app/components/ui/button"
import { ArrowRight } from "lucide-react"

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative bg-white/7 backdrop-blur-md border border-white/10 rounded-3xl shadow-[0_4px_32px_0_rgba(0,0,0,0.25)] p-8 flex flex-col items-center text-center overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none rounded-3xl" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// FAQ Accordion
function FAQAccordion({ faqs }: { faqs: { question: string; answer?: string; expandable: boolean }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="flex flex-col gap-4">
      {faqs.map((faq, i) => (
        <div key={faq.question} className="bg-[#181a20] rounded-xl p-4 border border-[#23272f]">
          <button
            className="w-full text-left font-semibold text-lg flex justify-between items-center"
            onClick={() => setOpen(open === i ? null : i)}
          >
            {faq.question}
            <span className="ml-2 text-accent">{open === i ? "−" : "+"}</span>
          </button>
          {faq.expandable && (
            <div className={`mt-2 text-base text-gray-400 transition-all ${open === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>{faq.answer || "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center">


      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center text-center py-24 px-4 max-w-2xl mx-auto">
        <span className="tracking-widest text-accent font-semibold mb-4 text-sm" style={{ letterSpacing: '0.2em' }}>MEET. MATCH. BUILD.</span>
        <h1 className="text-5xl sm:text-6xl font-bold mb-2 text-white">Meet Your Co-Founder,</h1>
        <h2 className="italic text-3xl sm:text-4xl text-accent mb-4" style={{ fontFamily: 'serif' }}>Build something great.</h2>
        <p className="max-w-xl text-lg text-gray-400 mb-8">A curated community for students and early founders to meet, match, and build together.</p>
      </section>

      {/* Why Join Section */}
      <section className="w-full max-w-5xl mx-auto py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-14 tracking-tight">Why Join?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "1", title: "Find Like-Minded Builders", description: "Meet others who think like you — other developers, designers, and dreamers." },
            { number: "2", title: "Build Faster", description: "No more working in isolation. Get matched based on skills and vision." },
            { number: "3", title: "For Students, By Students", description: "A community built with other minds of early founders and creators." },
          ].map(card => (
            <GlassCard key={card.number}>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg font-bold mb-4 border border-white/10 text-white/80">{card.number}</div>
              <h3 className="text-xl font-semibold mb-2 text-white tracking-tight">{card.title}</h3>
              <p className="text-gray-200 text-base font-normal leading-relaxed">{card.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-3xl mx-auto py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-14 tracking-tight">How does it work?</h2>
        <div className="flex flex-col gap-8">
          {[
            { number: "Step 1:", title: "Apply", description: "Fill out a short form about you and your goals." },
            { number: "Step 2:", title: "Get Matched", description: "We connect you with others looking for the same thing." },
            { number: "Step 3:", title: "Collaborate & Launch", description: "Start talking, sharing, building — or just learning together." },
          ].map((step, i) => (
            <GlassCard key={step.number} className="flex flex-col md:flex-row items-center gap-6 text-left md:text-left">
              <div className="flex-shrink-0 w-32 h-16 rounded-full flex items-center justify-center text-lg font-bold bg-white/10 border border-white/10 text-white/80 mb-4 md:mb-0 md:mr-8">{step.number}</div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 text-white tracking-tight">{step.title}</h3>
                <p className="text-gray-200 text-base font-normal leading-relaxed">{step.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full flex flex-col items-center justify-center py-20 px-4">
        <h2 className="text-3xl font-bold mb-2">Ready to meet your</h2>
        <h3 className="italic text-4xl text-accent mb-6" style={{ fontFamily: 'serif' }}>Co-Founder?</h3>
        <Button className="bg-gradient-to-r from-accent to-purple-500 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg border-0 flex items-center gap-2 transition-transform hover:scale-105">
          Apply here <ArrowRight className="w-5 h-5 ml-1" />
        </Button>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-3xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Everything you need to know.</h2>
        <h3 className="text-lg text-gray-400 text-center mb-8">Got questions? We've got answers. Here's everything you need to know before getting started.</h3>
        <FAQAccordion faqs={[
          { question: "Who is the community for?", answer: "This is for students, early builders, and aspiring entrepreneurs who want to meet like-minded people to start something meaningful together — whether you have an idea or are looking to join one.", expandable: true },
          { question: "Do I need to have a startup idea to join?", expandable: true },
          { question: "How do matches work?", expandable: true },
          { question: "Is it free to join?", expandable: true },
        ]} />
      </section>

      {/* Footer CTA & Callout */}
      <footer className="w-full bg-[#181a20] border-t border-[#23272f] py-12 px-4 mt-12 flex flex-col items-center">
        <div className="flex flex-col items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold">Apply, find and build</h2>
          <Button className="bg-gradient-to-r from-accent to-purple-500 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg border-0 flex items-center gap-2 transition-transform hover:scale-105">
            Apply here <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </div>
        <div className="text-center mb-8">
          <div className="text-lg font-semibold mb-1">Join us today!</div>
          <div className="text-gray-400">Built with love for student founders and future builders.</div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="font-semibold mb-1">Information</div>
          <ul className="flex gap-6 text-gray-400">
            <li><a href="#" className="hover:text-accent transition">FAQ</a></li>
            <li><a href="#" className="hover:text-accent transition">LinkedIn</a></li>
            <li><a href="#" className="hover:text-accent transition">Built with Partiful</a></li>
          </ul>
        </div>
      </footer>
    </div>
  )
}
