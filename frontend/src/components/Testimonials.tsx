import Image from "next/image";
import TestimonialImg from "../../public/images/testimonial_dp.jpg";

const testimonials = [
  {
    quote:
      "I've used a few resume review services before, but this one stands out for its honesty and attention to detail. It became my go-to tool for resume reviews.",
    name: "John Doe",
    role: "SWE at Microsoft",
    avatar: TestimonialImg,
    stars: 5,
  },
  {
    quote:
      "The AI feedback was incredibly detailed and helped me land 3 interviews in a week. The cover letter generator is a game-changer!",
    name: "Sarah Chen",
    role: "Product Manager at Google",
    avatar: TestimonialImg,
    stars: 5,
  },
  {
    quote:
      "I went from zero callbacks to multiple offers. The skill quiz feature helped me prepare for technical interviews too. Absolutely worth it.",
    name: "Alex Kumar",
    role: "Data Scientist at Stripe",
    avatar: TestimonialImg,
    stars: 5,
  },
];

export default function Testimonial() {
  return (
    <section className="relative bg-[#050816] py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl pb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 mb-6 backdrop-blur-sm">
            <span className="text-sm font-medium text-indigo-300 tracking-wide">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">
            Loved by job seekers{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              worldwide
            </span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 hover:bg-slate-900 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <svg
                    key={si}
                    className="h-4 w-4 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="flex-1 text-slate-300 text-sm leading-relaxed mb-6">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Image
                  className="rounded-full border-2 border-slate-700"
                  src={t.avatar}
                  width={44}
                  height={44}
                  alt={t.name}
                />
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-indigo-400">{t.role}</div>
                </div>
              </div>

              {/* Hover accent */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
