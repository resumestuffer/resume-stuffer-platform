This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
resume-stuffer-nextjs
├─ app
│  ├─ about
│  │  └─ page.tsx
│  ├─ api
│  │  ├─ categories
│  │  │  └─ route.ts
│  │  ├─ certifications
│  │  │  └─ route.ts
│  │  ├─ featured-certifications
│  │  │  └─ route.ts
│  │  ├─ providers
│  │  ├─ stats
│  │  │  └─ route.ts
│  │  └─ test-connection
│  ├─ blog
│  │  ├─ page.tsx
│  │  └─ [slug]
│  │     └─ page.tsx
│  ├─ certifications
│  │  ├─ page.tsx
│  │  └─ [slug]
│  │     └─ page.tsx
│  ├─ components
│  │  ├─ blog
│  │  │  ├─ CalloutBox.tsx
│  │  │  ├─ CTASection.tsx
│  │  │  ├─ InfoBox.tsx
│  │  │  ├─ PathSteps.tsx
│  │  │  └─ StatsGrid.tsx
│  │  ├─ Footer.tsx
│  │  ├─ NewsletterSignup.tsx
│  │  └─ StudyResources.tsx
│  ├─ contact
│  │  └─ page.tsx
│  ├─ ContactForm.tsx
│  ├─ EarningCalculator.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ lib
│  │  └─ markdownProcessor.ts
│  ├─ MobileHeader.tsx
│  ├─ page.tsx
│  ├─ privacy
│  │  └─ page.tsx
│  └─ terms
│     └─ page.tsx
├─ components
│  └─ ui
├─ content
│  └─ blog
│     ├─ aws-certification-cost-2025.md
│     ├─ certification_roi_calculator_final.md
│     ├─ entry_level_certifications_article.md
│     ├─ first_certification_beginners_guide.md
│     ├─ free_vs_paid_certifications_article.md
│     ├─ google_certificates_article.md
│     ├─ hidden_costs_certification_article.md
│     └─ red_flags_certification_article.md
├─ eslint.config.mjs
├─ hooks
├─ lib
│  ├─ prisma.ts
│  └─ repositories
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ prisma
│  ├─ schema.prisma
│  └─ seed.ts
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
└─ tsconfig.json

```