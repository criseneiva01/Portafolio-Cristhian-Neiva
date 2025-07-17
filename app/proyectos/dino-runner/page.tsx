"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Play, Pause, RotateCcw, Trophy } from "lucide-react"
import Link from "next/link"
import { WolfLogo } from "@/components/logo"

interface GameObject {
  x: number
  y: number
  width: number
  height: number
}

interface Obstacle extends GameObject {
  type: "cactus" | "bird"
}

type GameState = "menu" | "playing" | "paused" | "gameOver"

export default function DinoRunnerPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [gameState, setGameState] = useState<GameState>("menu")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [speed, setSpeed] = useState(6)

  // Game objects
  const [dino, setDino] = useState<GameObject & { isJumping: boolean; velocityY: number }>({
    x: 50,
    y: 150,
    width: 40,
    height: 40,
    isJumping: false,
    velocityY: 0,
  })

  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [ground, setGround] = useState({ x: 0 })

  const CANVAS_WIDTH = 800
  const CANVAS_HEIGHT = 200
  const GROUND_Y = 150
  const GRAVITY = 0.8
  const JUMP_FORCE = -15

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("dino-high-score")
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore))
    }
  }, [])

  // Save high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem("dino-high-score", score.toString())
    }
  }, [score, highScore])

  const resetGame = useCallback(() => {
    setDino({
      x: 50,
      y: GROUND_Y,
      width: 40,
      height: 40,
      isJumping: false,
      velocityY: 0,
    })
    setObstacles([])
    setGround({ x: 0 })
    setScore(0)
    setSpeed(6)
  }, [])

  const jump = useCallback(() => {
    if (gameState === "playing" && !dino.isJumping) {
      setDino((prev) => ({
        ...prev,
        isJumping: true,
        velocityY: JUMP_FORCE,
      }))
    }
  }, [gameState, dino.isJumping])

  const startGame = useCallback(() => {
    resetGame()
    setGameState("playing")
  }, [resetGame])

  const pauseGame = useCallback(() => {
    setGameState((prev) => (prev === "playing" ? "paused" : "playing"))
  }, [])

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault()
        if (gameState === "menu" || gameState === "gameOver") {
          startGame()
        } else if (gameState === "playing") {
          jump()
        }
      }
      if (e.code === "KeyP") {
        pauseGame()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [gameState, startGame, jump, pauseGame])

  // Collision detection
  const checkCollision = useCallback((rect1: GameObject, rect2: GameObject): boolean => {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    )
  }, [])

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return

    const gameLoop = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      // Update dino physics
      setDino((prev) => {
        let newY = prev.y + prev.velocityY
        let newVelocityY = prev.velocityY + GRAVITY
        let newIsJumping = prev.isJumping

        if (newY >= GROUND_Y) {
          newY = GROUND_Y
          newVelocityY = 0
          newIsJumping = false
        }

        return {
          ...prev,
          y: newY,
          velocityY: newVelocityY,
          isJumping: newIsJumping,
        }
      })

      // Update ground
      setGround((prev) => ({
        x: prev.x - speed,
      }))

      // Update obstacles
      setObstacles((prev) => {
        const newObstacles = prev
          .map((obstacle) => ({
            ...obstacle,
            x: obstacle.x - speed,
          }))
          .filter((obstacle) => obstacle.x + obstacle.width > 0)

        // Add new obstacles
        if (newObstacles.length === 0 || newObstacles[newObstacles.length - 1].x < CANVAS_WIDTH - 300) {
          if (Math.random() < 0.02) {
            const obstacleType = Math.random() < 0.7 ? "cactus" : "bird"
            newObstacles.push({
              x: CANVAS_WIDTH,
              y: obstacleType === "cactus" ? GROUND_Y : GROUND_Y - 50,
              width: 30,
              height: obstacleType === "cactus" ? 40 : 30,
              type: obstacleType,
            })
          }
        }

        return newObstacles
      })

      // Check collisions
      obstacles.forEach((obstacle) => {
        if (checkCollision(dino, obstacle)) {
          setGameState("gameOver")
        }
      })

      // Update score and speed
      setScore((prev) => prev + 1)
      setSpeed((prev) => Math.min(prev + 0.001, 12))

      // Draw everything
      drawGame(ctx)

      animationRef.current = requestAnimationFrame(gameLoop)
    }

    animationRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameState, dino, obstacles, speed, checkCollision])

  const drawGame = (ctx: CanvasRenderingContext2D) => {
    // Draw ground
    ctx.fillStyle = "#83716D"
    ctx.fillRect(0, GROUND_Y + 40, CANVAS_WIDTH, 10)

    // Draw ground pattern
    ctx.fillStyle = "#A0A0A0"
    for (let i = 0; i < CANVAS_WIDTH / 20 + 1; i++) {
      const x = (ground.x % 20) + i * 20
      ctx.fillRect(x, GROUND_Y + 45, 10, 2)
    }

    // Draw dino
    ctx.fillStyle = dino.isJumping ? "#4ADE80" : "#22C55E"
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height)

    // Dino details
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(dino.x + 5, dino.y + 5, 8, 8) // Eye
    ctx.fillStyle = "#000000"
    ctx.fillRect(dino.x + 7, dino.y + 7, 4, 4) // Pupil

    // Draw obstacles
    obstacles.forEach((obstacle) => {
      if (obstacle.type === "cactus") {
        ctx.fillStyle = "#16A34A"
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
        // Cactus spikes
        ctx.fillStyle = "#15803D"
        ctx.fillRect(obstacle.x + 5, obstacle.y - 5, 5, 10)
        ctx.fillRect(obstacle.x + 20, obstacle.y - 5, 5, 10)
      } else {
        ctx.fillStyle = "#7C3AED"
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
        // Bird wings
        ctx.fillStyle = "#5B21B6"
        ctx.fillRect(obstacle.x - 5, obstacle.y + 5, 10, 5)
        ctx.fillRect(obstacle.x + 25, obstacle.y + 5, 10, 5)
      }
    })

    // Draw clouds
    ctx.fillStyle = "#E5E7EB"
    for (let i = 0; i < 3; i++) {
      const x = (ground.x * 0.5 + i * 300) % (CANVAS_WIDTH + 100)
      ctx.beginPath()
      ctx.arc(x, 30 + i * 10, 20, 0, Math.PI * 2)
      ctx.arc(x + 25, 25 + i * 10, 25, 0, Math.PI * 2)
      ctx.arc(x + 50, 30 + i * 10, 20, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <WolfLogo className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Dev.CrisProy</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/proyectos">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver a Proyectos
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dino <span className="text-green-600">Runner</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Recreación del famoso juego del dinosaurio de Chrome. ¡Salta obstáculos y consigue la mayor puntuación!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Game Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-gray-600">Puntuación</p>
                  <p className="text-2xl font-bold text-green-600">{Math.floor(score / 10)}</p>
                </div>
                <Trophy className="h-8 w-8 text-green-600" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-gray-600">Récord</p>
                  <p className="text-2xl font-bold text-yellow-600">{Math.floor(highScore / 10)}</p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-600" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-gray-600">Velocidad</p>
                  <p className="text-2xl font-bold text-blue-600">{speed.toFixed(1)}</p>
                </div>
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-white rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Game Canvas */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Juego</CardTitle>
                  <CardDescription>
                    {gameState === "menu" && "Presiona ESPACIO o el botón para empezar"}
                    {gameState === "playing" && "Presiona ESPACIO para saltar, P para pausar"}
                    {gameState === "paused" && "Juego pausado - Presiona P para continuar"}
                    {gameState === "gameOver" && "Game Over - Presiona ESPACIO para reiniciar"}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {gameState === "playing" && (
                    <Button onClick={pauseGame} variant="outline" size="sm">
                      <Pause className="h-4 w-4" />
                    </Button>
                  )}
                  {gameState === "paused" && (
                    <Button onClick={pauseGame} variant="outline" size="sm">
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                  <Button onClick={startGame} size="sm">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    {gameState === "menu" ? "Iniciar" : "Reiniciar"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-b from-blue-200 to-blue-100 rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={CANVAS_WIDTH}
                  height={CANVAS_HEIGHT}
                  className="w-full max-w-full h-auto cursor-pointer"
                  onClick={gameState === "playing" ? jump : startGame}
                />

                {/* Game State Overlays */}
                {gameState === "menu" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h2 className="text-3xl font-bold mb-4">🦕 Dino Runner</h2>
                      <p className="mb-4">¡Presiona ESPACIO para empezar!</p>
                      <Button onClick={startGame} size="lg" className="bg-green-600 hover:bg-green-700">
                        <Play className="mr-2 h-4 w-4" />
                        Jugar
                      </Button>
                    </div>
                  </div>
                )}

                {gameState === "paused" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h2 className="text-3xl font-bold mb-4">⏸️ Pausado</h2>
                      <Button onClick={pauseGame} size="lg" className="bg-blue-600 hover:bg-blue-700">
                        <Play className="mr-2 h-4 w-4" />
                        Continuar
                      </Button>
                    </div>
                  </div>
                )}

                {gameState === "gameOver" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h2 className="text-3xl font-bold mb-2">💀 Game Over</h2>
                      <p className="mb-2">Puntuación: {Math.floor(score / 10)}</p>
                      {score > highScore && <p className="mb-4 text-yellow-400">¡Nuevo récord! 🏆</p>}
                      <Button onClick={startGame} size="lg" className="bg-green-600 hover:bg-green-700">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Jugar de Nuevo
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Game Instructions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cómo Jugar</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    • <strong>ESPACIO</strong> o <strong>↑</strong>: Saltar
                  </li>
                  <li>
                    • <strong>P</strong>: Pausar/Continuar
                  </li>
                  <li>• Evita los cactus verdes en el suelo</li>
                  <li>• Evita los pájaros morados que vuelan</li>
                  <li>• La velocidad aumenta gradualmente</li>
                  <li>• ¡Consigue la mayor puntuación posible!</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Características</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Física realista de salto y gravedad</li>
                  <li>• Detección precisa de colisiones</li>
                  <li>• Velocidad progresiva</li>
                  <li>• Sistema de puntuación</li>
                  <li>• Guardado automático del récord</li>
                  <li>• Controles responsivos</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
