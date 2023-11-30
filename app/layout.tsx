import "./css/style.css";

import { Inter, Lato } from "next/font/google";

const inter = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "ArguMentor",
  metadataBase: new URL("https://argumentor.co"),
  description:
    "Research easier using the power of AI. Have easier access to resources and write that A+ paper.",
  openGraph: {
    images: "/opengraph-image.png",
  },
};

import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <meta property="og:image" content="<generated>" />
      <meta property="og:image:type" content="<generated>" />
      <meta property="og:image:width" content="<generated>" />
      <meta property="og:image:height" content="<generated>" /> */}

      <body
        className={`${inter.variable} font-inter antialiased bg-slate-900 text-slate-100 tracking-tight`}
      >
        <div className="flex flex-col min-h-screen overflow-hidden">
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}
