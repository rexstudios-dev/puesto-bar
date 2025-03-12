"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="about" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">Bienvenidos a Puesto Bar</h2>
          <p className="text-lg text-gray-700 mb-8">
            En el corazón de San Vicente, Puesto Bar es un espacio donde la pasión por el café de especialidad se
            encuentra con la gastronomía de calidad. Desde nuestros desayunos artesanales hasta nuestros cócteles de
            autor, cada experiencia está pensada para deleitar tus sentidos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-amber-50 p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold text-amber-800 mb-3">Café de Especialidad</h3>
              <p className="text-gray-700">
                Seleccionamos los mejores granos para ofrecerte una experiencia única en cada taza.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-amber-50 p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold text-amber-800 mb-3">Cocina Artesanal</h3>
              <p className="text-gray-700">
                Platos preparados con ingredientes frescos y técnicas que resaltan los sabores naturales.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-amber-50 p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold text-amber-800 mb-3">Tragos de Autor</h3>
              <p className="text-gray-700">
                Nuestra barra ofrece creaciones únicas y clásicos reinventados para todos los gustos.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

