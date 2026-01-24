import PrizePool from "@/components/sections/PrizePool";
import Sponsors from "@/components/sections/Sponsors";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 text-black dark:bg-black dark:text-white">
      
      {/* Page Wrapper */}
      <main className="w-full">

        {/* Prize Pool Section */}
        <PrizePool />

        {/* Sponsors Section */}
        <Sponsors />

      </main>
    </div>
  );
}