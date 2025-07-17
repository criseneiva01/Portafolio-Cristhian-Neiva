import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Palette, Zap, Users, Star, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { WolfLogo } from "@/components/logo"

export default function HomePage() {
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
              <Link href="#servicios" className="text-gray-600 hover:text-blue-600 transition-colors">
                Servicios
              </Link>
              <Link href="/proyectos" className="text-gray-600 hover:text-blue-600 transition-colors">
                Proyectos
              </Link>
              <Link href="#sobre-mi" className="text-gray-600 hover:text-blue-600 transition-colors">
                Sobre Mí
              </Link>
              <Link href="#contacto" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contacto
              </Link>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Comenzar Proyecto</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            15+ años de experiencia
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Desarrollo Web
            <span className="text-blue-600 block">Profesional</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Creo sitios web modernos, rápidos y escalables usando las últimas tecnologías. Desde landing pages hasta
            aplicaciones web complejas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/proyectos">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Ver Mis Proyectos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Contactar Ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mis Servicios</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ofrezco soluciones completas de desarrollo web adaptadas a tus necesidades específicas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Palette className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Desarrollo Frontend</CardTitle>
                <CardDescription>Interfaces modernas y responsive con React, Next.js y TypeScript</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• React & Next.js</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Responsive Design</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Desarrollo Backend</CardTitle>
                <CardDescription>APIs robustas y bases de datos escalables para tu aplicación</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Node.js & Express</li>
                  <li>• PostgreSQL & MongoDB</li>
                  <li>• APIs RESTful</li>
                  <li>• Autenticación</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Consultoría Web</CardTitle>
                <CardDescription>Asesoramiento técnico y optimización de proyectos existentes</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Auditoría de código</li>
                  <li>• Optimización SEO</li>
                  <li>• Performance</li>
                  <li>• Arquitectura</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Preview Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Proyectos Destacados</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Algunos de los proyectos más recientes que he desarrollado
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-white text-6xl">⭕❌</div>
              </div>
              <CardHeader>
                <CardTitle>Tres en Línea</CardTitle>
                <CardDescription>Juego clásico de triki contra la máquina con IA inteligente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">IA</Badge>
                </div>
                <Link href="/proyectos/tres-en-linea">
                  <Button variant="outline" size="sm">
                    Jugar Ahora
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                <div className="text-white text-6xl">🦕</div>
              </div>
              <CardHeader>
                <CardTitle>Dino Runner</CardTitle>
                <CardDescription>Recreación del famoso juego del dinosaurio de Chrome</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">Canvas</Badge>
                  <Badge variant="secondary">Game</Badge>
                </div>
                <Link href="/proyectos/dino-runner">
                  <Button variant="outline" size="sm">
                    Jugar Ahora
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-orange-500 to-red-600"></div>
              <CardHeader>
                <CardTitle>App de Gestión</CardTitle>
                <CardDescription>Sistema de gestión empresarial con múltiples módulos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Express</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                </div>
                <Button variant="outline" size="sm">
                  Ver Proyecto
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/proyectos">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Ver Todos los Proyectos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mi" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Sobre Mí</h2>
              <p className="text-gray-600 mb-6">
                Con más de 15 años de experiencia en desarrollo web, he trabajado con empresas de todos los tamaños,
                desde startups hasta corporaciones multinacionales. Mi pasión es crear soluciones web que no solo se
                vean increíbles, sino que también funcionen perfectamente.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">150+</div>
                  <div className="text-sm text-gray-600">Proyectos Completados</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">15+</div>
                  <div className="text-sm text-gray-600">Años de Experiencia</div>
                </div>
              </div>
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-gray-600">4.9/5 valoración promedio</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg h-96 flex items-center justify-center">
              <WolfLogo className="h-48 w-48 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Listo para tu próximo proyecto?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Contacta conmigo y hablemos sobre cómo puedo ayudarte a hacer realidad tu visión
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">contacto@devcrisproy.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">+57 300 123 4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">Buenaventura, Valle del Cauca, Colombia</span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Envíame un mensaje</CardTitle>
                <CardDescription>Te responderé en menos de 24 horas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Nombre</label>
                    <Input placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                    <Input type="email" placeholder="tu@email.com" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Asunto</label>
                  <Input placeholder="¿En qué puedo ayudarte?" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Mensaje</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md resize-none h-32"
                    placeholder="Cuéntame sobre tu proyecto..."
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Enviar Mensaje</Button>
              </CardContent>
            </Card>
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
