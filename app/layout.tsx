import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";


const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Investidor fundamentalista"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={lexendDeca.className}
    >

      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
