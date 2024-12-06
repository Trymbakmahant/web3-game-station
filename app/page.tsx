// import FlappyBirdGame from "@/components/FlappyBirdGame/Game";

//import PublicSessionsPage from "@/components/PublicGamePage/Page";

import SnakeGame from "@/components/SnakeGame/Game";
export default function Home() {
  return (
    <div className="flex  w-screen h-screen justify-center items-center">
      <div>
        {/* <FlappyBirdGame /> */}
        <SnakeGame />
        {/* <PublicSessionsPage /> */}
      </div>
    </div>
  );
}
