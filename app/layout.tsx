import type { Metadata } from "next";
import { Afacad } from "next/font/google";
import "./globals.css";
import { LinkaProvider } from "@/components/LinkaProvider";
import { FleetProvider } from "@/components/FleetProvider";
import { AuthProvider } from "@/components/AuthProvider";

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TransLinka",
  description: "Smart bus ticket booking for modern travel",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "TransLinka",
    description: "Smart Bus Travel Made Simple",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "TransLinka Logo",
      },
    ],
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${afacad.variable} font-sans bg-white text-navy-900 antialiased`}>
        <LinkaProvider>
          <AuthProvider>
            <FleetProvider>{children}</FleetProvider>
          </AuthProvider>
        </LinkaProvider>
      </body>
    </html>
  );
}
