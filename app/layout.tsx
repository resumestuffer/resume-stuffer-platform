import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Resume Stuffer - Strategic Certification Guidance for Career Advancement",
  description:
    "Discover high-impact certifications with proven ROI. Expert analysis of 63+ certifications from AWS, Google, Microsoft, and more. Make informed career investments.",
  keywords:
    "certifications, professional development, career advancement, AWS, Google, Microsoft, certification ROI, salary increase",
  openGraph: {
    title: "Resume Stuffer - Strategic Certification Guidance",
    description: "Expert analysis of 63+ certifications with proven ROI data",
    url: "https://resumestuffer.com",
    siteName: "Resume Stuffer",
    type: "website",
    images: [
      {
        url: "https://resumestuffer.com/og-image.jpg", // TODO: Add this image file to /public/
        width: 1200,
        height: 630,
        alt: "Resume Stuffer - Strategic Certification Guidance for Career Advancement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Stuffer - Strategic Certification Guidance",
    description: "Expert analysis of 63+ certifications with proven ROI data",
    images: ["https://resumestuffer.com/og-image.jpg"],
  },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
