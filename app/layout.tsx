import type { Metadata } from "next";
import "./globals.css";
import { Work_Sans, Geist_Mono } from "next/font/google";
import WebVitals from "@/components/web-vitals";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title:
    "Resume Stuffer - Strategic Certification Guidance for Career Advancement",
  description:
    "Discover high-impact certifications with proven ROI. Expert analysis of 63+ certifications from AWS, Google, Microsoft, and more. Make informed career investments.",
  keywords:
    "certifications, professional development, career advancement, AWS, Google, Microsoft, certification ROI, salary increase, exam prep, tech careers",
  authors: [{ name: "Resume Stuffer Team" }],
  creator: "Resume Stuffer",
  publisher: "Resume Stuffer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "G-JMTGWF8G9P",
  },
  openGraph: {
    title: "Resume Stuffer - Strategic Certification Guidance",
    description: "Expert analysis of 63+ certifications with proven ROI data",
    url: "https://resumestuffer.com",
    siteName: "Resume Stuffer",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://resumestuffer.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Resume Stuffer - Strategic Certification Guidance for Career Advancement",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ResumeStuffer",
    creator: "@ResumeStuffer",
    title: "Resume Stuffer - Strategic Certification Guidance",
    description: "Expert analysis of 63+ certifications with proven ROI data",
    images: {
      url: "https://resumestuffer.com/og-image.jpg",
      alt: "Resume Stuffer Certification Analytics",
    },
  },
  alternates: {
    canonical: "https://resumestuffer.com",
  },
  category: "Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* @ts-ignore */}
        <meta
          name="impact-site-verification"
          content="0c695337-8d9f-4f2f-9b59-4ea6344cda48"
        />

        {/* Preload critical resources */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Critical CSS and viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="color-scheme" content="light" />

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JMTGWF8G9P"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JMTGWF8G9P');
            `,
          }}
        />
      </head>
      <body
        className={`${workSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebVitals />
        {children}
      </body>
    </html>
  );
}
