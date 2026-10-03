import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohit Salwan",
  description:
    "Mohit Salwan is an India-based developer building practical machine-learning systems, data tools and expressive web experiences.",
  applicationName: "Mohit Salwan",
  authors: [{ name: "Mohit Salwan" }],
  creator: "Mohit Salwan",
  publisher: "Mohit Salwan",
  keywords: [
    "Mohit Salwan",
    "AI developer India",
    "independent developer",
    "machine learning projects",
    "data tools",
    "creative web development",
    "automation",
  ],
  openGraph: {
    title: "Mohit Salwan",
    description:
      "Mohit Salwan is an India-based developer building practical machine-learning systems, data tools and expressive web experiences.",
    siteName: "Mohit Salwan",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1730,
        height: 909,
        alt: "Mohit Salwan — AI, data and web projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohit Salwan",
    description:
      "Mohit Salwan is an India-based developer building practical machine-learning systems, data tools and expressive web experiences.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
        <meta name="theme-color" content="#111312" />
        <link rel="preload" as="image" href="/cutouts/guitar.webp" />
        <link rel="preload" as="image" href="/cutouts/keyboard.webp" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "/#mohit-salwan",
              name: "Mohit Salwan",
              description:
                "Mohit Salwan is an India-based developer building practical machine-learning systems, data tools and expressive web experiences.",
              email: "mailto:mohitsalwan@gmail.com",
              jobTitle: "Developer and AI Creator",
              homeLocation: {
                "@type": "Place",
                name: "India",
              },
              knowsAbout: [
                "Artificial Intelligence",
                "Data Structures and Algorithms",
                "Web Development",
                "Automation",
                "Interaction Design",
              ],
              sameAs: [
                "https://github.com/mohitexe999-create",
                "https://www.linkedin.com/in/mohit-salwan",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "/#website",
              name: "Mohit Salwan",
              alternateName: "Mohit Salwan Portfolio",
              description:
                "Mohit Salwan is an India-based developer building practical machine-learning systems, data tools and expressive web experiences.",
              inLanguage: "en",
              publisher: {
                "@id": "/#mohit-salwan",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
