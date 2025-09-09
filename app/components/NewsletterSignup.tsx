interface NewsletterSignupProps {
  title?: string;
  description?: string;
}

export default function NewsletterSignup({
  title = "Stay Ahead of the Curve",
  description = "Get the latest certification trends, salary insights, and career advancement strategies delivered to your inbox.",
}: NewsletterSignupProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-3xl lg:text-4xl font-bold text-white mb-4"
          style={{
            fontFamily: "Work Sans, system-ui, sans-serif",
            fontWeight: 700,
          }}
        >
          {title}
        </h2>
        <p className="text-xl text-slate-300 mb-8">{description}</p>

        <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-slate-600 bg-slate-800 text-white placeholder-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Subscribe
          </button>
        </form>

        <p className="text-sm text-slate-400 mt-4">
          No spam, unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
}
