import { useState, useEffect, useRef, type FormEvent } from 'react';

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
    TrendingUp: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00A3FF]"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
    ),
};

const allProjectsData = [
    { img: 'ejemplo_saasfinanciero.png', title: 'Plataforma SaaS Financiera', desc: 'Rediseño completo de arquitectura y UI/UX para procesar transacciones en tiempo real con alta disponibilidad y dashboards analíticos avanzados.' },
    { img: 'ejemplo_app.png', title: 'App Móvil Retail', desc: 'Aplicación nativa iOS/Android con motor de recomendación impulsado por IA y checkout de un solo clic para potenciar las ventas B2C.' },
    { img: 'ejemplo_saas.png', title: 'SaaS Empresarial', desc: 'Dashboard analítico avanzado con métricas en tiempo real y reportes interactivos.' },
    { img: 'ejemplo_ecommerce.png', title: 'Plataforma E-commerce', desc: 'Tienda online de alto rendimiento optimizada para máxima conversión.' },
    { img: 'ejemplo_pos.png', title: 'Punto de Venta Automático', desc: 'Sistema ágil de facturación e inventario con control multi-sucursal.' },
    { img: 'ejemplo_landing.png', title: 'Landing Page Corporativa', desc: 'Experiencia inmersiva diseñada estratégicamente para captación de leads.' },
];

// Hook personalizado para revelar elementos al hacer scroll
const useIntersectionObserver = (options = {}) => {
    const [elements, setElements] = useState<Element[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    entry.target.classList.remove('reveal-hidden');
                    observer.unobserve(entry.target); // Solo anima la primera vez
                }
            });
        }, { threshold: 0.15, ...options });

        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [elements, options]);

    return [setElements] as const;
};

export const LandingPage = () => {
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [selectedImage, setSelectedImage] = useState<{ img: string, title: string, desc: string } | null>(null);

    const [setElements] = useIntersectionObserver({ threshold: 0.1 });

    const registerRef = (el: HTMLElement | null) => {
        if (el) {
            setElements(prev => {
                if (!prev.includes(el)) {
                    return [...prev, el]
                }
                return prev;
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] text-slate-300 font-inter font-sans selection:bg-[#00A3FF] selection:text-white overflow-x-hidden">

            {/* Controles Flotantes */}
            <div className="fixed z-50 bottom-4 md:bottom-6 left-1/2 md:left-auto md:right-10 -translate-x-1/2 md:translate-x-0 w-[90%] md:w-auto flex flex-col items-center gap-4 md:gap-5 pointer-events-none">
                <FloatingNav />
                <ScrollToTop />
            </div>

            {/* 1. NAVBAR */}
            <nav className="flex items-center justify-center px-4 md:px-6 py-4 md:py-6 max-w-7xl mx-auto border-b border-transparent">
                <div className="flex items-center gap-3 md:gap-4">
                    <img src="/logo.png" alt="Servitec Logo" className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover bg-white p-0.5 shadow-[0_0_15px_rgba(0,163,255,0.3)]" />
                    <div className="flex flex-col justify-center mt-1">
                        <div className="text-white font-bold tracking-widest text-xl md:text-2xl leading-none mb-1 md:mb-1.5" style={{ fontFamily: "'Michroma', sans-serif" }}>SERVITEC</div>
                        <div className="text-[9px] md:text-[13px] text-slate-300 tracking-[0.15em] leading-none" style={{ fontFamily: "'PT Serif', serif" }}>Soluciones Informáticas</div>
                    </div>
                </div>
            </nav>

            {/* 2. HERO SECTION */}
            <section className="relative pt-10 md:pt-20 pb-16 md:pb-20 px-4 md:px-6 text-center max-w-5xl mx-auto">
                {/* Glow de fondo (opcional para dar más realce al texto central) */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[500px] bg-[#00A3FF] blur-[100px] md:blur-[150px] opacity-20 md:opacity-10 pointer-events-none rounded-full animate-breathe"></div>

                <div className="relative z-10" ref={registerRef}>
                    <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full border border-slate-700/60 bg-slate-800/40 text-[10px] md:text-xs font-semibold text-slate-300 mb-6 md:mb-8 backdrop-blur-sm reveal-hidden" ref={registerRef}>
                        <span className="scale-75 md:scale-100"><Icons.TrendingUp /></span>
                        <span className="tracking-wide">Escala tu negocio</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 md:mb-8 leading-[1.15] md:leading-[1.1] reveal-hidden" ref={registerRef}>
                        Transformamos tu Visión <br className="hidden sm:block" />
                        en <span className="text-[#00A3FF]">Software que Escala</span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-2 reveal-hidden" ref={registerRef}>
                        Maximizamos el ROI y aceleramos el crecimiento de tu negocio con soluciones tecnológicas a medida, robustas y de alto rendimiento.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4 sm:px-0 reveal-hidden" ref={registerRef}>
                        <button onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#00A3FF] hover:bg-blue-500 text-white px-8 py-3.5 md:py-4 rounded-md font-bold text-sm md:text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,163,255,0.4)] shadow-[0_0_20px_rgba(0,163,255,0.25)] w-full sm:w-auto">
                            Agendar Consultoría
                        </button>
                        <button
                            onClick={() => {
                                setShowAllProjects(true);
                                document.getElementById('portafolio')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-8 py-3.5 md:py-4 rounded-md font-bold text-sm md:text-base text-white border border-slate-700 bg-slate-800/30 hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm w-full sm:w-auto"
                        >
                            Ver Casos de Éxito
                        </button>
                    </div>
                </div>
            </section>

            {/* 3. TECNOLOGÍAS */}
            <section className="py-10 border-b border-t border-slate-800/50 bg-[#0A0F1C]/40 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 text-center reveal-hidden" ref={registerRef}>
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
            <section id="servicios" className="py-16 md:py-24 px-4 md:px-6 bg-[#0B0F19]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-16 reveal-hidden" ref={registerRef}>
                        <div className="text-[#00A3FF] text-[10px] font-bold tracking-widest uppercase mb-3 md:mb-4">Nuestra Promesa</div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight">Por Qué Elegirnos</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-2">
                            Desarrollamos software robusto diseñado para impulsar tu negocio al siguiente nivel, combinando excelencia técnica con visión estratégica.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-[#111727] border border-slate-800/60 p-6 md:p-8 rounded-2xl transition-all duration-300 hover:border-slate-700/80 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,163,255,0.06)] group reveal-hidden" ref={registerRef}>
                            <div className="w-12 h-12 bg-slate-800/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#00A3FF]/10 transition-colors duration-300">
                                <Icons.TrendingUp />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 md:mb-4">Eficiencia Operativa</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                Optimizamos tus procesos internos mediante automatización inteligente para reducir costos y aumentar significativamente la productividad de tu equipo.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-[#111727] border border-slate-800/60 p-6 md:p-8 rounded-2xl transition-all duration-300 hover:border-slate-700/80 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,163,255,0.06)] group reveal-hidden" style={{ transitionDelay: '100ms' }} ref={registerRef}>
                            <div className="w-12 h-12 bg-slate-800/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#00A3FF]/10 transition-colors duration-300">
                                <Icons.Layers />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 md:mb-4">Escalabilidad Garantizada</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                Arquitectura cloud-native sólida que crece al mismo ritmo que tu empresa sin perder rendimiento, preparada para manejar picos de demanda imprevistos.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-[#111727] border border-slate-800/60 p-6 md:p-8 rounded-2xl transition-all duration-300 hover:border-slate-700/80 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,163,255,0.06)] group sm:col-span-2 lg:col-span-1 reveal-hidden" style={{ transitionDelay: '200ms' }} ref={registerRef}>
                            <div className="w-12 h-12 bg-slate-800/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#00A3FF]/10 transition-colors duration-300">
                                <Icons.Settings />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 md:mb-4">Diseño Centrado en el Usuario</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                Interfaces intuitivas y atractivas que reducen la fricción, mejoran la adopción de la plataforma y elevan la satisfacción general de tus clientes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. PORTAFOLIO */}
            <section id="portafolio" className="py-16 md:py-24 px-4 md:px-6 bg-[#0D121F]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4 md:gap-6 reveal-hidden" ref={registerRef}>
                        <div>
                            <div className="text-[#00A3FF] text-[10px] font-bold tracking-widest uppercase mb-3 md:mb-4">Casos de Éxito</div>
                            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                                {showAllProjects ? 'Todos los Proyectos' : 'Nuestra Huella Digital'}
                            </h2>
                        </div>
                        <button
                            onClick={(e) => { e.preventDefault(); setShowAllProjects(!showAllProjects); }}
                            className="inline-flex text-[#00A3FF] hover:text-blue-400 font-semibold items-center gap-2 text-sm transition"
                        >
                            {showAllProjects ? (
                                <><span aria-hidden="true">&larr;</span> Volver a destacados</>
                            ) : (
                                <>Ver todos los proyectos <span aria-hidden="true">&rarr;</span></>
                            )}
                        </button>
                    </div>

                    {showAllProjects ? (
                        <div key="all-projects" className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 animate-fade-in">
                            {allProjectsData.map((project, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedImage(project)}
                                    className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-[#111727] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-slate-600 hover:shadow-[0_8px_30px_rgba(0,163,255,0.15)] transition-all duration-300 relative"
                                >
                                    {/* Glassmorphism gradient background behind text */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0F1C]/95 via-[#0A0F1C]/60 to-transparent z-10 pointer-events-none opacity-90 transition-opacity duration-300"></div>

                                    <img src={`/${project.img}`} alt={project.title} className="w-full h-auto aspect-video object-cover object-top rounded-xl transition-transform duration-500 group-hover:scale-105" />

                                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-20 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{project.title}</h3>
                                        <p className="text-sm text-[#00A3FF] drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">{project.desc}</p>
                                    </div>

                                    {/* Expand indicator top right */}
                                    <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 border border-white/10 shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" /></svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div key="featured-projects" className="grid lg:grid-cols-2 gap-8 lg:gap-12 animate-fade-in">
                            {/* Portfolio Project 1 */}
                            <div className="group cursor-pointer">
                                <div
                                    className="bg-slate-800 border border-slate-800 rounded-2xl aspect-[4/3] overflow-hidden mb-6 relative transition-all duration-300 hover:border-slate-700/80 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,163,255,0.15)] shadow-xl"
                                    onClick={() => setSelectedImage({ img: 'ejemplo_saasfinanciero.png', title: 'Plataforma SaaS Financiera', desc: 'Rediseño completo de arquitectura y UI/UX para procesar transacciones en tiempo real con alta disponibilidad y dashboards analíticos avanzados.' })}
                                >
                                    <img src="/ejemplo_saasfinanciero.png" alt="SaaS Financiero" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />

                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/90 via-transparent to-transparent opacity-60"></div>

                                    <div className="absolute bottom-6 left-6 flex gap-3 z-10">
                                        <span className="px-3 py-1 bg-[#1A233A]/80 backdrop-blur-md border border-slate-700/50 text-white text-xs font-semibold rounded-full">Fintech</span>
                                        <span className="px-3 py-1 bg-[#00A3FF] text-white text-xs font-bold rounded-full shadow-lg shadow-blue-500/20">+40% Conversiones</span>
                                    </div>

                                    {/* Expand indicator top right */}
                                    <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 border border-white/10 shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" /></svg>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00A3FF] transition">Plataforma SaaS Financiera</h3>
                                <p className="text-slate-400 text-sm leading-relaxed max-w-lg">Rediseño completo de arquitectura y UI/UX para procesar transacciones en tiempo real con alta disponibilidad y dashboards analíticos avanzados.</p>
                            </div>

                            {/* Portfolio Project 2 */}
                            <div className="group cursor-pointer">
                                <div
                                    className="bg-slate-800 border border-slate-800 rounded-2xl aspect-[4/3] overflow-hidden mb-6 relative transition-all duration-300 hover:border-slate-700/80 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,163,255,0.15)] shadow-xl"
                                    onClick={() => setSelectedImage({ img: 'ejemplo_pos.png', title: 'Punto de Venta Automático', desc: 'Sistema ágil de facturación e inventario con control multi-sucursal.' })}
                                >
                                    <img src="/ejemplo_pos.png" alt="Punto de Venta Automático" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />

                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/90 via-transparent to-transparent opacity-60"></div>

                                    <div className="absolute bottom-6 left-6 flex gap-3 z-10">
                                        <span className="px-3 py-1 bg-[#1A233A]/80 backdrop-blur-md border border-slate-700/50 text-white text-xs font-semibold rounded-full">Sistemas POS</span>
                                        <span className="px-3 py-1 bg-[#00A3FF] text-white text-xs font-bold rounded-full shadow-lg shadow-blue-500/20">Control Total</span>
                                    </div>

                                    {/* Expand indicator top right */}
                                    <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 border border-white/10 shadow-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="M21 3l-7 7" /><path d="M3 21l7-7" /></svg>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00A3FF] transition">Punto de Venta Automático</h3>
                                <p className="text-slate-400 text-sm leading-relaxed max-w-lg">Sistema ágil de facturación e inventario con control multi-sucursal.</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* 6. CONTACTO */}
            <section id="contacto" className="py-16 md:py-24 px-4 md:px-6 bg-[#0B0F19] relative overflow-hidden">
                {/* Glow de fondo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] bg-[#00A3FF] blur-[100px] opacity-[0.05] pointer-events-none rounded-full animate-breathe"></div>

                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Título */}
                    <div className="text-center mb-10 md:mb-16 reveal-hidden" ref={registerRef}>
                        <div className="inline-flex items-center gap-2 md:gap-3 mb-4">
                            <span className="scale-75 md:scale-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00A3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Contacto</h2>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
                        {/* Columna izquierda — Info de contacto */}
                        <div className="lg:col-span-2 flex flex-col gap-8 md:gap-10 reveal-hidden" style={{ transitionDelay: '100ms' }} ref={registerRef}>
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
                        <div className="lg:col-span-3 reveal-hidden" style={{ transitionDelay: '200ms' }} ref={registerRef}>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FOOTER */}
            <footer className="border-t border-slate-800/80 pt-16 pb-28 md:pb-8 px-4 md:px-6 bg-[#090D15]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 mb-12 md:mb-16">
                    <div className="sm:col-span-2 lg:col-span-5 pr-0 md:pr-8">
                        <div className="flex items-center gap-3 md:gap-4 mb-6">
                            <img src="/logo.png" alt="Servitec Logo" className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover bg-white p-0.5 shadow-[0_0_15px_rgba(0,163,255,0.3)]" />
                            <div className="flex flex-col justify-center mt-1">
                                <div className="text-white font-bold tracking-widest text-xl md:text-2xl leading-none mb-1 md:mb-1.5" style={{ fontFamily: "'Michroma', sans-serif" }}>SERVITEC</div>
                                <div className="text-[9px] md:text-[13px] text-slate-300 tracking-[0.15em] leading-none" style={{ fontFamily: "'PT Serif', serif" }}>Soluciones Informáticas</div>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm mb-6 md:mb-8 leading-relaxed max-w-sm">
                            Construyendo el futuro digital de empresas ambiciosas mediante ingeniería de software de clase mundial.
                        </p>
                        <div className="flex gap-4 text-slate-400">
                            <a href="#" aria-label="Website" className="p-2 border border-slate-800 rounded-md hover:border-slate-600 hover:text-white transition bg-slate-900/50"><Icons.Globe /></a>
                            <a href="#" aria-label="Email" className="p-2 border border-slate-800 rounded-md hover:border-slate-600 hover:text-white transition bg-slate-900/50"><Icons.Mail /></a>
                            <a href="#" aria-label="Portfolio" className="p-2 border border-slate-800 rounded-md hover:border-slate-600 hover:text-white transition bg-slate-900/50"><Icons.Monitor /></a>
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-2">
                        <h4 className="text-white font-bold mb-4 md:mb-6 text-sm tracking-wide">Servicios</h4>
                        <ul className="space-y-3 md:space-y-4 text-sm text-slate-500 font-medium">
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Desarrollo Web</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Apps Móviles</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Consultoría Cloud</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Auditoría de Código</a></li>
                        </ul>
                    </div>

                    <div className="col-span-1 lg:col-span-2">
                        <h4 className="text-white font-bold mb-4 md:mb-6 text-sm tracking-wide">Compañía</h4>
                        <ul className="space-y-3 md:space-y-4 text-sm text-slate-500 font-medium">
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Sobre Nosotros</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Carreras</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Blog</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Contacto</a></li>
                        </ul>
                    </div>

                    <div className="sm:col-span-2 lg:col-span-3">
                        <h4 className="text-white font-bold mb-4 md:mb-6 text-sm tracking-wide">Legal</h4>
                        <ul className="space-y-3 md:space-y-4 text-sm text-slate-500 font-medium">
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Términos de Servicio</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Política de Privacidad</a></li>
                            <li><a href="#" className="hover:text-[#00A3FF] transition">Cookies</a></li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto border-t border-slate-800/80 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-xs text-slate-600 font-medium tracking-wide">
                    <p>© 2024 Servitec, Soluciones Informáticas. Todos los derechos reservados.</p>
                    <p>Diseñado para la excelencia.</p>
                </div>
            </footer>

            {/* Modal ImageViewer Fullscreen */}
            {selectedImage && <ImageViewer project={selectedImage} onClose={() => setSelectedImage(null)} />}
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
    const [scrolled, setScrolled] = useState(false);

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

        const handleScroll = () => {
            setScrolled(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollTo = (href: string) => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    const visibleItems = scrolled
        ? navItems.filter((item) => item.id !== activeSection)
        : navItems;

    return (
        <div className="pointer-events-auto flex flex-row justify-evenly md:flex-col gap-1 md:gap-2 px-3 py-3 md:py-4 w-full md:w-[160px] rounded-full md:rounded-2xl border border-white/10 bg-[#0A0F1C]/20 md:bg-[#001D3D]/10 backdrop-blur-xl shadow-none md:shadow-[0_8px_32px_rgba(0,163,255,0.08)] transition-all duration-300 hover:bg-[#0A0F1C]/40 md:hover:bg-[#001D3D]/30">
            {visibleItems.map((item) => (
                <button
                    key={item.label}
                    onClick={() => scrollTo(item.href)}
                    className="group flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-3 py-2 md:py-2.5 rounded-full md:rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00A3FF] md:w-[18px] md:h-[18px] group-hover:text-white transition shrink-0">
                        <path d={item.icon} />
                    </svg>
                    <span className="text-[10px] md:text-sm font-medium whitespace-nowrap">{item.label}</span>
                </button>
            ))}

            {/* Scroll to Top para móvil integrado en el menú, solo visible cuando se baja en la página */}
            {scrolled && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="md:hidden group flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#00A3FF] group-hover:text-white transition shrink-0">
                        <polyline points="18 15 12 9 6 15" />
                    </svg>
                    <span className="text-[10px] font-medium whitespace-nowrap">Arriba</span>
                </button>
            )}
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
            className={`pointer-events-auto hidden md:flex shrink-0 w-12 h-12 rounded-full border border-white/10 bg-[#001D3D]/10 backdrop-blur-xl text-[#00A3FF] hover:text-white hover:bg-[#001D3D]/50 items-center justify-center shadow-[0_8px_32px_rgba(0,163,255,0.08)] transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
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

        if (!form.whatsapp && !form.email) {
            alert('Por favor, ingresá tu número de WhatsApp o Correo electrónico para que podamos contactarte.');
            return;
        }

        setStatus('sending');

        try {
            // 1. Enviar datos por correo vía Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: "7387efc1-cfe7-4190-aa15-6c97c758e151",
                    subject: `Nueva Consulta de ${form.nombre} - Landing Page`,
                    from_name: form.nombre,
                    email: form.email || "no-provisto@servitec.com",
                    whatsapp: form.whatsapp || "No provisto",
                    message: form.mensaje
                })
            });

            const result = await response.json();

            if (response.status === 200 && result.success) {
                // 2. Armar mensaje y redirigir a WhatsApp (solo si ingresó número)
                if (form.whatsapp) {
                    const targetNumber = "5492657669444";
                    const wtext = `¡Hola Lucas! Mi nombre es ${form.nombre}.%0A%0A${form.email ? `Mi Email de contacto: ${form.email}%0A%0A` : ''}${form.mensaje}`;

                    // Abrir WhatsApp en una nueva pestaña (o app si está en móvil)
                    window.open(`https://wa.me/${targetNumber}?text=${wtext}`, '_blank');
                }

                setStatus('sent');
                setForm({ nombre: '', whatsapp: '', email: '', mensaje: '' });

                // Ocultar mensaje de éxito después de 5 segundos
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                console.error('Web3Forms error:', result);
                setStatus('error');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setStatus('error');
        }
    };

    const inputClasses =
        'w-full bg-[#111727] border border-slate-700/60 rounded-md px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF]/30 transition text-sm';

    return (
        <form onSubmit={handleSubmit} className="lg:col-span-3 flex flex-col gap-5">
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

/* ──────────────────────────────────────────────
   Componente: Fullscreen Image Viewer Modal
   ────────────────────────────────────────────── */
const ImageViewer = ({ project, onClose }: { project: { img: string, title: string, desc: string }, onClose: () => void }) => {
    const [scale, setScale] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Pan state
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // Disable body scroll when open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    const handleClose = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen?.().catch(console.error);
        }
        onClose();
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.().catch(console.error);
        } else {
            document.exitFullscreen?.().catch(console.error);
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const handleZoomIn = (e: React.MouseEvent) => {
        e.stopPropagation();
        setScale(prev => Math.min(prev + 0.25, 3));
    };
    const handleZoomOut = (e: React.MouseEvent) => {
        e.stopPropagation();
        setScale(prev => {
            const newScale = Math.max(prev - 0.25, 1);
            if (newScale === 1) setPosition({ x: 0, y: 0 });
            return newScale;
        });
    };
    const handleReset = (e: React.MouseEvent) => {
        e.stopPropagation();
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        if (scale > 1) {
            setIsDragging(true);
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
            setDragStart({ x: clientX - position.x, y: clientY - position.y });

            if (!('touches' in e)) {
                e.preventDefault();
            }
        }
    };

    const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (isDragging && scale > 1) {
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
            setPosition({
                x: clientX - dragStart.x,
                y: clientY - dragStart.y
            });
        }
    };

    const onMouseUpOrLeave = () => {
        setIsDragging(false);
    };

    return (
        <div
            onClick={handleClose}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050810]/95 backdrop-blur-2xl transition-all duration-500 ease-in-out animate-fade-in cursor-pointer"
        >
            {/* Top Navigation / Info Bar */}
            <div className="absolute top-0 inset-x-0 p-5 md:p-8 flex items-start justify-between z-50 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="pointer-events-auto max-w-2xl px-2" onClick={e => e.stopPropagation()}>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 drop-shadow-xl">{project.title}</h3>
                    <p className="text-sm md:text-base text-slate-300 drop-shadow-lg font-medium">{project.desc}</p>
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); handleClose(); }}
                    className="pointer-events-auto p-3 rounded-full bg-white/10 hover:bg-white/20 hover:text-red-400 text-white backdrop-blur-md transition-all border border-white/10 shrink-0 shadow-lg mt-1"
                    aria-label="Cerrar ventana"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
            </div>

            {/* Control Tools Container */}
            <div
                className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 p-2 rounded-full bg-[#111727]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,163,255,0.15)] pointer-events-auto"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={handleZoomOut} className="p-3.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors" title="Alejar imagen">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                </button>
                <button onClick={handleReset} className="px-4 py-2 font-bold focus:outline-none text-sm hover:bg-white/10 text-[#00A3FF] hover:text-white transition-colors rounded-full" title="Reestablecer zoom original">
                    {Math.round(scale * 100)}%
                </button>
                <button onClick={handleZoomIn} className="p-3.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors" title="Acercar imagen">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
                </button>

                <div className="w-px h-6 bg-white/20 mx-2"></div>

                <button
                    onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                    className={`p-3.5 rounded-full hover:bg-white/10 transition-colors ${isFullscreen ? 'text-[#00A3FF]' : 'text-slate-300 hover:text-white'}`}
                    title={isFullscreen ? 'Salir de pantalla completa' : 'Ver en pantalla completa'}
                >
                    {isFullscreen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3" /><path d="M21 8h-3a2 2 0 0 1-2-2V3" /><path d="M3 16h3a2 2 0 0 1 2 2v3" /><path d="M16 21v-3a2 2 0 0 1 2-2h3" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" /><path d="M3 16v3a2 2 0 0 0 2 2h3" /><path d="M16 21h3a2 2 0 0 0 2-2v-3" /></svg>
                    )}
                </button>
            </div>

            {/* Central Main Image Content */}
            <div
                className={`w-full h-full overflow-hidden flex items-center justify-center pt-24 pb-32 px-4 shadow-inner ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUpOrLeave}
                onMouseLeave={onMouseUpOrLeave}
                onTouchStart={onMouseDown}
                onTouchMove={onMouseMove}
                onTouchEnd={onMouseUpOrLeave}
            >
                <img
                    src={`/${project.img}`}
                    alt={project.title}
                    className="max-w-[95%] max-h-full object-contain pointer-events-auto rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/5 origin-center select-none animate-fade-in"
                    style={{
                        transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
                        transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                    }}
                    onClick={e => e.stopPropagation()}
                    draggable="false"
                />
            </div>
        </div>
    );
};
