import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { AirGapBanner } from "@/components/AirGapBanner";

export default function DeviceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#121110]">
      <Header />
      <AirGapBanner />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[#121110]">
          {children}
        </main>
      </div>
    </div>
  );
}
