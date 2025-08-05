import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://greenvision-portfolio.vercel.app"),
  title:
    "Ikhwanussafa Sadidan | Environmental Scientist, Lecturer & Consultant",
  description:
    "Portfolio of Ikhwanussafa Sadidan, M.Sc. — Lecturer of Environmental Engineering Study Program, consultant, and researcher specializing in ecology, GIS, environmental management, and sustainability. Explore research, projects, awards, and more.",
  keywords: [
    "environmental scientist",
    "lecturer",
    "consultant",
    "ecology",
    "GIS",
    "environmental management",
    "sustainability",
    "research",
    "Indonesia",
    "UNSIKA",
  ],
  authors: [{ name: "Ikhwanussafa Sadidan" }],
  creator: "Ikhwanussafa Sadidan",
  publisher: "Ikhwanussafa Sadidan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title:
      "Ikhwanussafa Sadidan | Environmental Scientist, Lecturer & Consultant",
    description:
      "Portfolio of Ikhwanussafa Sadidan, M.Sc. — Lecturer of Environmental Engineering Study Program, consultant, and researcher specializing in ecology, GIS, environmental management, and sustainability. Explore research, projects, awards, and more.",
    url: "https://greenvision-portfolio.vercel.app/",
    siteName: "Ikhwanussafa Sadidan Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/profile/didan.jpeg",
        width: 1200,
        height: 630,
        alt: "Ikhwanussafa Sadidan - Environmental Scientist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Ikhwanussafa Sadidan | Environmental Scientist, Lecturer & Consultant",
    description:
      "Portfolio of Ikhwanussafa Sadidan, M.Sc. — Lecturer of Environmental Engineering Study Program, consultant, and researcher specializing in ecology, GIS, environmental management, and sustainability. Explore research, projects, awards, and more.",
    creator: "@sadidan26",
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
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
