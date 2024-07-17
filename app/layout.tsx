import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Inosuke names you";
const APP_DEFAULT_TITLE = "Inosuke names you";
const APP_TITLE_TEMPLATE = "%s - Inosuke names you";
const APP_DESCRIPTION = "Discover hilarious name transformations with our fun site inspired by Inosuke Hashibira from Demon Slayer! Enter any name and see how the wild and quirky Inosuke would pronounce it. Perfect for a good laugh and sharing with friends!"
const APP_URL = "https://inosukenamesyou.vercel.app"

export const metadata: Metadata = {
  applicationName: APP_NAME,
  authors: [{name:"Anon 2.0", url: "https://twitter.com/anonthedev"}],
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  themeColor: "#121212",
  creator: "Anon 2.0",
  robots: "index, follow",
  description: APP_DESCRIPTION,
  formatDetection: {
    telephone: false,
  },
  
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    url: APP_URL,
    locale: 'en_IN',
    description: APP_DESCRIPTION,
    images:[
      {
        url: `${APP_URL}/bg.png`,
        width: 1920,
        height: 1080,
      },
      {
        url: `${APP_URL}/bg.png`,
        width: 1920,
        height: 1080,
      },
    ]
  },
  twitter: {
    card: "summary",
    creator: "Anon 2.0",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images:[
      {
        url: `${APP_URL}/bg.png`,
        width: 1920,
        height: 1080,
      },
    ],
    site: APP_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
