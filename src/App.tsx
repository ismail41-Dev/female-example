/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  Instagram, 
  Languages, 
  User, 
  Briefcase, 
  Layers, 
  ExternalLink,
  Menu,
  X,
  Sun,
  Moon,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { translations } from './translations';
import { useServerTime } from './hooks/useServerTime';
import SkeletonScreen from './components/Skeleton';

type Language = 'fr' | 'en';
type Theme = 'light' | 'dark';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const savedLang = localStorage.getItem('lang');
    return (savedLang === 'fr' || savedLang === 'en') ? savedLang : 'fr';
  });
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { year } = useServerTime();

  const t = translations[lang];
  const isRtl = false;

  const sectionVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.98,
      transition: { duration: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    }
  };

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.title = t.siteTitle;
  }, [t.siteTitle]);

  const toggleLang = () => {
    setLang(prev => prev === 'fr' ? 'en' : 'fr');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navItems = [
    { id: 'about', label: t.nav.about, icon: User },
    { id: 'experience', label: t.nav.experience, icon: Briefcase },
    { id: 'skills', label: t.nav.skills, icon: Layers },
  ];

  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      className="relative flex items-center bg-palette-pink/15 dark:bg-palette-mocha/40 p-1 rounded-full w-16 h-8 transition-all duration-300 cursor-pointer overflow-hidden border-2 border-palette-pink/50 hover:border-palette-pink shadow-xs active:scale-95"
      aria-label="Toggle Theme"
    >
      <div className={`absolute inset-0 flex items-center justify-between px-1.5 z-0`}>
        <Sun size={14} className="text-palette-terracotta dark:text-palette-rose" />
        <Moon size={14} className="text-palette-mocha dark:text-palette-pink" />
      </div>
      <motion.div
        animate={{ x: theme === 'light' ? 0 : 32 }}
        transition={{ type: "spring", stiffness: 700, damping: 35 }}
        className="w-6 h-6 bg-palette-pink dark:bg-palette-pink rounded-full shadow-md z-10 flex items-center justify-center border border-palette-pink/30 dark:border-transparent"
      >
        {theme === 'light' ? <Sun size={12} className="text-white" /> : <Moon size={12} className="text-white" />}
      </motion.div>
    </button>
  );

  return (
    <div className={`min-h-screen bg-brand-bg text-brand-text font-sans transition-colors duration-300 ${isRtl ? 'font-arabic' : ''}`}>
      {/* Initial Page Preloader */}
      <AnimatePresence>
        {isInitialLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            className="fixed inset-0 z-[200] overflow-hidden"
          >
            <SkeletonScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-brand-card border-b border-brand-border z-50 px-4 py-3 flex justify-between items-center shadow-xs">
        <h1 className="text-xl font-black text-[#218DAE] tracking-tight">{t.hero.name}</h1>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button 
            onClick={toggleLang}
            className="p-2 px-3 rounded-full border-2 border-palette-pink/50 hover:border-palette-pink bg-palette-pink/10 dark:bg-palette-mocha/30 hover:bg-palette-pink/20 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider active:scale-95 shadow-xs overflow-hidden text-palette-pink dark:text-palette-pink"
          >
            <motion.div
              key={lang}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Languages size={18} />
            </motion.div>
            <motion.span
              key={`mobile-lang-${lang}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </motion.span>
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-xl hover:bg-palette-pink/15 text-palette-pink transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed inset-0 top-[57px] bg-brand-card z-40 p-6 overflow-hidden border-b border-brand-border"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    activeSection === item.id 
                      ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25' 
                      : 'hover:bg-palette-blush/25 dark:hover:bg-palette-mocha/25 text-brand-text'
                  }`}
                >
                  <item.icon size={20} className={activeSection === item.id ? 'text-white' : 'text-brand-secondary dark:text-brand-primary'} />
                  <span className="font-bold">{item.label}</span>
                </button>
              ))}
              <div className="mt-8 pt-6 border-t border-brand-border px-2">
                <p className="text-[11px] text-brand-muted font-bold uppercase tracking-widest">
                  © {year} {t.hero.name}
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar (Desktop) */}
        <aside className={`hidden lg:flex flex-col w-80 bg-brand-card border-r border-brand-border fixed h-screen ${isRtl ? 'right-0 border-l border-r-0' : 'left-0'}`}>
          <div className="p-10 flex flex-col h-full">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-3xl font-black text-[#218DAE] leading-tight mb-2 tracking-tight">
                {t.hero.name}
              </h1>
              <p className="text-brand-secondary font-bold text-xs uppercase tracking-[0.2em]">{t.hero.title}</p>
            </motion.div>

            <nav className="flex flex-col gap-2 flex-grow">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all group relative overflow-hidden ${
                    activeSection === item.id 
                      ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20' 
                      : 'hover:bg-palette-pink/15 dark:hover:bg-palette-mocha/25 text-brand-text hover:text-brand-primary'
                  }`}
                >
                  <item.icon size={20} className={activeSection === item.id ? 'text-white' : 'text-brand-secondary dark:text-brand-primary group-hover:text-brand-primary transition-colors'} />
                  <span className="font-bold tracking-tight">{item.label}</span>
                  {activeSection === item.id && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute inset-0 bg-brand-primary -z-10"
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            <div className="mt-auto pt-10 border-t border-brand-border flex flex-col gap-8">
              <div className="flex items-center justify-between px-2">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-brand-muted uppercase tracking-widest">{lang === 'fr' ? 'Thème' : 'Theme'}</span>
                </div>
                <ThemeToggle />
              </div>
              <button 
                onClick={toggleLang}
                className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-palette-pink/50 hover:border-palette-pink text-brand-highlight dark:text-palette-pink hover:text-brand-primary transition-all font-black text-sm uppercase tracking-widest bg-palette-pink/10 dark:bg-palette-mocha/30 active:scale-[0.98] shadow-xs overflow-hidden group"
              >
                <motion.div
                  key={lang}
                  initial={{ rotate: 180, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <Languages size={18} className="group-hover:rotate-12 transition-transform text-brand-secondary group-hover:text-brand-primary" />
                </motion.div>
                <motion.span
                  key={`desktop-lang-${lang}`}
                  initial={{ x: isRtl ? -10 : 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {lang === 'fr' ? 'English' : 'Français'}
                </motion.span>
              </button>
              <div className="mt-6 px-2">
                <p className="text-[11px] text-brand-muted font-bold uppercase tracking-widest leading-relaxed">
                  © {year} {t.hero.name}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-grow px-6 lg:px-16 pt-28 lg:pt-16 pb-8 lg:pb-6 ${isRtl ? 'lg:mr-80' : 'lg:ml-80'}`}>
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {activeSection === 'about' && (
                <motion.section 
                  key={`about-${lang}`}
                  id="about" 
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-16"
                >
                  <div className="space-y-8">
                    <motion.div 
                      variants={itemVariants}
                      className="inline-flex items-center gap-2 px-4 py-1.5 bg-palette-pink/15 dark:bg-palette-mocha/40 border border-palette-pink/40 text-palette-pink dark:text-palette-pink rounded-full text-xs font-black tracking-[0.2em] uppercase shadow-xs"
                    >
                      <User size={14} className="text-palette-pink" />
                      {t.nav.about}
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-5xl lg:text-7xl font-black text-brand-highlight dark:text-palette-pink leading-[0.95] tracking-tight">
                      {t.hero.name}
                    </motion.h2>
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-6 text-sm font-bold text-brand-muted uppercase tracking-wider">
                      <span className="flex items-center gap-2">
                        <Briefcase size={16} className="text-brand-secondary" />
                        {t.hero.title}
                      </span>
                      <span className="flex items-center gap-2">
                        <User size={16} className="text-brand-secondary" />
                        {t.hero.age}
                      </span>
                    </motion.div>
                    <motion.p variants={itemVariants} className="text-xl lg:text-2xl text-brand-text leading-relaxed max-w-3xl font-normal">
                      {t.hero.description}
                    </motion.p>
                  </div>

                  <motion.div variants={itemVariants} className="p-10 bg-brand-card rounded-[2.5rem] border border-brand-border shadow-sm hover:shadow-xl hover:shadow-palette-rose/10 transition-all duration-500">
                    <h3 className="text-xs font-black mb-8 flex items-center gap-2 uppercase tracking-widest text-brand-secondary">
                      <Mail size={16} className="text-brand-primary" />
                      {t.contact.title}
                    </h3>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8">
                      <a href={`mailto:${t.contact.email}`} className="flex items-center gap-3 md:gap-4 text-brand-text hover:text-brand-primary transition-colors group">
                        <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl md:rounded-2xl bg-palette-pink/15 dark:bg-palette-mocha/40 border border-palette-pink/30 flex items-center justify-center text-palette-pink dark:text-palette-pink group-hover:bg-palette-pink group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-xs">
                          <Mail size={18} className="md:w-5 md:h-5" />
                        </div>
                        <span className="font-bold text-[15px] sm:text-base md:text-lg tracking-tight truncate sm:whitespace-normal">{t.contact.email}</span>
                      </a>
                      <a href={`tel:${t.contact.phone.replace(/\s+/g, '')}`} className="flex items-center gap-3 md:gap-4 text-brand-text hover:text-brand-primary transition-colors group">
                        <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl md:rounded-2xl bg-palette-pink/15 dark:bg-palette-mocha/40 border border-palette-pink/30 flex items-center justify-center text-palette-pink dark:text-palette-pink group-hover:bg-palette-pink group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-xs">
                          <Phone size={18} className="md:w-5 md:h-5" />
                        </div>
                        <span className="font-bold text-[15px] sm:text-base md:text-lg tracking-tight">{t.contact.phone}</span>
                      </a>
                    </div>
                  </motion.div>
                </motion.section>
              )}

              {activeSection === 'experience' && (
                <motion.section 
                  key={`experience-${lang}`}
                  id="experience" 
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-12"
                >
                  <h2 className="text-5xl font-black text-brand-highlight dark:text-palette-pink tracking-tight">{t.experience.title}</h2>
                  
                  <div className="space-y-8 relative">
                    <div className="hidden md:block absolute left-0 lg:left-0 top-0 bottom-0 w-px bg-palette-rose/40 dark:bg-palette-mocha/50" />
                    {t.experience.items.map((item, index) => (
                      <motion.div 
                        key={index}
                        variants={itemVariants}
                        className="relative md:pl-10 pb-12 last:pb-0"
                      >
                        <div className="hidden md:block absolute left-[-5px] top-2 w-[11px] h-[11px] rounded-full bg-palette-pink ring-4 ring-palette-pink/30 dark:ring-palette-mocha/60 shadow-xs" />
                        <div className="bg-brand-card p-10 rounded-[2.5rem] border border-brand-border shadow-sm hover:shadow-xl hover:shadow-palette-rose/10 transition-all duration-500 group">
                          <span className="text-palette-pink dark:text-palette-pink font-black text-xs uppercase tracking-[0.2em] mb-4 block">{item.year}</span>
                          <h3 className="text-3xl font-black mb-2 tracking-tight text-brand-text group-hover:text-palette-pink transition-colors">{item.role}</h3>
                          <p className="text-brand-muted font-bold mb-6 text-sm uppercase tracking-wider">{item.company}</p>
                          {item.tasks && item.tasks.length > 0 ? (
                            <ul className="space-y-3 mb-6">
                              {(item.tasks as string[]).map((task, taskIndex) => (
                                <li key={taskIndex} className="flex items-start gap-3 text-brand-text/90 text-lg font-normal">
                                  <span className="mt-2 w-2 h-2 rounded-full bg-palette-pink shrink-0" />
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-brand-text/90 leading-relaxed text-lg font-normal mb-6">{item.description}</p>
                          )}
                          
                          {item.hasGallery && (
                            <button
                              onClick={() => {
                                setSelectedGallery(item.galleryImages || null);
                                setCurrentImageIndex(0);
                              }}
                              className="inline-flex items-center gap-2 px-6 py-3 bg-palette-pink/15 dark:bg-palette-mocha/40 border border-palette-pink/40 text-palette-pink dark:text-palette-pink rounded-xl font-bold text-sm hover:bg-palette-pink hover:text-white dark:hover:bg-palette-pink dark:hover:text-white hover:border-palette-pink transition-all group/btn shadow-xs cursor-pointer"
                            >
                              <ImageIcon size={18} className="group-hover/btn:scale-110 text-palette-pink group-hover:text-white transition-transform" />
                              {item.galleryTitle}
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {activeSection === 'skills' && (
                <motion.section 
                  key={`skills-${lang}`}
                  id="skills" 
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-12"
                >
                  <h2 className="text-5xl font-black text-brand-highlight dark:text-palette-pink tracking-tight">{t.skills.title}</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {t.skills.categories.map((cat, index) => (
                      <div 
                        key={index}
                        className="bg-brand-card p-10 rounded-[2.5rem] border border-brand-border shadow-sm hover:shadow-2xl hover:shadow-palette-rose/15 transition-all duration-500 relative overflow-hidden group"
                      >
                        {/* Decorative background ambient element with requested palette */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-palette-pink/20 dark:bg-palette-mocha/30 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 blur-2xl pointer-events-none" />
                        
                        <h3 className="text-lg font-black font-ubuntu mb-10 text-brand-highlight dark:text-palette-pink uppercase tracking-[0.2em] relative inline-block">
                          {cat.name}
                          <span className="absolute bottom-[-8px] left-0 w-12 h-1 bg-palette-pink rounded-full" />
                        </h3>
                        
                        <div className="flex flex-wrap gap-3">
                          {cat.items.map((skill, sIndex) => (
                            <span 
                              key={sIndex} 
                              className="px-6 py-3 bg-brand-bg/90 dark:bg-brand-card text-brand-text rounded-2xl font-bold text-sm border border-palette-pink/30 hover:bg-palette-pink/15 dark:hover:bg-palette-mocha/30 hover:border-palette-pink hover:text-palette-pink dark:hover:text-palette-pink shadow-xs hover:shadow-md transition-all cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>

          <motion.footer 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl mx-auto mt-[82px] md:mt-[99px]"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-8 px-6 border-t border-brand-border">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-palette-pink animate-pulse" />
                  <p className="text-sm font-bold text-brand-muted tracking-wide uppercase whitespace-nowrap">
                    {t.contact.order}
                  </p>
                </div>
                
                <a 
                  href="https://www.instagram.com/site_web_portfolio/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-5 py-2.5 bg-brand-card border border-palette-pink/40 rounded-xl hover:border-palette-pink hover:bg-palette-pink/15 transition-all shadow-xs hover:shadow-md"
                >
                  <Instagram size={14} className="text-palette-pink group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-black text-brand-text tracking-widest uppercase">
                    {lang === 'fr' ? 'Instagram' : 'Instagram'}
                  </span>
                  <ExternalLink size={12} className="text-palette-pink/70 group-hover:text-palette-pink transition-colors" />
                </a>
              </div>
            </div>

            <div className="text-center text-brand-muted text-[11px] font-black uppercase tracking-[0.3em] pb-4 md:pb-6">
              © {year} {t.hero.name} • {lang === 'fr' ? 'Tous droits réservés' : 'All Rights Reserved'}
            </div>
          </motion.footer>
        </main>
      </div>

      {/* Sophisticated Carousel Modal */}
      <AnimatePresence>
        {selectedGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-brand-bg/95 backdrop-blur-xl"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
              <div className="absolute -top-[10%] -left-[10%] w-[45%] h-[45%] bg-palette-pink/30 blur-[100px] rounded-full" />
              <div className="absolute -bottom-[10%] -right-[10%] w-[45%] h-[45%] bg-palette-terracotta/25 blur-[100px] rounded-full" />
            </div>
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSelectedGallery(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 z-[110] p-4 bg-brand-card text-palette-pink rounded-full shadow-2xl border border-palette-pink/40 hover:bg-palette-pink hover:text-white transition-all cursor-pointer"
            >
              <X size={24} />
            </motion.button>

            <div className="relative w-full min-[992px]:w-[500px] max-w-6xl aspect-video md:aspect-[16/9] overflow-hidden rounded-[2.5rem] shadow-2xl border border-palette-pink/40 bg-brand-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={selectedGallery[currentImageIndex]}
                  initial={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) => (prev === 0 ? selectedGallery.length - 1 : prev - 1));
                  }}
                  className="pointer-events-auto p-3 md:p-5 bg-brand-card text-palette-pink rounded-full hover:bg-palette-pink hover:text-white transition-all shadow-lg shadow-black/10 border border-palette-pink/40 cursor-pointer"
                >
                  <ChevronLeft size={24} className="md:w-8 md:h-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) => (prev === selectedGallery.length - 1 ? 0 : prev + 1));
                  }}
                  className="pointer-events-auto p-3 md:p-5 bg-brand-card text-palette-pink rounded-full hover:bg-palette-pink hover:text-white transition-all shadow-lg shadow-black/10 border border-palette-pink/40 cursor-pointer"
                >
                  <ChevronRight size={24} className="md:w-8 md:h-8" />
                </button>
              </div>

              {/* Indicators */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {selectedGallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      currentImageIndex === idx ? 'w-12 bg-palette-pink' : 'w-3 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
