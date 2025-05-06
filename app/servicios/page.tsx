"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
// Si usas TypeScript, asegúrate de tener instalado @types/react para evitar errores de JSX.

const getServicios = (lang: 'es' | 'en') => [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-camera w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>,
    title: lang === 'en' ? 'Photography & Video' : 'Fotografía y Video',
    description: lang === 'en'
      ? 'We create high-quality visual content, with images and videos designed to tell your story authentically, connect with your audience, and strengthen your market presence.'
      : 'Creamos contenido visual de alta calidad, con imágenes y videos diseñados para contar tu historia de manera auténtica, conectar con tu audiencia y fortalecer tu presencia en el mercado.',
    slug: "fotografia",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-megaphone w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-5v12L3 13v-2z"></path><path d="M11.6 16.8a2 2 0 1 1-3.2-2.6"></path></svg>,
    title: lang === 'en' ? 'Digital Marketing' : 'Marketing Digital',
    description: lang === 'en'
      ? 'We boost your brand with strategic digital marketing. We create effective campaigns, optimizing your online presence and leveraging the latest trends.'
      : 'Potenciamos tu marca con marketing digital estratégico. Creamos campañas efectivas optimizando tu presencia en línea y utilizando las tendencias más recientes.',
    slug: "marketing-digital",
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-smartphone w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" /><path d="M12 18h.01" /></svg>,
    title: lang === 'en' ? 'App Design & Development' : 'Diseño & Desarrollo de App',
    description: lang === 'en'
      ? 'We design and develop custom, modern, and functional mobile applications to help you stand out in the digital market.'
      : 'Diseñamos y desarrollamos aplicaciones móviles a medida, modernas y funcionales, para destacar en el mercado digital.',
    slug: "aplicaciones-moviles",
  },
  {
    icon: (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-primary" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="11" y="14" width="26" height="18" rx="2.5" fill="none" stroke="currentColor"/>
    <rect x="8" y="36" width="32" height="4" rx="1.5" fill="none" stroke="currentColor"/>
    <path d="M14 36V32a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" stroke="currentColor"/>
  </svg>
),
    title: lang === 'en' ? 'Web Design' : 'Diseño Web',
    description: lang === 'en'
      ? 'We create modern, attractive, and functional websites tailored to your brand and business goals.'
      : 'Creamos sitios web modernos, atractivos y funcionales, adaptados a tu marca y objetivos de negocio.',
    slug: "diseno-web",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-primary" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="8" width="32" height="32" rx="8" fill="none" stroke="currentColor"/>
        <path d="M16 20h16M16 24h16M16 28h10" stroke="currentColor"/>
        <circle cx="36" cy="36" r="4" fill="#FFD600" stroke="none"/>
        <circle cx="12" cy="36" r="4" fill="#FFD600" stroke="none"/>
        <circle cx="36" cy="12" r="4" fill="#FFD600" stroke="none"/>
      </svg>
    ),
    title: lang === 'en' ? 'Social Media Management' : 'Gestión de Redes Sociales',
    description: lang === 'en'
      ? 'Boost your brand on social media with engaging content and personalized strategies. We manage your profiles, create campaigns, and connect with your audience to ensure your brand’s growth and reputation.'
      : 'Impulsa tu marca en redes sociales con contenido atractivo y estrategias personalizadas. Gestionamos tus perfiles, creamos campañas y conectamos con tu audiencia para asegurar el crecimiento y la reputación de tu marca.',
    slug: "gestion-redes-sociales",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-primary" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="10" width="28" height="28" rx="6" fill="none" stroke="currentColor"/>
        <path d="M18 24h12M18 28h12" stroke="currentColor"/>
      </svg>
    ),
    title: lang === 'en' ? 'Branding' : 'Branding',
    description: lang === 'en'
      ? 'We help you build a strong, memorable brand identity that stands out in your market. From logo design to complete brand strategy.'
      : 'Te ayudamos a construir una identidad de marca fuerte y memorable que destaque en tu mercado. Desde el diseño de logotipo hasta la estrategia de marca completa.',
    slug: "branding",
  }
]

export default function Servicios() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [buttonAnimatingMobile, setButtonAnimatingMobile] = useState(false);
  const [buttonAnimatingDesktop, setButtonAnimatingDesktop] = useState(false);
  const router = useRouter();
  const [lang, setLang] = useState<'es'|'en'>(typeof window !== 'undefined' && (window as any).__contactLang === 'en' ? 'en' : 'es');

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    function syncLang() {
      setLang(typeof window !== 'undefined' && (window as any).__contactLang === 'en' ? 'en' : 'es');
    }
    window.addEventListener('click', syncLang);
    return () => window.removeEventListener('click', syncLang);
  }, []);

  const t = {
    title: lang === 'en' ? (<span>Our <span className="text-yellow-400">Services</span></span>) : (<span>Nuestros <span className="text-yellow-400">Servicios</span></span>),
    subtitle: lang === 'en' ? 'Discover Our Featured Services' : 'Descubre Nuestros Servicios Destacados',
    desc: lang === 'en'
      ? <>At <span className="text-yellow-400">Horizon</span>, we offer personalized solutions to boost <span className="text-yellow-400">your digital presence</span> and truly connect with your audience.</>
      : <>En <span className="text-yellow-400">Horizon</span>, ofrecemos soluciones personalizadas para impulsar <span className="text-yellow-400">tu presencia digital</span> y conectar realmente con tu audiencia.</>,
  };

  const servicios = getServicios(lang);

  return (
    <div className="min-h-screen relative bg-background">
      {/* Mano esquina inferior izquierda */}
      <Image
        src="/assets/esquina.png"
        alt="Mano esquina Horizon"
        className="hidden sm:block pointer-events-none select-none"
        style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          zIndex: 10,
          width: '170px', // Ajusta el tamaño según la imagen
          height: 'auto',
        }}
        width={170}
        height={120}
        priority
      />
      <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Flyer pegatina flotante, esquina superior derecha, solo visible en md+ */}
        <Image
          src="/flyer.png"
          alt="Flyer Horizon Pegatina"
          className="hidden md:block absolute top-6 right-10 w-44 md:w-52 rotate-[15deg] z-10 pointer-events-none select-none"
          width={208}
          height={208}
          priority
        />
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-black mb-4 text-foreground">{t.title}</h1>
          {/* Imagen flyer tipo pegatina, solo visible en md+ */}

                    <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              {t.subtitle}
            </h2>
            <p className="text-lg text-foreground">
              {t.desc}
            </p>
          </div>
        </motion.div>


        <div className="flex flex-col gap-8 w-full">
          {/* Primera fila: dos tarjetas */}
          <div className="md:grid md:grid-cols-2 md:gap-9 md:gap-y-8 flex flex-col gap-8 w-full">
            {servicios.slice(0,2).map((service, index) => (
  <Link
    key={service.title}
    href={`/servicios/${service.slug}`}
    className="group relative rounded-xl p-5 shadow-lg border border-primary/20 min-h-[180px] w-full max-w-sm md:max-w-full mx-auto flex flex-col justify-between outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 transition-all duration-300"
    tabIndex={0}
  >
    {/* Solo la tarjeta de Fotografía y Video lleva fondo */}
    {service.slug === 'fotografia' && (
  <span className="pointer-events-none absolute inset-0 rounded-xl z-0 overflow-hidden">
    <Image src="/assets/fondo1.JPG" alt="Fondo servicio" fill className="absolute inset-0 w-full h-full object-cover rounded-xl scale-105" style={{ opacity: 0.22, filter: 'blur(1px)' }} sizes="100vw" priority={false} />
    <span className="absolute inset-0 rounded-xl z-10 transition-all duration-500 group-hover:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] group-focus-visible:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] after:content-[''] after:absolute after:inset-0 after:rounded-xl after:border-2 after:border-yellow-400 after:opacity-0 group-hover:after:opacity-100 group-hover:after:animate-glow-border group-focus-visible:after:opacity-100 group-focus-visible:after:animate-glow-border"></span>
  </span>
)}
{service.slug === 'marketing-digital' && (
  <span className="pointer-events-none absolute inset-0 rounded-xl z-0 overflow-hidden">
    <Image src="/assets/fondo2.JPG" alt="Fondo servicio" fill className="absolute inset-0 w-full h-full object-cover rounded-xl scale-105" style={{ opacity: 0.22, filter: 'blur(1px)' }} sizes="100vw" priority={false} />
    <span className="absolute inset-0 rounded-xl z-10 transition-all duration-500 group-hover:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] group-focus-visible:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] after:content-[''] after:absolute after:inset-0 after:rounded-xl after:border-2 after:border-yellow-400 after:opacity-0 group-hover:after:opacity-100 group-hover:after:animate-glow-border group-focus-visible:after:opacity-100 group-focus-visible:after:animate-glow-border"></span>
  </span>
)}
{service.slug === 'aplicaciones-moviles' && (
  <span className="pointer-events-none absolute inset-0 rounded-xl z-0 overflow-hidden">
    <Image src="/assets/fondo3.JPG" alt="Fondo servicio" fill className="absolute inset-0 w-full h-full object-cover rounded-xl scale-105" style={{ opacity: 0.22, filter: 'blur(1px)' }} sizes="100vw" priority={false} />
    <span className="absolute inset-0 rounded-xl z-10 transition-all duration-500 group-hover:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] group-focus-visible:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] after:content-[''] after:absolute after:inset-0 after:rounded-xl after:border-2 after:border-yellow-400 after:opacity-0 group-hover:after:opacity-100 group-hover:after:animate-glow-border group-focus-visible:after:opacity-100 group-focus-visible:after:animate-glow-border"></span>
  </span>
)}
{service.slug === 'diseno-web' && (
  <span className="pointer-events-none absolute inset-0 rounded-xl z-0 overflow-hidden">
    <Image src="/assets/fondo4.JPG" alt="Fondo servicio" fill className="absolute inset-0 w-full h-full object-cover rounded-xl scale-105" style={{ opacity: 0.22, filter: 'blur(1px)' }} sizes="100vw" priority={false} />
    <span className="absolute inset-0 rounded-xl z-10 transition-all duration-500 group-hover:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] group-focus-visible:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] after:content-[''] after:absolute after:inset-0 after:rounded-xl after:border-2 after:border-yellow-400 after:opacity-0 group-hover:after:opacity-100 group-hover:after:animate-glow-border group-focus-visible:after:opacity-100 group-focus-visible:after:animate-glow-border"></span>
  </span>
)}
{service.slug === 'gestion-redes-sociales' && (
  <span className="pointer-events-none absolute inset-0 rounded-xl z-0 overflow-hidden">
    <Image src="/assets/fondo5.JPG" alt="Fondo servicio" fill className="absolute inset-0 w-full h-full object-cover rounded-xl scale-105" style={{ opacity: 0.22, filter: 'blur(1px)' }} sizes="100vw" priority={false} />
    <span className="absolute inset-0 rounded-xl z-10 transition-all duration-500 group-hover:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] group-focus-visible:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] after:content-[''] after:absolute after:inset-0 after:rounded-xl after:border-2 after:border-yellow-400 after:opacity-0 group-hover:after:opacity-100 group-hover:after:animate-glow-border group-focus-visible:after:opacity-100 group-focus-visible:after:animate-glow-border"></span>
  </span>
)}
{service.slug !== 'fotografia' && service.slug !== 'marketing-digital' && service.slug !== 'aplicaciones-moviles' && service.slug !== 'diseno-web' && service.slug !== 'gestion-redes-sociales' && (
  <span className="pointer-events-none absolute inset-0 rounded-xl z-0 transition-all duration-500 group-hover:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] group-focus-visible:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] after:content-[''] after:absolute after:inset-0 after:rounded-xl after:border-2 after:border-yellow-400 after:opacity-0 group-hover:after:opacity-100 group-hover:after:animate-glow-border group-focus-visible:after:opacity-100 group-focus-visible:after:animate-glow-border"></span>
) }
                <div className="flex items-center mb-4 relative z-10">
                  {service.icon}
                  <h3 className="text-2xl font-bold ml-4 text-foreground">{service.title}</h3>
                </div>
                <p className="mb-4 relative z-10 text-foreground">{service.description}</p>
                <div className="mt-6 flex items-center justify-center relative z-10">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-black group-hover:bg-primary/80 transition-colors shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <circle cx="10" cy="10" r="9" fill="none" />
                      <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {/* Segunda fila: dos tarjetas */}
          <div className="md:grid md:grid-cols-2 md:gap-9 md:gap-y-8 flex flex-col gap-8 w-full">
            {servicios.slice(2,4).map((service, index) => (
  <Link
    key={service.title}
    href={`/servicios/${service.slug}`}
    className="group relative rounded-xl p-5 shadow-lg border border-primary/20 min-h-[180px] w-full max-w-sm md:max-w-full mx-auto flex flex-col justify-between outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 transition-all duration-300"
    tabIndex={0}
  >
    {/* Fondo solo para Diseño & Desarrollo de App */}
    {service.slug === 'aplicaciones-moviles' && (
      <span className="pointer-events-none absolute inset-0 rounded-xl z-0 overflow-hidden">
        <Image src="/assets/fondo3.JPG" alt="Fondo servicio" fill className="absolute inset-0 w-full h-full object-cover rounded-xl scale-105" style={{ opacity: 0.22, filter: 'blur(1px)' }} sizes="100vw" priority={false} />
        <span className="absolute inset-0 rounded-xl z-10 transition-all duration-500 group-hover:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] group-focus-visible:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] after:content-[''] after:absolute after:inset-0 after:rounded-xl after:border-2 after:border-yellow-400 after:opacity-0 group-hover:after:opacity-100 group-hover:after:animate-glow-border group-focus-visible:after:opacity-100 group-focus-visible:after:animate-glow-border"></span>
      </span>
    )}
    {service.slug === 'diseno-web' && (
      <span className="pointer-events-none absolute inset-0 rounded-xl z-0 overflow-hidden">
        <Image src="/assets/fondo4.JPG" alt="Fondo servicio" fill className="absolute inset-0 w-full h-full object-cover rounded-xl scale-105" style={{ opacity: 0.22, filter: 'blur(1px)' }} sizes="100vw" priority={false} />
        <span className="absolute inset-0 rounded-xl z-10 transition-all duration-500 group-hover:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] group-focus-visible:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] after:content-[''] after:absolute after:inset-0 after:rounded-xl after:border-2 after:border-yellow-400 after:opacity-0 group-hover:after:opacity-100 group-hover:after:animate-glow-border group-focus-visible:after:opacity-100 group-focus-visible:after:animate-glow-border"></span>
      </span>
    )}
    {service.slug === 'gestion-redes-sociales' && (
      <span className="pointer-events-none absolute inset-0 rounded-xl z-0 overflow-hidden">
        <Image src="/assets/fondo5.JPG" alt="Fondo servicio" fill className="absolute inset-0 w-full h-full object-cover rounded-xl scale-105" style={{ opacity: 0.22, filter: 'blur(1px)' }} sizes="100vw" priority={false} />
        <span className="absolute inset-0 rounded-xl z-10 transition-all duration-500 group-hover:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] group-focus-visible:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] after:content-[''] after:absolute after:inset-0 after:rounded-xl after:border-2 after:border-yellow-400 after:opacity-0 group-hover:after:opacity-100 group-hover:after:animate-glow-border group-focus-visible:after:opacity-100 group-focus-visible:after:animate-glow-border"></span>
      </span>
    )}
    {service.title !== 'Diseño & Desarrollo de App' && service.title !== 'Diseño Web' && (
      <span className="pointer-events-none absolute inset-0 rounded-xl z-0 transition-all duration-500 group-hover:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] group-focus-visible:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] after:content-[''] after:absolute after:inset-0 after:rounded-xl after:border-2 after:border-yellow-400 after:opacity-0 group-hover:after:opacity-100 group-hover:after:animate-glow-border group-focus-visible:after:opacity-100 group-focus-visible:after:animate-glow-border"></span>
    )}
                <div className="flex items-center mb-4 relative z-10">
                  {service.icon}
                  <h3 className="text-2xl font-bold ml-4 text-foreground">{service.title}</h3>
                </div>
                <p className="mb-4 relative z-10 text-foreground">{service.description}</p>
                <div className="mt-6 flex items-center justify-center relative z-10">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-black group-hover:bg-primary/80 transition-colors shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <circle cx="10" cy="10" r="9" fill="none" />
                      <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {/* Tercera fila: dos tarjetas */}
          <div className="md:grid md:grid-cols-2 md:gap-9 md:gap-y-8 flex flex-col gap-8 w-full">
            {[servicios[4], servicios[5]].map((service, index) => (
              <Link
                key={service.title}
                href={`/servicios/${service.slug}`}
                className="group relative rounded-xl p-5 shadow-lg border border-primary/20 min-h-[180px] w-full max-w-sm md:max-w-full mx-auto flex flex-col justify-between outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 transition-all duration-300"
                tabIndex={0}
              >
                {/* Fondo para Gestión de Redes Sociales */}
                {service.slug === 'gestion-redes-sociales' && (
                  <span className="pointer-events-none absolute inset-0 rounded-xl z-0 overflow-hidden">
                    <Image src="/assets/fondo5.JPG" alt="Fondo servicio" fill className="absolute inset-0 w-full h-full object-cover rounded-xl scale-105" style={{ opacity: 0.22, filter: 'blur(1px)' }} sizes="100vw" priority={false} />
                    <span className="absolute inset-0 rounded-xl z-10 transition-all duration-500 group-hover:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] group-focus-visible:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] after:content-[''] after:absolute after:inset-0 after:rounded-xl after:border-2 after:border-yellow-400 after:opacity-0 group-hover:after:opacity-100 group-hover:after:animate-glow-border group-focus-visible:after:opacity-100 group-focus-visible:after:animate-glow-border"></span>
                  </span>
                )}
                {/* Fondo para Branding */}
                {service.slug === 'branding' && (
                  <span className="pointer-events-none absolute inset-0 rounded-xl z-0 overflow-hidden">
                    <Image src="/assets/branding2.jpg" alt="Fondo Branding" fill className="absolute inset-0 w-full h-full object-cover rounded-xl scale-105" style={{ opacity: 0.22, filter: 'blur(1px)' }} sizes="100vw" priority={false} />
                    <span className="absolute inset-0 rounded-xl z-10 transition-all duration-500 group-hover:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] group-focus-visible:shadow-[0_0_24px_8px_#FFD600,0_0_0_4px_#FFD600] after:content-[''] after:absolute after:inset-0 after:rounded-xl after:border-2 after:border-yellow-400 after:opacity-0 group-hover:after:opacity-100 group-hover:after:animate-glow-border group-focus-visible:after:opacity-100 group-focus-visible:after:animate-glow-border"></span>
                  </span>
                )}
                <div className="flex items-center mb-4 relative z-10">
                  {service.icon}
                  <h3 className="text-2xl font-bold ml-4 text-foreground">{service.title}</h3>
                </div>
                <p className="mb-4 relative z-10 text-foreground">{service.description}</p>
                <div className="mt-6 flex items-center justify-center relative z-10">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-black group-hover:bg-primary/80 transition-colors shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <circle cx="10" cy="10" r="9" fill="none" />
                      <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Línea amarilla animada y metodología (versión especial servicios, con pulso automático) */}
        {(() => {
          const puntos = lang === 'en'
  ? [
      "Discovery",
      "Strategy",
      "Creativity",
      "Development",
      "Launch",
      "Support"
    ]
  : [
      "Descubrimiento",
      "Estrategia",
      "Creatividad",
      "Desarrollo",
      "Lanzamiento",
      "Soporte"
    ];
          const [activeIdx, setActiveIdx] = useState(0);
          useEffect(() => {
            const interval = setInterval(() => {
              setActiveIdx((prev: number) => (prev + 1) % puntos.length);
            }, 5000);
            return () => clearInterval(interval);
          }, [puntos.length]);
          return (
            <div className="w-full flex flex-col items-center py-16 bg-transparent mb-10 md:mb-16 mt-10 md:mt-16">
              <div className="max-w-5xl w-full flex flex-col items-center">
                <div className="relative w-full flex flex-col gap-8 md:gap-12">
                  {/* Línea amarilla animada fina y más marcada */}
                  <motion.div
                    className="absolute z-0 left-[3.5%] right-[3.5%] top-4 hidden md:block"
                    initial={{ width: 0 }}
                    animate={{ width: '93%' }}
                    transition={{ duration: 1 }}
                    style={{ height: 2 }}
                  >
                    <div className="h-[2px] w-full bg-[#FFD600]" style={{filter: 'drop-shadow(0 0 12px #FFD600) drop-shadow(0 0 24px #FFD600AA)'}} />
                  </motion.div>
                  {/* Puntos y frases */}
                  <div className="relative w-full flex flex-col md:flex-row items-center justify-between z-10">
                    {puntos.map((txt, idx) => (
  <div
    key={idx}
    className="flex flex-col items-center group md:w-1/6 w-full gap-0 mb-6 md:mb-0 last:mb-0 md:last:mb-0"
    style={{ gap: 0 }}
  >
    {/* Bola con glow sutil y pulso automático */}
    <motion.div
      className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#FFD600] border-4 border-black shadow-[0_0_8px_2px_#FFD600,0_0_12px_4px_#FFD60044]"
      style={{ boxShadow: '0 0 8px 2px #FFD600, 0 0 12px 4px #FFD60044' }}
      animate={activeIdx === idx ? { scale: 1.25, boxShadow: '0 0 16px 6px #FFD600, 0 0 24px 10px #FFD60044' } : { scale: 1, boxShadow: '0 0 8px 2px #FFD600, 0 0 12px 4px #FFD60044' }}
      transition={{ type: 'spring', stiffness: 350, damping: 18 }}
    />
    <span
      className={`text-xs md:text-sm text-center break-words leading-tight max-w-[6.5rem] md:max-w-[8rem] text-black dark:text-gray-200 md:font-semibold mt-3 md:mt-2 drop-shadow-md ${activeIdx === idx ? 'text-yellow-300 scale-110 font-bold' : ''}`}
    >
      {txt}
    </span>
  </div>
))}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}


        {/* Botón de contacto adaptativo */}
        <div className="w-full flex flex-col items-center justify-center mt-12 mb-2">
          {/* Botón SOLO para móvil */}
          <motion.a
            className="flex sm:hidden items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black w-40 h-12 rounded-full shadow-lg transition-all duration-200 mx-auto font-bold text-lg"
            aria-label="Contactar"
            initial={false}
            animate={buttonAnimatingMobile ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            onClick={async (e) => {
              e.preventDefault();
              setButtonAnimatingMobile(true);
              setTimeout(() => {
                router.push("/contacto");
                setButtonAnimatingMobile(false);
              }, 350);
            }}
            href="/contacto"
            style={{ cursor: buttonAnimatingMobile ? 'not-allowed' : undefined }}
          >
            Contáctanos
          </motion.a>
          {/* Botón SOLO para desktop */}
          <motion.a
            href="/contacto"
            className="hidden sm:inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-200 text-lg text-center"
            style={{ wordBreak: 'break-word', whiteSpace: 'normal', cursor: buttonAnimatingDesktop ? 'not-allowed' : undefined }}
            initial={false}
            animate={buttonAnimatingDesktop ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            onClick={async (e) => {
              e.preventDefault();
              setButtonAnimatingDesktop(true);
              setTimeout(() => {
                router.push("/contacto");
                setButtonAnimatingDesktop(false);
              }, 350);
            }}
          >
            Contáctanos
          </motion.a>
        </div>
      </div>
    </div>
  );
}

// Animación global para el glow/neón
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
  @keyframes glow-border {
    0% {
      box-shadow: 0 0 0 0 #FFD600, 0 0 0 0 #FFD600;
      border-color: transparent;
      opacity: 1;
    }
    40% {
      box-shadow: 0 0 24px 8px #FFD600, 0 0 0 4px #FFD600;
      border-color: #FFD600;
      opacity: 1;
    }
    100% {
      box-shadow: 0 0 0 0 #FFD600, 0 0 0 0 #FFD600;
      border-color: transparent;
      opacity: 0;
    }
  }
  `;
  document.head.appendChild(style);
}
