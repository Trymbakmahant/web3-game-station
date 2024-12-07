// import FlappyBirdGame from "@/components/FlappyBirdGame/Game";

//import PublicSessionsPage from "@/components/PublicGamePage/Page";

import HeroSection from "@/components/HeroSection";
// import { AddGame } from "@/components/Wagmi/SaveScoreCard";
import SnakeGame from "@/components/SnakeGame/Game";
export default function Home() {
  return (
    <div className="">
      <div>
        {/* <FlappyBirdGame /> */}
        {/* <AddGame />
        <appkit-button /> */}
        <HeroSection />
        <SnakeGame />
        {/* <PublicSessionsPage /> */}
      </div>
    </div>
  );
}
