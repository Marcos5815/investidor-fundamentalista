"use client"
import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import { Box, ThemeProvider } from "@mui/material";
import theme from "./theme"
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient() 


const lexendDeca = Lexend_Deca({
  variable: "--font-lexend-deca",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={lexendDeca.className}
    >

      <body className="min-h-full min-w-full flex">
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
              <Sidebar />
              <Box className="flex flex-col mt-15 ml-2">
                {children}
              </Box>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
