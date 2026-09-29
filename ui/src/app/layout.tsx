import type { Metadata } from "next";
import "./globals.css";
import { DeviceProvider } from "@/components/DeviceContext";

export const metadata: Metadata = {
  title: "EdgeMind - Industrial Edge Vector Memory",
  description: "Offline-first edge vector memory platform for field-service reliability",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#121110] text-[#F2EEE6] min-h-screen">
        <DeviceProvider>{children}</DeviceProvider>
      </body>
    </html>
  );
}
