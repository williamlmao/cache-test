import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "./context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Friends and Fables',
  description:
    'Play an AI text adventure RPG inspired by DnD (Dungeons and Dragons). Dungeon masters love our AI dungeon, character, and world building tools. Explore infinite worlds with our AI Game Master today!',
  playMode: 'MultiPlayer',
  gamePlatform: 'Web Browser',
  applicationCategory: 'Game',
  genre: ['Role Playing Game', 'Fantasy', 'Adventure', 'Dungeons & Dragons'],
  gameItem: ['Characters', 'Spells', 'Items', 'Dungeons'],
  publisher: {
    '@type': 'Organization',
    name: 'Sidequest Labs',
  } ,
  author: [
    {
      '@type': 'Person',
      name: 'Will Liu',
    },
    {
      '@type': 'Person',
      name: 'David Melnychuk',
    } ,
  ],
  url: 'https://fables.gg',
  offers: {
    '@type': 'Offer',
    category: 'Online Gaming',
    availability: 'https://schema.org/OnlineOnly',
  },
  audience: {
    '@type': 'PeopleAudience',
    suggestedMinAge: '18',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
