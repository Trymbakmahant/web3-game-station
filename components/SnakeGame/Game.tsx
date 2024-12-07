"use client";
import React, { useRef, useEffect, useState } from "react";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const CANVAS_WIDTH = GRID_SIZE * CELL_SIZE;
const CANVAS_HEIGHT = GRID_SIZE * CELL_SIZE;

const INITIAL_SNAKE_SPEED = 5;
const SPEED_INCREASE_INTERVAL = 5;

interface Point {
  x: number;
  y: number;
}

const CanvasSnakeGame = ({ id }: { id: string }) => {
  console.log(id);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Game state refs to avoid stale closures
  const snakeRef = useRef<Point[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const foodRef = useRef<Point>({ x: 15, y: 15 });
  const directionRef = useRef<{ x: number; y: number }>({ x: 1, y: 0 });
  const speedRef = useRef(INITIAL_SNAKE_SPEED);
  const frameCountRef = useRef(0);

  const generateFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    return newFood;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (directionRef.current.y === 0)
            directionRef.current = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          if (directionRef.current.y === 0)
            directionRef.current = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          if (directionRef.current.x === 0)
            directionRef.current = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          if (directionRef.current.x === 0)
            directionRef.current = { x: 1, y: 0 };
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const gameLoop = () => {
      if (gameOver) return;

      frameCountRef.current++;

      // Only update snake position periodically based on speed
      if (
        frameCountRef.current %
          Math.max(1, Math.floor(60 / speedRef.current)) ===
        0
      ) {
        const snake = snakeRef.current;
        const food = foodRef.current;
        const newHead = {
          x: (snake[0].x + directionRef.current.x + GRID_SIZE) % GRID_SIZE,
          y: (snake[0].y + directionRef.current.y + GRID_SIZE) % GRID_SIZE,
        };

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          // Grow snake
          snake.unshift(newHead);

          // Increase score and speed
          setScore((prev) => {
            const newScore = prev + 1;
            // Increase speed every few levels
            if (newScore > 0 && newScore % SPEED_INCREASE_INTERVAL === 0) {
              speedRef.current = Math.min(speedRef.current + 1, 15);
            }
            return newScore;
          });

          // Generate new food
          foodRef.current = generateFood();
        } else {
          // Normal movement
          snake.unshift(newHead);
          snake.pop();
        }

        // Check self-collision
        const selfCollision = snake
          .slice(1)
          .some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y
          );

        if (selfCollision) {
          setGameOver(true);
        }

        snakeRef.current = snake;
      }

      // Clear canvas
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw grid (optional)
      ctx.strokeStyle = "rgba(0,0,0,0.1)";
      for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
          ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }

      // Draw snake
      snakeRef.current.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "darkgreen" : "green";
        ctx.fillRect(
          segment.x * CELL_SIZE,
          segment.y * CELL_SIZE,
          CELL_SIZE - 1,
          CELL_SIZE - 1
        );
      });

      // Draw food
      ctx.fillStyle = "red";
      ctx.fillRect(
        foodRef.current.x * CELL_SIZE,
        foodRef.current.y * CELL_SIZE,
        CELL_SIZE - 1,
        CELL_SIZE - 1
      );

      // Continue game loop
      requestAnimationFrame(gameLoop);
    };

    // const resetGame = () => {
    //   snakeRef.current = [
    //     { x: 10, y: 10 },
    //     { x: 9, y: 10 },
    //     { x: 8, y: 10 },
    //   ];
    //   directionRef.current = { x: 1, y: 0 };
    //   foodRef.current = generateFood();
    //   speedRef.current = INITIAL_SNAKE_SPEED;
    //   frameCountRef.current = 0;
    //   setScore(0);
    //   setGameOver(false);
    // };

    // Start game loop
    gameLoop();

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameOver]);

  const handleReset = () => {
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-4 text-2xl font-bold">Score: {score}</div>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-4 border-gray-700"
      />
      {gameOver && (
        <div className="absolute flex flex-col items-center justify-center bg-black bg-opacity-50 w-full h-full">
          <div className="text-4xl text-white mb-4">Game Over</div>
          <button
            onClick={handleReset}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Play Again
          </button>
        </div>
      )}
      <div className="mt-4 text-sm text-gray-600">
        Use Arrow Keys to Control the Snake
      </div>
    </div>
  );
};

export default CanvasSnakeGame;
