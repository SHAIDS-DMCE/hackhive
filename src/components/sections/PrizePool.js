'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

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
  const { theme } = useTheme();

  // --- DATA FROM YOUR JSON FILE ---
  const prizeTiers = [
    {
      id: "winner",
      title: "GRAND PRIZE",
      icon: "🏆",
      amount: "₹12,000",
      subtitle: "The Ultimate Loot",
      stats: [
        { label: "POSITIONS", value: "1 Winner" },
        { label: "PERKS", value: "Certificate" },
        { label: "CASH PRIZE", value: "₹12,000" }
      ],
      description: "The ultimate reward for the team that cracks the toughest code.",
      rewards: ["Direct Internship", "Winner Trophy", "Merch Kit", "VIP Access"]
    },
    {
      id: "runnerup",
      title: "RUNNER UP",
      icon: "🥈",
      amount: "₹8,000",
      subtitle: "Second Command",
      stats: [
        { label: "POSITIONS", value: "1 Runner Up" },
        { label: "PERKS", value: "Certificate" },
        { label: "CASH PRIZE", value: "₹8,000" }
      ],
      description: "For the team that was just one step away from the vault.",
      rewards: ["Mentorship Sessions", "Runner Up Certs", "Premium Swag"]
    },
    {
      id: "participation",
      title: "PARTICIPANTS",
      icon: "📜",
      amount: "Certificate",
      subtitle: "For Every Hacker",
      stats: [
        { label: "ELIGIBILITY", value: "All Teams" },
        { label: "REQUIREMENT", value: "Submission" },
        { label: "REWARD", value: "Certificate" }
      ],
      description: "Every participant who submits a valid project will be recognized. Your effort counts.",
      rewards: [
        "Official Certificate of Participation",
        "Access to Community",
        "Learning Resources"
      ]
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
    <div className={`hhv-about min-h-screen relative overflow-hidden font-sans transition-colors duration-500 ease-in-out ${theme === 'dark' ? 'dark' : ''}`}>
      
      {/* Background Effects */}
      <div className="hhv-about__grain absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-20">

        {/* --- HEADER --- */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex flex-col items-center justify-center gap-2 mb-6">
            <div className="hhv-kicker tracking-widest hhv-font-body">
              <span></span>
            </div>
            
            {/* --- BOLD RED TITLE (Title Case) --- */}
            <h2 
              className="text-7xl md:text-9xl hhv-font-heading font-black tracking-tighter" 
              style={{ 
                color: '#e62429', 
              }}
            >
              The Vault
            </h2>

          </div>
          
          <div className="w-full max-w-md mx-auto hhv-heroCard__divider mb-8"></div>

          <motion.blockquote 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl hhv-font-heading italic mb-4 font-medium tracking-wide"
            style={{ color: 'var(--hhv-accent)' }}
          >
            "The perfect heist isn't about the money—it's about making history."
          </motion.blockquote>

          <p className={`text-md md:text-lg hhv-font-body max-w-2xl mx-auto uppercase tracking-widest opacity-80`}>
            Choose Your Target. Crack the Code. Win the Prize.
          </p>
        </motion.div>

        {/* --- CARDS GRID --- */}
        <LayoutGroup>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {prizeTiers.map((tier) => (
              <motion.div
                key={tier.id}
                layoutId={`card-${tier.id}`} 
                variants={cardVariants}
                onClick={() => setExpandedTier(tier)}
                whileHover={{ 
                  y: -5,
                  borderColor: "#c51b20",
                  boxShadow: "0 10px 40px -10px rgba(197, 27, 32, 0.5)"
                }}
                transition={spring} 
                className={`hhv-heroCard cursor-pointer flex flex-col justify-between ${tier.id === 'participation' ? 'lg:col-span-2' : ''}`}
              >
                <div className="relative z-10 flex flex-col h-full">
                  
                  {/* --- CARD HEADER (Standard Left Aligned) --- */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex gap-4">
                      <motion.div 
                        layoutId={`icon-${tier.id}`} 
                        className="w-16 h-16 min-w-[4rem] rounded-xl flex items-center justify-center text-3xl border"
                        style={{ 
                           backgroundColor: 'rgba(255, 255, 255, 0.05)',
                           borderColor: 'var(--hhv-border)'
                        }}
                      >
                        {tier.icon}
                      </motion.div>
                      
                      <div>
                        {/* --- UPDATED CARD TITLE FONT & COLOR --- */}
                        <motion.h3 
                          layoutId={`title-${tier.id}`} 
                          className="text-3xl hhv-font-heading font-black uppercase leading-none mb-1 tracking-wide" 
                          style={{ color: '#e62429' }} // Explicitly set to red
                        >
                          {tier.title}
                        </motion.h3>
                        <motion.p 
                          layoutId={`subtitle-${tier.id}`}
                          className={`text-sm hhv-font-body opacity-80`}
                        >
                          {tier.subtitle}
                        </motion.p>
                      </div>
                    </div>

                    <div className="hhv-tag hhv-font-body tracking-wider">
                      Active
                    </div>
                  </div>

                  <p className={`hhv-font-body text-sm mb-8 line-clamp-2 h-10 opacity-70`}>
                    {tier.description}
                  </p>

                  <div className="hhv-heroCard__divider mb-6"></div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    {tier.stats.map((stat, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center">
                        <span className="hhv-label hhv-font-body tracking-widest">
                          {stat.label}
                        </span>
                        <span className="hhv-heroCard__value hhv-font-heading" style={{ fontSize: '18px' }}>
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
                  className="absolute inset-0 backdrop-blur-md bg-black/60"
                />
                
                <motion.div
                  layoutId={`card-${expandedTier.id}`} 
                  transition={spring} 
                  className="hhv-heroCard w-full max-w-3xl relative z-10 !bg-[var(--hhv-bg)]"
                  style={{ border: '1px solid var(--hhv-accent)' }}
                >
                  <div className="p-4 md:p-8">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex gap-6 items-center">
                         <motion.div 
                            layoutId={`icon-${expandedTier.id}`}
                            className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl border"
                            style={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              borderColor: 'var(--hhv-border)'
                            }}
                         >
                            {expandedTier.icon}
                         </motion.div>

                         <div>
                            <motion.h2 
                              layoutId={`title-${expandedTier.id}`}
                              className="text-5xl md:text-7xl hhv-font-heading uppercase mb-2 tracking-wide"
                              style={{ color: 'var(--hhv-text)' }}
                            >
                              {expandedTier.title}
                            </motion.h2>
                            <motion.p 
                              layoutId={`subtitle-${expandedTier.id}`}
                              className="text-xl hhv-font-heading font-bold tracking-wide" 
                              style={{ color: 'var(--hhv-accent)' }}
                            >
                              Total Prize Pool: {expandedTier.amount}
                            </motion.p>
                         </div>
                      </div>

                      <button 
                        onClick={() => setExpandedTier(null)}
                        className="hhv-micro hover:bg-red-500/20 transition-colors hhv-font-body tracking-widest"
                      >
                        CLOSE
                      </button>
                    </div>

                    <div className="hhv-heroCard__divider mb-8"></div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="grid md:grid-cols-2 gap-8"
                    >
                      <div>
                        <h4 className="hhv-font-heading text-xl mb-4 uppercase tracking-wider" style={{ color: 'var(--hhv-accent)' }}>
                          Rewards Breakdown
                        </h4>
                        <div className="hhv-pillrow">
                          {expandedTier.rewards.map((reward, i) => (
                            <span key={i} className="hhv-micro hhv-font-body tracking-wider">
                              {reward}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-6 rounded-xl border border-[var(--hhv-border)] bg-[var(--hhv-surface)]">
                        <h4 className="hhv-font-heading text-xl mb-4 uppercase tracking-wider" style={{ color: 'var(--hhv-text)' }}>
                          Mission Brief
                        </h4>
                        <p className="hhv-font-body leading-relaxed opacity-80">
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