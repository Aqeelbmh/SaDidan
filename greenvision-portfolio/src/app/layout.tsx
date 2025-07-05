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
  title: "Ikhwanussafa Sadidan | Environmental Scientist, Lecturer & Consultant",
  description: "Portfolio of Ikhwanussafa Sadidan, M.Sc. — Lecturer of Environmental Engineering Study Program, consultant, and researcher specializing in ecology, GIS, environmental management, and sustainability. Explore research, projects, awards, and more.",
  openGraph: {
    title: "Ikhwanussafa Sadidan | Environmental Scientist, Lecturer & Consultant",
    description: "Portfolio of Ikhwanussafa Sadidan, M.Sc. — Lecturer of Environmental Engineering Study Program, consultant, and researcher specializing in ecology, GIS, environmental management, and sustainability. Explore research, projects, awards, and more.",
    url: "https://greenvision-portfolio.vercel.app/",
    siteName: "Ikhwanussafa Sadidan Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ikhwanussafa Sadidan | Environmental Scientist, Lecturer & Consultant",
    description: "Portfolio of Ikhwanussafa Sadidan, M.Sc. — Lecturer of Environmental Engineering Study Program, consultant, and researcher specializing in ecology, GIS, environmental management, and sustainability. Explore research, projects, awards, and more.",
    creator: "@yourtwitterhandle"
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
