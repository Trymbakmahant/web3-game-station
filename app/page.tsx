import SnakeGame from "@/components/SnakeGame/Game";
export default function Home() {
  return (
    <div className="flex  w-screen h-screen justify-center items-center">
      <div>
        <SnakeGame />
      </div>
    </div>
  );
}
