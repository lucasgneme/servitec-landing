import { useState, useEffect, type FormEvent } from 'react';
import { supabase } from './lib/supabaseClient';

// Iconos SVG personalizados para mantener el diseño premium
const Icons = {
    Rocket: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00A3FF]"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 3.86-8.52c.4-.58.9-.99 1.54-1.34C15.4 1.55 16.5 1.5 17.5 1.5l.5.5c0 1 .05 2.1-.64 3.1-3.13 4.54-6.32 8.35-8.52 10.9Z" /><path d="m15.5 12-3-3" /><path d="m10 18 4 4" /></svg>
    ),
    Layers: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00A3FF]"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
    ),
    Settings: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00A3FF]"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
    ),
    Logo: () => (
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 overflow-hidden shadow-sm">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                {/* Smartphone body */}
                <rect x="30" y="12" width="32" height="56" rx="4" ry="4" stroke="#00A3FF" strokeWidth="4" fill="#00A3FF" opacity="0.15" />
                <rect x="30" y="12" width="32" height="56" rx="4" ry="4" stroke="#00A3FF" strokeWidth="4" fill="none" />
                {/* Screen */}
                <rect x="34" y="20" width="24" height="40" rx="1" fill="#00A3FF" opacity="0.25" />
                {/* Home button */}
                <circle cx="46" cy="64" r="2" fill="#00A3FF" />
                {/* Wrench */}
                <path d="M68 30 L78 20 Q82 16 86 20 L86 20 Q90 24 86 28 L76 38 L73 35 L83 25 Q84 24 83 23 L83 23 Q82 22 81 23 L71 33 Z" fill="#00A3FF" />
                {/* Gear */}
                <circle cx="22" cy="78" r="8" stroke="#00A3FF" strokeWidth="3" fill="none" />
                <circle cx="22" cy="78" r="3" fill="#00A3FF" />
                {/* Gear teeth */}
                <line x1="22" y1="67" x2="22" y2="71" stroke="#00A3FF" strokeWidth="3" strokeLinecap="round" />
                <line x1="22" y1="85" x2="22" y2="89" stroke="#00A3FF" strokeWidth="3" strokeLinecap="round" />
                <line x1="13" y1="78" x2="11" y2="78" stroke="#00A3FF" strokeWidth="3" strokeLinecap="round" />
                <line x1="31" y1="78" x2="33" y2="78" stroke="#00A3FF" strokeWidth="3" strokeLinecap="round" />
                {/* Swoosh arc */}
                <path d="M20 25 Q46 5 75 45" stroke="#00A3FF" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M72 60 Q50 95 18 68" stroke="#00A3FF" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
        </div>
    ),
    Globe: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-white transition"><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
    ),
    Mail: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-white transition"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
    ),
    Monitor: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:text-white transition"><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></svg>
    ),
};

export const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#0B0F19] text-slate-300 font-sans selection:bg-[#00A3FF] selection:text-white overflow-x-hidden">

            <ScrollToTop />
            <FloatingNav />

            {/* 1. NAVBAR */}
            <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto border-b border-transparent">
                <div className="flex items-center gap-4">
                    <img src="/logo.png" alt="Servitec Logo" className="w-14 h-14 rounded-full object-cover bg-white p-0.5 shadow-[0_0_15px_rgba(0,163,255,0.3)]" />
                    <div className="flex flex-col justify-center mt-1">
                        <div className="text-white font-bold tracking-widest text-2xl leading-none mb-1.5" style={{ fontFamily: "'Michroma', sans-serif" }}>SERVITEC</div>
                        <div className="text-[13px] text-slate-300 tracking-[0.15em] leading-none" style={{ fontFamily: "'PT Serif', serif" }}>Soluciones Informáticas</div>
                    </div>
                </div>
                <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="hidden md:inline-block bg-[#00A3FF] hover:bg-blue-500 text-white px-5 py-2.5 rounded-md text-sm font-semibold transition shadow-lg shadow-blue-500/20">
                    Agendar Consultoría
                </button>
            </nav>

            {/* 2. HERO SECTION */}
            <section className="relative pt-20 pb-20 px-6 text-center max-w-5xl mx-auto">
                {/* Glow de fondo (opcional para dar más realce al texto central) */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00A3FF] blur-[150px] opacity-10 pointer-events-none rounded-full"></div>

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/40 text-xs font-semibold text-slate-300 mb-8 backdrop-blur-sm">
                        <Icons.Rocket />
                        <span className="tracking-wide">Escala tu negocio</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]">
                        Transformamos tu Visión <br className="hidden md:block" />
                        en <span className="text-[#00A3FF]">Software que Escala</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Maximizamos el ROI y aceleramos el crecimiento de tu negocio con soluciones tecnológicas a medida, robustas y de alto rendimiento.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#00A3FF] hover:bg-blue-500 text-white px-8 py-4 rounded-md font-bold text-base transition shadow-[0_0_20px_rgba(0,163,255,0.25)]">
                            Agendar Consultoría
                        </button>
                        <button className="px-8 py-4 rounded-md font-bold text-base text-white border border-slate-700 bg-slate-800/30 hover:bg-slate-800 transition backdrop-blur-sm">
                            Ver Casos de Éxito
                        </button>
                    </div>
                </div>
            </section>

            {/* 3. TECNOLOGÍAS */}
            <section className="py-10 border-b border-t border-slate-800/50 bg-[#0A0F1C]/40 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h3 className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-8">Tecnologías que dominamos</h3>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-slate-400 font-semibold text-lg md:text-xl grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-500">
                        <span className="cursor-default hover:text-white transition">React</span>
                        <span className="cursor-default hover:text-white transition">Node.js</span>
                        <span className="cursor-default hover:text-white transition">AWS</span>
                        <span className="cursor-default hover:text-white transition">Python</span>
                        <span className="cursor-default hover:text-white transition">Docker</span>
                        <span className="cursor-default hover:text-white transition">PostgreSQL</span>
                    </div>
                </div>
            </section>

            {/* 4. POR QUÉ ELEGIRNOS */}
            <section id="servicios" className="py-24 px-6 bg-[#0B0F19]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="text-[#00A3FF] text-[10px] font-bold tracking-widest uppercase mb-4">Nuestra Promesa</div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Por Qué Elegirnos</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                            Desarrollamos software robusto diseñado para impulsar tu negocio al siguiente nivel, combinando excelencia técnica con visión estratégica.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-[#111727] border border-slate-800/60 p-8 rounded-2xl hover:border-slate-700/80 transition duration-300">
                            <div className="w-12 h-12 bg-slate-800/50 rounded-lg flex items-center justify-center mb-6">
                                <Icons.Rocket />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Eficiencia Operativa</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                Optimizamos tus procesos internos mediante automatización inteligente para reducir costos y aumentar significativamente la productividad de tu equipo.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-[#111727] border border-slate-800/60 p-8 rounded-2xl hover:border-slate-700/80 transition duration-300">
                            <div className="w-12 h-12 bg-slate-800/50 rounded-lg flex items-center justify-center mb-6">
                                <Icons.Layers />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Escalabilidad Garantizada</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                Arquitectura cloud-native sólida que crece al mismo ritmo que tu empresa sin perder rendimiento, preparada para manejar picos de demanda imprevistos.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-[#111727] border border-slate-800/60 p-8 rounded-2xl hover:border-slate-700/80 transition duration-300">
                            <div className="w-12 h-12 bg-slate-800/50 rounded-lg flex items-center justify-center mb-6">
                                <Icons.Settings />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Diseño Centrado en el Usuario</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                Interfaces intuitivas y atractivas que reducen la fricción, mejoran la adopción de la plataforma y elevan la satisfacción general de tus clientes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. PORTAFOLIO */}
            <section id="portafolio" className="py-24 px-6 bg-[#0D121F]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <div className="text-[#00A3FF] text-[10px] font-bold tracking-widest uppercase mb-4">Casos de Éxito</div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Nuestra Huella Digital</h2>
                        </div>
                        <a href="#" className="inline-flex text-[#00A3FF] hover:text-blue-400 font-semibold items-center gap-2 text-sm transition">
                            Ver todos los proyectos <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Portfolio Project 1 */}
                        <div className="group cursor-pointer">
                            <div className="bg-slate-800 border border-slate-800 rounded-2xl aspect-[4/3] overflow-hidden mb-6 relative hover:border-slate-700 transition duration-300 shadow-xl">
                                {/* Mockup visual placeholder */}
                                <div className="absolute inset-x-8 bottom-0 top-12 bg-[#1A233A] rounded-t-xl border border-b-0 border-slate-700 shadow-2xl p-4 flex flex-col group-hover:-translate-y-2 transition duration-500">
                                    <div className="flex gap-2 mb-4 border-b border-slate-700 pb-4">
                                        <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                        <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                        <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                    </div>
                                    <div className="flex-1 w-full flex flex-col gap-4">
                                        {/* Line Chart Mock */}
                                        <div className="w-full h-1/2 rounded bg-slate-800/50 p-4">
                                            <svg viewBox="0 0 100 30" className="w-full h-full text-[#00A3FF] opacity-50 drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="none">
                                                <polyline points="0,25 20,15 40,20 60,5 80,10 100,2" />
                                            </svg>
                                        </div>
                                        {/* Stats info mock */}
                                        <div className="flex gap-4 h-1/4">
                                            <div className="flex-1 rounded bg-slate-800/50"></div>
                                            <div className="flex-1 rounded bg-slate-800/50"></div>
                                            <div className="flex-1 rounded bg-[#00A3FF]/20"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-6 left-6 flex gap-3 z-10">
                                    <span className="px-3 py-1 bg-[#1A233A]/80 backdrop-blur-md border border-slate-700/50 text-white text-xs font-semibold rounded-full">Fintech</span>
                                    <span className="px-3 py-1 bg-[#00A3FF] text-white text-xs font-bold rounded-full shadow-lg shadow-blue-500/20">+40% Conversiones</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00A3FF] transition">Plataforma SaaS Financiera</h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-lg">Rediseño completo de arquitectura y UI/UX para procesar transacciones en tiempo real con alta disponibilidad y dashboards analíticos avanzados.</p>
                        </div>

                        {/* Portfolio Project 2 */}
                        <div className="group cursor-pointer">
                            <div className="bg-[#A4B5AC]/10 border border-slate-800 rounded-2xl aspect-[4/3] overflow-hidden mb-6 relative hover:border-slate-700 transition duration-300 shadow-xl flex items-center justify-center">
                                {/* Mobile Mockup visual placeholder */}
                                <div className="w-48 h-96 bg-[#FAF9F6] rounded-[2rem] border-8 border-slate-900 shadow-2xl relative p-4 group-hover:-translate-y-2 transition duration-500 overflow-hidden">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-900 rounded-b-xl z-20"></div>{/* notch */}

                                    <div className="w-full h-full mt-4 flex flex-col gap-6">
                                        <div className="w-full h-32 bg-[#E1D1B7] rounded-xl flex items-center justify-center shadow-inner">
                                            <div className="w-16 h-16 bg-[#C9B9A0] rounded-full"></div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="w-2/3 h-4 bg-slate-200 rounded"></div>
                                            <div className="w-1/2 h-3 bg-slate-100 rounded"></div>
                                        </div>
                                        <div className="mt-auto w-full h-10 bg-slate-800 rounded-lg"></div>
                                    </div>
                                </div>

                                <div className="absolute bottom-6 left-6 flex gap-3 z-10">
                                    <span className="px-3 py-1 bg-[#1A233A]/80 backdrop-blur-md border border-slate-700/50 text-white text-xs font-semibold rounded-full">E-commerce</span>
                                    <span className="px-3 py-1 bg-[#00A3FF] text-white text-xs font-bold rounded-full shadow-lg shadow-blue-500/20">2x Retención</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00A3FF] transition">App Móvil Retail</h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-lg">Aplicación nativa iOS/Android con motor de recomendación impulsado por IA y checkout de un solo clic para potenciar las ventas B2C.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. CONTACTO */}
            <section id="contacto" className="py-24 px-6 bg-[#0B0F19] relative overflow-hidden">
                {/* Glow de fondo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00A3FF] blur-[100px] opacity-[0.05] pointer-events-none rounded-full"></div>

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Título */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00A3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Contacto</h2>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-5 gap-12 md:gap-16">
                        {/* Columna izquierda — Info de contacto */}
                        <div className="md:col-span-2 flex flex-col gap-10">
                            {/* Ubicación */}
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00A3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-lg leading-snug">Villa Mercedes</p>
                                    <p className="text-slate-400 text-sm">San Luis - Argentina</p>
                                </div>
                            </div>

                            {/* Horario */}
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00A3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-lg">Servicio Técnico 24/7</p>
                                </div>
                            </div>

                            {/* WhatsApp */}
                            <div className="flex items-start gap-4">
                                <div className="mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#00A3FF"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-lg"><span className="text-slate-400 font-normal">Mensajes:</span> +54 9 2657 669-444</p>
                                </div>
                            </div>
                        </div>

                        {/* Columna derecha — Formulario */}
                        <ContactForm />
                    </div>
                </div>
            </section>

            {/* 7. FOOTER */}
            <footer className="border-t border-slate-800/80 pt-16 pb-8 px-6 bg-[#090D15]">
                <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 mb-16">
                    <div className="md:col-span-5 pr-8">
                        <div className="flex items-center gap-4 mb-6">
                            <img src="/logo.png" alt="Servitec Logo" className="w-14 h-14 rounded-full object-cover bg-white p-0.5 shadow-[0_0_15px_rgba(0,163,255,0.3)]" />
                            <div className="flex flex-col justify-center mt-1">
                                <div className="text-white font-bold tracking-widest text-2xl leading-none mb-1.5" style={{ fontFamily: "'Michroma', sans-serif" }}>SERVITEC</div>
                                <div className="text-[13px] text-slate-300 tracking-[0.15em] leading-none" style={{ fontFamily: "'PT Serif', serif" }}>Soluciones Informáticas</div>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-sm">
                            Construyendo el futuro digital de empresas ambiciosas mediante ingeniería de software de clase mundial.
                        </p>
                        <div className="flex gap-4 text-slate-400">
                            <a href="#" aria-label="Website" className="p-2 border border-slate-800 rounded-md hover:border-slate-600 hover:text-white transition bg-slate-900/50"><Icons.Globe /></a>
                            <a href="#" aria-label="Email" className="p-2 border border-slate-800 rounded-md hover:border-slate-600 hover:text-white transition bg-slate-900/50"><Icons.Mail /></a>
                            <a href="#" aria-label="Portfolio" className="p-2 border border-slate-800 rounded-md hover:border-slate-600 hover:text-white transition bg-slate-900/50"><Icons.Monitor /></a>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-white font-bold mb-6 text-sm tracking-wide">Servicios</h4>
                        <ul className="space-y-4 text-sm text-slate-500 font-medium">
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Desarrollo Web</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Apps Móviles</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Consultoría Cloud</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Auditoría de Código</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-white font-bold mb-6 text-sm tracking-wide">Compañía</h4>
                        <ul className="space-y-4 text-sm text-slate-500 font-medium">
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Sobre Nosotros</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Carreras</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Blog</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Contacto</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="text-white font-bold mb-6 text-sm tracking-wide">Legal</h4>
                        <ul className="space-y-4 text-sm text-slate-500 font-medium">
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Términos de Servicio</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Política de Privacidad</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Cookies</a></li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto border-t border-slate-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600 font-medium tracking-wide">
                    <p>© 2024 Servitec, Soluciones Informáticas. Todos los derechos reservados.</p>
                    <p>Diseñado para la excelencia.</p>
                </div>
            </footer>
        </div>
    );
};

/* ──────────────────────────────────────────────
   Componente: Menú Flotante de Navegación
   ────────────────────────────────────────────── */
const FloatingNav = () => {
    const navItems = [
        { label: 'Servicios', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8', href: '#servicios', id: 'servicios' },
        { label: 'Portafolio', icon: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z', href: '#portafolio', id: 'portafolio' },
        { label: 'Contacto', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z', href: '#contacto', id: 'contacto' },
    ];

    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        const ids = ['servicios', 'portafolio', 'contacto'];
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                }
            },
            { threshold: 0.4 }
        );

        for (const id of ids) {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        }

        return () => observer.disconnect();
    }, []);

    const scrollTo = (href: string) => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    const visibleItems = navItems.filter((item) => item.id !== activeSection);

    return (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-1 px-3 py-4 rounded-2xl border border-white/10 bg-[#00A3FF]/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,163,255,0.15)] transition-all duration-300">
            {visibleItems.map((item) => (
                <button
                    key={item.label}
                    onClick={() => scrollTo(item.href)}
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00A3FF] group-hover:text-white transition shrink-0">
                        <path d={item.icon} />
                    </svg>
                    <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                </button>
            ))}
        </div>
    );
};

/* ──────────────────────────────────────────────
   Componente: Scroll to Top
   ────────────────────────────────────────────── */
const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Volver arriba"
            className={`fixed bottom-6 right-[4.25rem] z-50 w-12 h-12 rounded-full border border-white/10 bg-[#00A3FF]/10 backdrop-blur-xl text-[#00A3FF] hover:text-white hover:bg-[#00A3FF]/30 flex items-center justify-center shadow-[0_8px_32px_rgba(0,163,255,0.15)] transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
            </svg>
        </button>
    );
};

/* ──────────────────────────────────────────────
   Componente: Formulario de Contacto
   ────────────────────────────────────────────── */
const ContactForm = () => {
    const [form, setForm] = useState({ nombre: '', whatsapp: '', email: '', mensaje: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const { error } = await supabase
                .from('contact_submissions')
                .insert([{
                    nombre: form.nombre,
                    whatsapp: form.whatsapp,
                    email: form.email,
                    mensaje: form.mensaje,
                }]);

            if (!error) {
                setStatus('sent');
                setForm({ nombre: '', whatsapp: '', email: '', mensaje: '' });
            } else {
                console.error('Supabase error:', error.message);
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    const inputClasses =
        'w-full bg-[#111727] border border-slate-700/60 rounded-md px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF]/30 transition text-sm';

    return (
        <form onSubmit={handleSubmit} className="md:col-span-3 flex flex-col gap-5">
            {/* Nombre */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Nombre y Apellido</label>
                <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="Tu nombre completo"
                />
            </div>

            {/* WhatsApp */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">WhatsApp</label>
                <input
                    type="tel"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="+54 9 1234567890"
                />
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Correo electrónico</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="tu@email.com"
                />
            </div>

            {/* Mensaje */}
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Mensaje</label>
                <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={inputClasses + ' resize-none'}
                    placeholder="Contanos sobre tu proyecto..."
                />
            </div>

            {/* Botón Enviar */}
            <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full mt-2 bg-transparent border-2 border-[#00A3FF] text-[#00A3FF] hover:bg-[#00A3FF] hover:text-white px-8 py-3.5 rounded-md font-bold text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === 'sending' ? 'Enviando...' : status === 'sent' ? '✓ Enviado' : 'Enviar'}
            </button>

            {status === 'error' && (
                <p className="text-red-400 text-sm text-center">Hubo un error al enviar. Intentá de nuevo.</p>
            )}
        </form>
    );
};
