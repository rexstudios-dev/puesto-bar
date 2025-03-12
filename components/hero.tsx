"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Coffee, Utensils, Wine } from "lucide-react"

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const isOpen = () => {
    const hour = time.getHours()
    const day = time.getDay()

    // Lunes a Jueves: 8:00 - 23:00
    if (day >= 1 && day <= 4) {
      return hour >= 8 && hour < 23
    }
    // Viernes y Sábados: 8:00 - 01:00
    else if (day === 5 || day === 6) {
      return hour >= 8 || hour < 1
    }
    // Domingos: 9:00 - 22:00
    else {
      return hour >= 9 && hour < 22
    }
  }

  return (
    <section id="home" ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
        <div className="absolute inset-0 bg-[url('/480587287_17866670049323794_2545615275566402580_n.jpg?height=1080&width=1920')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 + "%",
              rotate: Math.random() * 360,
              opacity: 0.1 + Math.random() * 0.2,
            }}
            animate={{
              y: [null, Math.random() * -30 - 10 + "%"],
              rotate: Math.random() * 360 + 180,
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          >
            {i % 3 === 0 ? (
              <Coffee size={20 + Math.random() * 40} />
            ) : i % 3 === 1 ? (
              <Utensils size={20 + Math.random() * 40} />
            ) : (
              <Wine size={20 + Math.random() * 40} />
            )}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ opacity }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Puesto Bar</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Café, comida y tragos en San Vicente, Buenos Aires
          </p>

          {/* Status Badge */}
          <div className="flex justify-center mb-8">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isOpen() ? "bg-green-500/80" : "bg-red-500/80"}`}
            >
              <span className={`h-3 w-3 rounded-full ${isOpen() ? "bg-green-300 animate-pulse" : "bg-red-300"}`}></span>
              <span className="text-white font-medium">{isOpen() ? "Abierto ahora" : "Cerrado ahora"}</span>
              <span className="text-white/80 text-sm">
                {time.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          </div>

          <motion.a
            href="#menu"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-full transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Menú
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <a href="#about" className="text-white">
          <ArrowDown size={32} />
        </a>
      </motion.div>
    </section>
  )
}

