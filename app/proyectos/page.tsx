import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { WolfLogo } from "@/components/logo"

export default function ProyectosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <WolfLogo className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Dev.CrisProy</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#servicios" className="text-gray-600 hover:text-blue-600 transition-colors">
                Servicios
              </Link>
              <Link href="/proyectos" className="text-blue-600 font-medium">
                Proyectos
              </Link>
              <Link href="/#sobre-mi" className="text-gray-600 hover:text-blue-600 transition-colors">
                Sobre Mí
              </Link>
              <Link href="/#contacto" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contacto
              </Link>
            </div>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Mis <span className="text-blue-600">Proyectos</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Una colección de proyectos web interactivos, juegos y aplicaciones que demuestran mis habilidades en
            desarrollo frontend y backend.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tres en Línea */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
                <div className="text-white text-6xl group-hover:scale-110 transition-transform">⭕❌</div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ExternalLink className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Tres en Línea
                  <Badge variant="secondary">Juego</Badge>
                </CardTitle>
                <CardDescription>
                  Juego clásico de triki (tic-tac-toe) donde puedes enfrentarte contra una IA inteligente. Incluye
                  diferentes niveles de dificultad y animaciones suaves.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">IA</Badge>
                  <Badge variant="outline">Animaciones</Badge>
                </div>
                <div className="flex gap-2">
                  <Link href="/proyectos/tres-en-linea" className="flex-1">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Jugar Ahora</Button>
                  </Link>
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Dino Runner */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center relative overflow-hidden">
                <div className="text-white text-6xl group-hover:scale-110 transition-transform">🦕</div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ExternalLink className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Dino Runner
                  <Badge variant="secondary">Juego</Badge>
                </CardTitle>
                <CardDescription>
                  Recreación del famoso juego del dinosaurio de Chrome. Salta obstáculos, acumula puntos y desafía tus
                  reflejos en este adictivo juego endless runner.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">JavaScript</Badge>
                  <Badge variant="outline">Canvas</Badge>
                  <Badge variant="outline">Game Engine</Badge>
                  <Badge variant="outline">Physics</Badge>
                </div>
                <div className="flex gap-2">
                  <Link href="/proyectos/dino-runner" className="flex-1">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Jugar Ahora</Button>
                  </Link>
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* E-commerce */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center relative overflow-hidden">
                <div className="text-white text-6xl group-hover:scale-110 transition-transform">🛒</div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ExternalLink className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  E-commerce Moderno
                  <Badge variant="secondary">Web App</Badge>
                </CardTitle>
                <CardDescription>
                  Tienda online completa con carrito de compras, sistema de pagos, gestión de inventario y panel de
                  administración.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">Stripe</Badge>
                  <Badge variant="outline">PostgreSQL</Badge>
                  <Badge variant="outline">Auth</Badge>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Ver Demo</Button>
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Dashboard Analytics */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center relative overflow-hidden">
                <div className="text-white text-6xl group-hover:scale-110 transition-transform">📊</div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ExternalLink className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Dashboard Analytics
                  <Badge variant="secondary">Dashboard</Badge>
                </CardTitle>
                <CardDescription>
                  Panel de control con métricas en tiempo real, gráficos interactivos y reportes personalizables para
                  análisis de datos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">D3.js</Badge>
                  <Badge variant="outline">WebSocket</Badge>
                  <Badge variant="outline">Charts</Badge>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-orange-600 hover:bg-orange-700">Ver Demo</Button>
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Task Manager */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center relative overflow-hidden">
                <div className="text-white text-6xl group-hover:scale-110 transition-transform">✅</div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ExternalLink className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Task Manager
                  <Badge variant="secondary">Productivity</Badge>
                </CardTitle>
                <CardDescription>
                  Aplicación de gestión de tareas con funcionalidades de colaboración en equipo, notificaciones y
                  seguimiento de progreso.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Vue.js</Badge>
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">MongoDB</Badge>
                  <Badge variant="outline">Socket.io</Badge>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-teal-600 hover:bg-teal-700">Ver Demo</Button>
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Weather App */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-48 bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center relative overflow-hidden">
                <div className="text-white text-6xl group-hover:scale-110 transition-transform">🌤️</div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ExternalLink className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Weather App
                  <Badge variant="secondary">Utility</Badge>
                </CardTitle>
                <CardDescription>
                  Aplicación del clima con pronósticos detallados, mapas interactivos y alertas meteorológicas
                  personalizadas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">React Native</Badge>
                  <Badge variant="outline">API Integration</Badge>
                  <Badge variant="outline">Geolocation</Badge>
                  <Badge variant="outline">PWA</Badge>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">Ver Demo</Button>
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Te gusta lo que ves?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Estos son solo algunos ejemplos de lo que puedo crear. Si tienes una idea en mente, hablemos sobre cómo
            puedo ayudarte a hacerla realidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contacto">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Iniciar un Proyecto
              </Button>
            </Link>
            <Link href="/">
              <Button size="lg" variant="outline">
                Conocer Más Sobre Mí
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <WolfLogo className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold">Dev.CrisProy</span>
              </div>
              <p className="text-gray-400 text-sm">Desarrollo web profesional desde Buenaventura, Colombia</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Desarrollo Frontend</li>
                <li>Desarrollo Backend</li>
                <li>Consultoría Web</li>
                <li>Mantenimiento</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Proyectos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/proyectos/tres-en-linea" className="hover:text-white">
                    Tres en Línea
                  </Link>
                </li>
                <li>
                  <Link href="/proyectos/dino-runner" className="hover:text-white">
                    Dino Runner
                  </Link>
                </li>
                <li>
                  <Link href="/proyectos" className="hover:text-white">
                    Ver Todos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>contacto@devcrisproy.com</li>
                <li>+57 300 123 4567</li>
                <li>Buenaventura, Colombia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Dev.CrisProy. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
