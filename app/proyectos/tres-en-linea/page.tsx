"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, RotateCcw, Trophy, User, Bot } from "lucide-react"
import Link from "next/link"
import { WolfLogo } from "@/components/logo"

type Player = "X" | "O" | null
type Board = Player[]
type GameStatus = "playing" | "won" | "draw"

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Filas
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columnas
  [0, 4, 8],
  [2, 4, 6], // Diagonales
]

export default function TresEnLineaPage() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X")
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing")
  const [winner, setWinner] = useState<Player>(null)
  const [scores, setScores] = useState({ player: 0, ai: 0, draws: 0 })
  const [isAiTurn, setIsAiTurn] = useState(false)

  const checkWinner = useCallback((board: Board): Player => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return null
  }, [])

  const isBoardFull = useCallback((board: Board): boolean => {
    return board.every((cell) => cell !== null)
  }, [])

  const getAvailableMoves = useCallback((board: Board): number[] => {
    return board.map((cell, index) => (cell === null ? index : -1)).filter((index) => index !== -1)
  }, [])

  // IA con algoritmo minimax simplificado
  const getBestMove = useCallback(
    (board: Board): number => {
      const availableMoves = getAvailableMoves(board)

      // Intentar ganar
      for (const move of availableMoves) {
        const testBoard = [...board]
        testBoard[move] = "O"
        if (checkWinner(testBoard) === "O") {
          return move
        }
      }

      // Bloquear al jugador
      for (const move of availableMoves) {
        const testBoard = [...board]
        testBoard[move] = "X"
        if (checkWinner(testBoard) === "X") {
          return move
        }
      }

      // Tomar el centro si está disponible
      if (board[4] === null) {
        return 4
      }

      // Tomar una esquina
      const corners = [0, 2, 6, 8]
      const availableCorners = corners.filter((corner) => board[corner] === null)
      if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)]
      }

      // Movimiento aleatorio
      return availableMoves[Math.floor(Math.random() * availableMoves.length)]
    },
    [getAvailableMoves, checkWinner],
  )

  const makeMove = useCallback(
    (index: number) => {
      if (board[index] || gameStatus !== "playing" || isAiTurn) return

      const newBoard = [...board]
      newBoard[index] = currentPlayer
      setBoard(newBoard)

      const gameWinner = checkWinner(newBoard)
      if (gameWinner) {
        setWinner(gameWinner)
        setGameStatus("won")
        setScores((prev) => ({
          ...prev,
          [gameWinner === "X" ? "player" : "ai"]: prev[gameWinner === "X" ? "player" : "ai"] + 1,
        }))
      } else if (isBoardFull(newBoard)) {
        setGameStatus("draw")
        setScores((prev) => ({ ...prev, draws: prev.draws + 1 }))
      } else {
        setCurrentPlayer("O")
        setIsAiTurn(true)
      }
    },
    [board, currentPlayer, gameStatus, isAiTurn, checkWinner, isBoardFull],
  )

  // IA hace su movimiento
  useEffect(() => {
    if (isAiTurn && gameStatus === "playing") {
      const timer = setTimeout(() => {
        const aiMove = getBestMove(board)
        const newBoard = [...board]
        newBoard[aiMove] = "O"
        setBoard(newBoard)

        const gameWinner = checkWinner(newBoard)
        if (gameWinner) {
          setWinner(gameWinner)
          setGameStatus("won")
          setScores((prev) => ({ ...prev, ai: prev.ai + 1 }))
        } else if (isBoardFull(newBoard)) {
          setGameStatus("draw")
          setScores((prev) => ({ ...prev, draws: prev.draws + 1 }))
        } else {
          setCurrentPlayer("X")
        }
        setIsAiTurn(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [isAiTurn, board, gameStatus, getBestMove, checkWinner, isBoardFull])

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer("X")
    setGameStatus("playing")
    setWinner(null)
    setIsAiTurn(false)
  }

  const resetScores = () => {
    setScores({ player: 0, ai: 0, draws: 0 })
    resetGame()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
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
            Tres en <span className="text-blue-600">Línea</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Juega el clásico triki contra una IA inteligente. ¿Podrás vencerla?
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Marcador */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Marcador
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Tú (X)</span>
                  </div>
                  <Badge variant="secondary">{scores.player}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-red-600" />
                    <span className="font-medium">IA (O)</span>
                  </div>
                  <Badge variant="secondary">{scores.ai}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Empates</span>
                  <Badge variant="secondary">{scores.draws}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estado del Juego</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {gameStatus === "playing" && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Turno actual:</p>
                    <Badge variant={isAiTurn ? "destructive" : "default"} className="text-lg px-4 py-2">
                      {isAiTurn ? "IA pensando..." : "Tu turno (X)"}
                    </Badge>
                  </div>
                )}

                {gameStatus === "won" && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">¡Juego terminado!</p>
                    <Badge variant={winner === "X" ? "default" : "destructive"} className="text-lg px-4 py-2">
                      {winner === "X" ? "¡Ganaste! 🎉" : "IA Ganó 🤖"}
                    </Badge>
                  </div>
                )}

                {gameStatus === "draw" && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">¡Juego terminado!</p>
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      Empate 🤝
                    </Badge>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <Button onClick={resetGame} className="w-full">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Nueva Partida
                  </Button>
                  <Button onClick={resetScores} variant="outline" className="w-full bg-transparent">
                    Reiniciar Marcador
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tablero de juego */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Tablero de Juego</CardTitle>
                <CardDescription>Haz clic en una casilla para hacer tu movimiento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
                  {board.map((cell, index) => (
                    <button
                      key={index}
                      onClick={() => makeMove(index)}
                      disabled={cell !== null || gameStatus !== "playing" || isAiTurn}
                      className={`
                        aspect-square bg-white border-2 border-gray-200 rounded-lg
                        flex items-center justify-center text-4xl font-bold
                        transition-all duration-200 hover:border-blue-300 hover:shadow-md
                        disabled:cursor-not-allowed
                        ${cell === "X" ? "text-blue-600 bg-blue-50" : ""}
                        ${cell === "O" ? "text-red-600 bg-red-50" : ""}
                        ${!cell && gameStatus === "playing" && !isAiTurn ? "hover:bg-gray-50" : ""}
                      `}
                    >
                      {cell}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Información del juego */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Cómo Jugar</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    • Tú juegas con las <strong className="text-blue-600">X</strong>, la IA con las{" "}
                    <strong className="text-red-600">O</strong>
                  </li>
                  <li>• El objetivo es conseguir tres símbolos en línea (horizontal, vertical o diagonal)</li>
                  <li>• Tú siempre empiezas primero</li>
                  <li>• La IA usa estrategias inteligentes para intentar ganar o bloquear tus movimientos</li>
                  <li>• ¡Intenta vencer a la máquina y conseguir la mayor puntuación!</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
