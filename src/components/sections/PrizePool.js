'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext'; 

// --- PRIZE POOL SPECIFIC THEME CONFIG ---
const POOL_THEMES = {
  dark: {
    bg: '#050505',
    cardBg: 'rgba(10, 10, 10, 0.95)',
    cardBorder: '#5c0e10', 
    accent: '#e62429', 
    text: '#ffffff',
    textSecondary: '#9ca3af',
    watermarkOpacity: 0.15, 
    watermarkBlend: 'blend-screen',
    shadow: '0 0 0 1px #5c0e10 inset',
    buttonGlow: '0 0 15px rgba(230, 36, 41, 0.6)' 
  },
  light: {
    bg: '#f4f4f5',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    cardBorder: '#e62429', 
    accent: '#d91c21', 
    text: '#111827',
    textSecondary: '#4b5563',
    watermarkOpacity: 0.35, 
    watermarkBlend: 'blend-multiply', 
    shadow: '0 4px 20px rgba(0,0,0,0.1)',
    buttonGlow: '0 0 15px rgba(217, 28, 33, 0.3)' 
  }
};

// --- ANIMATION CONFIGURATION ---
const spring = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8
};

// --- MAIN COMPONENT ---
const PrizePool = () => {
  const [expandedTier, setExpandedTier] = useState(null);
  const { mode, theme, toggleTheme } = useTheme(); 
  const activeTheme = POOL_THEMES[theme] || POOL_THEMES.dark;

  const prizeTiers = [
    {
      id: 'winner',
      title: 'GRAND PRIZE',
      icon: '🏆',
      amount: '₹12,000',
      subtitle: 'The Ultimate Loot',
      stats: [
        { label: 'POSITIONS', value: '1 Winner' },
        { label: 'PERKS', value: 'Internship' },
        { label: 'CASH PRIZE', value: '₹12,000' }
      ],
      description: 'The ultimate reward for the team that cracks the toughest code.',
      rewards: ['Direct Internship', 'Winner Trophy', 'Merch Kit', 'VIP Access']
    },
    {
      id: 'runnerup',
      title: 'RUNNER UP',
      icon: '🥈',
      amount: '₹8,000',
      subtitle: 'Second Command',
      stats: [
        { label: 'POSITIONS', value: '1 Runner Up' },
        { label: 'PERKS', value: 'Mentorship' },
        { label: 'CASH PRIZE', value: '₹8,000' }
      ],
      description: 'For the team that was just one step away from the vault.',
      rewards: ['Mentorship Sessions', 'Runner Up Certs', 'Premium Swag']
    },
    {
      id: 'special',
      title: 'SPECIAL TRACK',
      icon: '🎖️',
      amount: '₹5,000',
      subtitle: 'Domain Experts',
      stats: [
        { label: 'POSITIONS', value: '3 Tracks' },
        { label: 'PERKS', value: 'Goodies' },
        { label: 'TOTAL POOL', value: '₹5,000' }
      ],
      description: 'Rewards for the most innovative solutions in specific domains.',
      rewards: ['Excellence Cert', 'Sponsor Goodies', 'Tech Gadgets']
    },
    {
      id: 'participation',
      title: 'PARTICIPANTS',
      icon: '📜',
      amount: 'Certificate',
      subtitle: 'For Every Hacker',
      stats: [
        { label: 'ELIGIBILITY', value: 'All Teams' },
        { label: 'REQUIREMENT', value: 'Submission' },
        { label: 'REWARD', value: 'Certificate' }
      ],
      description: 'Every participant who submits a valid project will be recognized. Your effort counts.',
      rewards: ['Official Certificate of Participation', 'Access to Community', 'Learning Resources']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden font-sans transition-colors duration-500 ease-in-out"
      style={{ backgroundColor: activeTheme.bg }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600&display=swap');
        .font-heading { font-family: 'Anton', sans-serif; letter-spacing: 0.5px; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* --- GLOBAL THEME TOGGLE BUTTON --- */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-110 active:scale-95 relative group"
          style={{ 
            backgroundColor: '#1a1a1a', 
            borderColor: activeTheme.accent,
            boxShadow: activeTheme.buttonGlow,
            color: '#ffffff'
          }}
          aria-label="Toggle Theme"
        >
          {mode === 'dark' && (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
          {mode === 'light' && (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          )}
          {mode === 'system' && (
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          )}
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-black/80 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider whitespace-nowrap">
            {mode} Mode
          </span>
        </button>
      </div>

      {/* --- CENTER WATERMARK --- */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden transition-opacity duration-500"
        style={{ opacity: activeTheme.watermarkOpacity }}
      >
         <img 
            src="/dali-mask.svg" // UPDATED TO SVG
            alt="Watermark" 
            className={`w-[80%] max-w-[350px] md:w-auto md:max-w-none md:h-[85vh] md:max-h-[1200px] object-contain grayscale ${activeTheme.watermarkBlend}`}
         />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">

        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* --- TITLE LAYOUT --- */}
          <div className="flex flex-row flex-wrap items-center justify-center gap-3 mb-6">
            {/* "THE" - Switches color based on theme */}
            <span 
              className={`text-7xl md:text-9xl font-heading uppercase tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-black'}`}
              style={{ textShadow: theme === 'dark' ? '0 0 30px rgba(0,0,0,0.5)' : 'none' }}
            >
              THE
            </span>
            
            {/* "VAULT" - Always Black Text on Red Background */}
            <div 
              className="px-4 pb-2 pt-3 rounded-sm transform -skew-x-6"
              style={{ backgroundColor: activeTheme.accent }}
            >
              <span 
                className="text-7xl md:text-9xl font-heading uppercase tracking-tighter text-black leading-none block transform skew-x-6"
              >
                VAULT
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-8 opacity-80">
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent to-red-600"></div>
            <div 
              className="rotate-45 w-3 h-3 border border-red-600 transition-colors duration-500"
              style={{ backgroundColor: activeTheme.bg }}
            ></div>
            <div className="h-[2px] w-24 bg-gradient-to-l from-transparent to-red-600"></div>
          </div>

          <motion.blockquote 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-serif italic mb-4 font-medium"
            style={{ color: activeTheme.accent }}
          >
            "The most important thing is not the money. It is the message."
          </motion.blockquote>

          <p className={`text-md md:text-lg font-body max-w-2xl mx-auto uppercase tracking-widest opacity-70 transition-colors duration-500`}
             style={{ color: activeTheme.textSecondary }}>
            Choose Your Target. Crack the Code. Win the Prize.
          </p>
        </motion.div>

        {/* --- CARDS GRID --- */}
        <LayoutGroup>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {prizeTiers.map((tier) => (
              <motion.div
                key={tier.id}
                layoutId={`card-${tier.id}`} 
                variants={cardVariants}
                onClick={() => setExpandedTier(tier)}
                whileHover={{ y: -5, borderColor: activeTheme.accent }}
                transition={spring} 
                className={`relative group cursor-pointer rounded-2xl border backdrop-blur-sm overflow-hidden flex flex-col justify-between ${tier.id === 'participation' ? 'lg:col-span-3' : ''}`}
                style={{ 
                  backgroundColor: activeTheme.cardBg,
                  borderColor: activeTheme.cardBorder,
                  boxShadow: activeTheme.shadow
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="p-8 relative z-10 flex flex-col h-full">
                  
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex gap-4">
                      <motion.div 
                        layoutId={`icon-${tier.id}`} 
                        className="w-16 h-16 min-w-[4rem] rounded-lg flex items-center justify-center text-3xl transition-colors duration-500 border"
                        style={{ 
                           backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f0f0f0',
                           borderColor: theme === 'dark' ? '#333' : '#ddd'
                        }}
                      >
                        {tier.icon}
                      </motion.div>
                      
                      <div>
                        <motion.h3 
                          layoutId={`title-${tier.id}`} 
                          className="text-3xl font-heading font-bold uppercase leading-none mb-1 transition-colors duration-500" 
                          style={{ color: activeTheme.accent }}
                        >
                          {tier.title}
                        </motion.h3>
                        <motion.p 
                          layoutId={`subtitle-${tier.id}`}
                          className={`text-sm font-body transition-colors duration-500`}
                          style={{ color: activeTheme.textSecondary }}
                        >
                          {tier.subtitle}
                        </motion.p>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border"
                          style={{
                            backgroundColor: `${activeTheme.accent}20`,
                            color: activeTheme.accent,
                            borderColor: `${activeTheme.accent}60`
                          }}>
                      Active
                    </span>
                  </div>

                  <p className={`font-body text-sm mb-8 line-clamp-2 h-10 transition-colors duration-500`}
                     style={{ color: activeTheme.textSecondary }}>
                    {tier.description}
                  </p>

                  <div className="h-[2px] w-full mt-auto mb-6"
                       style={{ 
                         background: `linear-gradient(90deg, transparent, ${activeTheme.accent}, transparent)` 
                       }}></div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    {tier.stats.map((stat, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center">
                        <span className={`text-[10px] uppercase font-bold mb-1 tracking-wider transition-colors duration-500`}
                              style={{ color: activeTheme.textSecondary }}>
                          {stat.label}
                        </span>
                        <span className={`text-lg font-heading tracking-wide transition-colors duration-500`}
                              style={{ color: activeTheme.text }}>
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* --- EXPANDED MODAL --- */}
          <AnimatePresence>
            {expandedTier && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setExpandedTier(null)}
                  className="absolute inset-0 backdrop-blur-md transition-colors duration-500"
                  style={{ backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.8)' }}
                />
                
                <motion.div
                  layoutId={`card-${expandedTier.id}`} 
                  transition={spring} 
                  className="w-full max-w-3xl border rounded-2xl overflow-hidden relative z-10 shadow-2xl transition-colors duration-500"
                  style={{ 
                    backgroundColor: theme === 'dark' ? '#0a0a0a' : '#ffffff',
                    borderColor: activeTheme.cardBorder 
                  }}
                >
                  <div className="p-8 md:p-12">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex gap-6 items-center">
                         <motion.div 
                            layoutId={`icon-${expandedTier.id}`}
                            className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl border"
                            style={{ 
                              backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f0f0f0',
                              borderColor: theme === 'dark' ? '#333' : '#ddd'
                            }}
                         >
                            {expandedTier.icon}
                         </motion.div>

                         <div>
                            <motion.h2 
                              layoutId={`title-${expandedTier.id}`}
                              className="text-5xl md:text-7xl font-heading uppercase mb-2"
                              style={{ color: activeTheme.text }}
                            >
                              {expandedTier.title}
                            </motion.h2>
                            <motion.p 
                              layoutId={`subtitle-${expandedTier.id}`}
                              className="text-xl font-body font-bold" 
                              style={{ color: activeTheme.accent }}
                            >
                              Total Prize Pool: {expandedTier.amount}
                            </motion.p>
                         </div>
                      </div>

                      <button 
                        onClick={() => setExpandedTier(null)}
                        className={`p-2 rounded-full transition-colors duration-300 hover:bg-red-500 hover:text-white`}
                        style={{ color: activeTheme.textSecondary }}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                    </div>

                    <div className="h-[2px] w-full mb-8" style={{ background: activeTheme.accent, opacity: 0.3 }}></div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="grid md:grid-cols-2 gap-8"
                    >
                      <div>
                        <h4 className="font-heading text-xl mb-4 uppercase tracking-wider" style={{ color: activeTheme.accent }}>
                          Rewards Breakdown
                        </h4>
                        <ul className="space-y-3">
                          {expandedTier.rewards.map((reward, i) => (
                            <li key={i} className={`flex items-center font-body transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              <span className="w-2 h-2 bg-red-600 rotate-45 mr-3"></span>
                              {reward}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="p-6 rounded-xl border transition-colors duration-500"
                           style={{ 
                             backgroundColor: theme === 'dark' ? '#111' : '#f9f9f9',
                             borderColor: theme === 'dark' ? '#333' : '#eee'
                           }}>
                        <h4 className="font-heading text-xl mb-4 uppercase tracking-wider" style={{ color: activeTheme.text }}>
                          Mission Brief
                        </h4>
                        <p className={`font-body leading-relaxed transition-colors duration-500`}
                           style={{ color: activeTheme.textSecondary }}>
                          {expandedTier.description} This tier represents the pinnacle of achievement. 
                          Only the boldest innovators will unlock this vault.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </div>
  );
};

export default PrizePool;