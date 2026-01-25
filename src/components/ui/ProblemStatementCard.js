'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Clock, Trophy, Code, ChevronRight } from 'lucide-react';

const ProblemStatementCard = ({ problem, onClick, index, layoutId }) => {
  const { colors } = useTheme();

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.01,
      x: 2,
      transition: {
        duration: 0.35,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.995,
      transition: {
        duration: 0.14
      }
    }
  };

  return (
    <motion.div
      layout
      layoutId={layoutId}
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      transition={{
        layout: { type: 'spring', stiffness: 110, damping: 26, mass: 1 }
      }}
      className="cursor-pointer relative group h-full"
    >
      <div 
        className="rounded-2xl border p-8 transition-all duration-300 h-[420px] md:h-[460px] flex flex-col"
        style={{
          backgroundColor: `${colors.accent}10`,
          borderColor: `${colors.accent}40`
        }}
      >
        {/* Header */}
        <div className="mb-6">
          <h4 
            className="font-bold text-3xl mb-3 line-clamp-2"
            style={{ 
              color: colors.text,
              fontFamily: 'var(--font-heading)'
            }}
          >
            {problem.title}
          </h4>
          <p 
            className="text-lg opacity-80 line-clamp-2"
            style={{ 
              color: colors.text,
              fontFamily: 'var(--font-body)'
            }}
          >
            {problem.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-3 mb-7 min-h-[56px]">
          {problem.technologies.slice(0, 3).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-4 py-3 rounded-lg text-base"
              style={{
                backgroundColor: `${colors.accent}20`,
                color: colors.accent,
                fontFamily: 'var(--font-mono)'
              }}
            >
              {tech}
            </span>
          ))}
          {problem.technologies.length > 3 && (
            <span
              className="px-4 py-3 rounded-lg text-base"
              style={{
                backgroundColor: `${colors.text}20`,
                color: colors.text,
                fontFamily: 'var(--font-mono)'
              }}
            >
              +{problem.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Footer Stats */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-8 text-base">
            {/* Time Estimate */}
            <div className="flex items-center space-x-1" style={{ color: colors.text }}>
              <Clock size={20} />
              <span style={{ fontFamily: 'var(--font-mono)' }}>
                {problem.timeEstimate}
              </span>
            </div>
            
            {/* Prize */}
            <div className="flex items-center space-x-1" style={{ color: colors.text }}>
              <Trophy size={20} />
              <span style={{ fontFamily: 'var(--font-mono)' }}>
                {problem.prizes[0].split('$')[1]}
              </span>
            </div>
          </div>

          {/* Action Indicator */}
          <div 
            className="flex items-center space-x-2 text-base opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ color: colors.accent }}
          >
            <span style={{ fontFamily: 'var(--font-mono)' }}>
              VIEW
            </span>
            <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Money Heist-inspired hover overlay */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${colors.accent} 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Subtle glow effect on hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${colors.accent} 0%, transparent 70%)`,
          filter: 'blur(8px)'
        }}
      />
    </motion.div>
  );
};

export default ProblemStatementCard;
