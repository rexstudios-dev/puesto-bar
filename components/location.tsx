"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { MapPin, Clock, Instagram } from "lucide-react"

export default function Location() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="location" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2 text-center">Ubicación</h2>
          <p className="text-center text-gray-700 mb-12">Visítanos y disfruta de la experiencia Puesto Bar</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-amber-50 p-6 rounded-lg"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-amber-700 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900 mb-1">Dirección</h3>
                    <p className="text-gray-700">
                      Av. Libertador Gral San Martín 30
                      <br />
                      San Vicente, Buenos Aires, Argentina
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-amber-700 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900 mb-1">Horarios</h3>
                    <p className="text-gray-700">
                      Lunes a Jueves: 8:00 - 23:00
                      <br />
                      Viernes y Sábados: 8:00 - 01:00
                      <br />
                      Domingos: 9:00 - 22:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Instagram className="h-6 w-6 text-amber-700 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900 mb-1">Redes Sociales</h3>
                    <a
                      href="https://instagram.com/puesto.sanvicente"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700 hover:text-amber-900 transition-colors"
                    >
                      @puesto.sanvicente
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="h-[400px] rounded-lg overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.0887124055!2d-58.42!3d-34.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDU4JzEyLjAiUyA1OMKwMjUnMTIuMCJX!5e0!3m2!1sen!2sar!4v1624451234567!5m2!1sen!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Puesto Bar"
                className="rounded-lg"
              ></iframe>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

