'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const DomainCard = ({ domain, onClick, layoutId, index }) => {
  const { colors } = useTheme();

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.75,
        delay: index * 0.2,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.01,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      layout
      layoutId={layoutId}
      variants={cardVariants}
      whileHover="hover"
      transition={{
        layout: { type: 'spring', stiffness: 110, damping: 24, mass: 1 }
      }}
      className="relative group"
    >
      {/* Main Domain Card */}
      <div 
        className="rounded-xl border-2 overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: colors.primary,
          borderColor: colors.accent,
          boxShadow: `0 10px 30px -5px ${colors.accent}20`
        }}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onClick();
        }}
      >
        {/* Header Section */}
        <div 
          className="p-8 border-b"
          style={{ borderColor: `${colors.accent}30` }}
        >
          {/* Icon and Title */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div 
                className="text-5xl p-4 rounded-xl"
                style={{ 
                  backgroundColor: `${colors.accent}20`,
                  color: colors.accent 
                }}
              >
                {domain.icon}
              </div>
              <div>
                <h3 
                  className="text-3xl font-bold"
                  style={{ 
                    color: colors.accent,
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  {domain.title}
                </h3>
                <p 
                  className="text-base opacity-80"
                  style={{ 
                    color: colors.text,
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {domain.description}
                </p>
              </div>
            </div>
            
            {/* Mission Status Indicator */}
            <div 
              className="px-4 py-2 rounded-full text-sm font-bold"
              style={{
                backgroundColor: colors.accent,
                color: colors.primary
              }}
            >
              ACTIVE
            </div>
          </div>

          {/* Vault-style decorative line */}
          <div 
            className="h-1 w-full mb-6"
            style={{ backgroundColor: colors.accent }}
          />
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div 
                className="text-2xl font-bold"
                style={{ color: colors.accent }}
              >
                {domain.problems.length}
              </div>
              <div 
                className="text-sm"
                style={{ color: colors.text }}
              >
                MISSIONS
              </div>
            </div>
            <div>
              <div 
                className="text-2xl font-bold"
                style={{ color: colors.accent }}
              >
                {domain.problems.reduce((sum, p) => sum + parseInt(p.timeEstimate), 0)}h
              </div>
              <div 
                className="text-sm"
                style={{ color: colors.text }}
              >
                TOTAL TIME
              </div>
            </div>
            <div>
              <div 
                className="text-2xl font-bold"
                style={{ color: colors.accent }}
              >
                ${domain.problems.reduce((sum, p) => sum + parseInt(p.prizes[0].split('$')[1].replace(',', '')), 0).toLocaleString()}
              </div>
              <div 
                className="text-sm"
                style={{ color: colors.text }}
              >
                TOP PRIZE
              </div>
            </div>
          </div>
        </div>

        {/* Problem Statement Cards */}

        {/* Money Heist-inspired mask pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, ${colors.accent} 0%, transparent 50%), 
                             radial-gradient(circle at 80% 20%, ${colors.accent} 0%, transparent 50%)`
          }} />
        </div>
      </div>

      {/* Hover effect glow */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${colors.accent} 0%, transparent 70%)`,
          filter: 'blur(20px)'
        }}
      />
    </motion.div>
  );
};

export default DomainCard;
