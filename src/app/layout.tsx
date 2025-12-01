import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Regulatory Feed",
  description: "Track regulatory discussions and trends across AI Act, Data Act, DMA, and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
