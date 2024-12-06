"use client";
import React, { useRef, useEffect, useState } from "react";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;
const BIRD_SIZE = 30;
const PIPE_WIDTH = 50;
const PIPE_GAP = 200;
const GRAVITY = 0.5;
const JUMP_STRENGTH = 6;

interface Pipe {
  x: number;
  height: number;
}

const FlappyBirdGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Game state refs
  const birdRef = useRef({
    y: CANVAS_HEIGHT / 2,
    velocity: 0,
  });
  const pipesRef = useRef<Pipe[]>([]);
  const frameCountRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !gameOver) {
        birdRef.current.velocity = -JUMP_STRENGTH;
      }

      if (gameOver && e.code === "Space") {
        resetGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const gameLoop = () => {
      if (gameOver) return;

      frameCountRef.current++;

      // Update bird physics
      birdRef.current.velocity += GRAVITY;
      birdRef.current.y += birdRef.current.velocity;

      // Generate pipes
      if (frameCountRef.current % 100 === 0) {
        const newPipe: Pipe = {
          x: CANVAS_WIDTH,
          height: Math.random() * (CANVAS_HEIGHT - PIPE_GAP - 100) + 50,
        };
        pipesRef.current.push(newPipe);
      }

      // Move pipes
      pipesRef.current = pipesRef.current
        .map((pipe) => ({ ...pipe, x: pipe.x - 3 }))
        .filter((pipe) => pipe.x > -PIPE_WIDTH);

      // Collision detection
      const checkCollision = pipesRef.current.some(
        (pipe) =>
          // Bird's horizontal position
          pipe.x < BIRD_SIZE &&
          pipe.x + PIPE_WIDTH > 0 &&
          // Top pipe collision
          (birdRef.current.y < pipe.height ||
            // Bottom pipe collision
            birdRef.current.y + BIRD_SIZE > pipe.height + PIPE_GAP)
      );

      // Floor and ceiling collision
      const floorCeilingCollision =
        birdRef.current.y + BIRD_SIZE > CANVAS_HEIGHT || birdRef.current.y < 0;

      if (checkCollision || floorCeilingCollision) {
        setGameOver(true);
        return;
      }

      // Increment score when passing pipes
      const passedPipes = pipesRef.current.filter(
        (pipe) =>
          pipe.x + PIPE_WIDTH < BIRD_SIZE && pipe.x + PIPE_WIDTH > BIRD_SIZE - 3
      );

      if (passedPipes.length > 0) {
        setScore((prev) => prev + passedPipes.length);
      }

      // Clear canvas
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw background
      ctx.fillStyle = "skyblue";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw pipes
      ctx.fillStyle = "green";
      pipesRef.current.forEach((pipe) => {
        // Top pipe
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.height);
        // Bottom pipe
        ctx.fillRect(
          pipe.x,
          pipe.height + PIPE_GAP,
          PIPE_WIDTH,
          CANVAS_HEIGHT - (pipe.height + PIPE_GAP)
        );
      });

      // Draw bird
      ctx.fillStyle = "yellow";
      ctx.fillRect(BIRD_SIZE, birdRef.current.y, BIRD_SIZE, BIRD_SIZE);

      // Continue game loop
      requestAnimationFrame(gameLoop);
    };

    const resetGame = () => {
      birdRef.current = {
        y: CANVAS_HEIGHT / 2,
        velocity: 0,
      };
      pipesRef.current = [];
      frameCountRef.current = 0;
      setScore(0);
      setGameOver(false);
      gameLoop();
    };

    // Start game loop
    gameLoop();

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameOver]);

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
          <div className="text-2xl text-white mb-4">Score: {score}</div>
          <button
            onClick={() => setGameOver(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Play Again (Space)
          </button>
        </div>
      )}
      <div className="mt-4 text-sm text-gray-600">Press SPACE to Fly</div>
    </div>
  );
};

export default FlappyBirdGame;
