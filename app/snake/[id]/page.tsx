import CanvasSnakeGame from "@/components/SnakeGame/Game";
import { useEffect } from "react";

export default function SnakePage({ params }: { params: { id: string } }) {
  // Direct access to the dynamic route parameter
  const snakeId = params.id;
  if (!snakeId) {
    return null;
  }
  return (
    <div>
      <CanvasSnakeGame id={snakeId} />
    </div>
  );
}