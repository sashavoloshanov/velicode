import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/context";

export const metadata: Metadata = {
  title: "Velicode \u2014 iOS, Android & Web App Development",
  description: "I build native iOS, Android, and Web applications. From idea to App Store and beyond.",
  openGraph: {
    title: "Velicode \u2014 iOS, Android & Web App Development",
    description: "I build native iOS, Android, and Web applications. From idea to App Store and beyond.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
