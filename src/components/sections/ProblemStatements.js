'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import DomainCard from '../ui/DomainCard';
import ProblemStatementCard from '../ui/ProblemStatementCard';
import ProblemStatementDetail from '../ui/ProblemStatementDetail';

const ProblemStatements = () => {
  const { colors } = useTheme();
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [expandedDomainId, setExpandedDomainId] = useState(null);

  const domains = [
    {
      id: 'fintech',
      title: 'FinTech Revolution',
      icon: '💰',
      description: 'Disrupting financial systems',
      problems: [
        {
          id: 'fintech-1',
          title: 'Decentralized Banking',
          description: 'Create a blockchain-based banking system',
          difficulty: 'Hard',
          timeEstimate: '48h',
          technologies: ['Blockchain', 'Smart Contracts', 'Web3'],
          fullDescription: 'Design and implement a decentralized banking platform that eliminates traditional intermediaries. The system should support peer-to-peer lending, automated interest calculations, and transparent transaction history using blockchain technology.',
          requirements: ['Smart contract development', 'Security audit', 'User interface', 'Transaction validation'],
          prizes: ['First Prize: $10,000', 'Second Prize: $5,000', 'Third Prize: $2,500']
        },
        {
          id: 'fintech-2',
          title: 'AI Trading Bot',
          description: 'Machine learning powered trading algorithm',
          difficulty: 'Medium',
          timeEstimate: '36h',
          technologies: ['Python', 'TensorFlow', 'Trading APIs'],
          fullDescription: 'Develop an AI-powered trading bot that can analyze market trends and execute trades automatically. The system should include risk management, portfolio optimization, and real-time market analysis.',
          requirements: ['ML model training', 'API integration', 'Risk assessment', 'Backtesting'],
          prizes: ['First Prize: $8,000', 'Second Prize: $4,000', 'Third Prize: $2,000']
        },
        {
          id: 'fintech-3',
          title: 'Microfinance Platform',
          description: 'Financial inclusion for underserved communities',
          difficulty: 'Medium',
          timeEstimate: '24h',
          technologies: ['React', 'Node.js', 'Mobile SDK'],
          fullDescription: 'Build a microfinance platform that provides small loans to underserved communities. Include credit scoring, loan management, and financial education features.',
          requirements: ['Credit scoring algorithm', 'Payment processing', 'User verification', 'Educational content'],
          prizes: ['First Prize: $6,000', 'Second Prize: $3,000', 'Third Prize: $1,500']
        }
      ]
    },
    {
      id: 'healthcare',
      title: 'Healthcare Innovation',
      icon: '🏥',
      description: 'Transforming medical technology',
      problems: [
        {
          id: 'health-1',
          title: 'AI Diagnosis Assistant',
          description: 'Machine learning for medical diagnosis',
          difficulty: 'Hard',
          timeEstimate: '48h',
          technologies: ['Python', 'Computer Vision', 'NLP'],
          fullDescription: 'Create an AI-powered diagnosis assistant that can analyze medical images and patient data to suggest potential diagnoses. The system should prioritize accuracy and explainability.',
          requirements: ['Image processing', 'NLP integration', 'Doctor validation interface', 'HIPAA compliance'],
          prizes: ['First Prize: $12,000', 'Second Prize: $6,000', 'Third Prize: $3,000']
        },
        {
          id: 'health-2',
          title: 'Telemedicine Platform',
          description: 'Remote healthcare consultation system',
          difficulty: 'Medium',
          timeEstimate: '36h',
          technologies: ['WebRTC', 'React', 'HIPAA compliance'],
          fullDescription: 'Develop a comprehensive telemedicine platform that connects patients with healthcare providers remotely. Include video consultations, prescription management, and health record sharing.',
          requirements: ['Video streaming', 'Appointment scheduling', 'Prescription management', 'Secure messaging'],
          prizes: ['First Prize: $8,000', 'Second Prize: $4,000', 'Third Prize: $2,000']
        },
        {
          id: 'health-3',
          title: 'Mental Health Tracker',
          description: 'Digital wellness and mood tracking',
          difficulty: 'Easy',
          timeEstimate: '24h',
          technologies: ['React Native', 'Analytics', 'ML'],
          fullDescription: 'Build a mental health tracking application that helps users monitor their mood, stress levels, and overall wellness. Include personalized recommendations and crisis intervention features.',
          requirements: ['Mood tracking', 'Analytics dashboard', 'Recommendation engine', 'Crisis support'],
          prizes: ['First Prize: $4,000', 'Second Prize: $2,000', 'Third Prize: $1,000']
        }
      ]
    },
    {
      id: 'sustainability',
      title: 'Sustainability Tech',
      icon: '🌱',
      description: 'Environmental impact solutions',
      problems: [
        {
          id: 'sustain-1',
          title: 'Carbon Footprint Tracker',
          description: 'Personal and business carbon monitoring',
          difficulty: 'Medium',
          timeEstimate: '36h',
          technologies: ['IoT', 'Data Analytics', 'Mobile'],
          fullDescription: 'Develop a comprehensive carbon footprint tracking system that helps individuals and businesses monitor, reduce, and offset their environmental impact. Include real-time monitoring and actionable insights.',
          requirements: ['Data collection', 'Analytics engine', 'Offset marketplace', 'Progress tracking'],
          prizes: ['First Prize: $7,000', 'Second Prize: $3,500', 'Third Prize: $1,750']
        },
        {
          id: 'sustain-2',
          title: 'Smart Grid Optimizer',
          description: 'AI-powered energy distribution',
          difficulty: 'Hard',
          timeEstimate: '48h',
          technologies: ['IoT', 'AI', 'Energy Systems'],
          fullDescription: 'Create an AI-powered smart grid optimization system that balances energy distribution, predicts demand, and integrates renewable energy sources efficiently.',
          requirements: ['Grid simulation', 'Demand forecasting', 'Renewable integration', 'Real-time optimization'],
          prizes: ['First Prize: $15,000', 'Second Prize: $7,500', 'Third Prize: $3,750']
        },
        {
          id: 'sustain-3',
          title: 'Waste Management System',
          description: 'Smart recycling and waste reduction',
          difficulty: 'Medium',
          timeEstimate: '24h',
          technologies: ['Computer Vision', 'IoT', 'Mobile'],
          fullDescription: 'Build a smart waste management system that uses computer vision to sort waste, tracks recycling rates, and provides incentives for proper waste disposal.',
          requirements: ['Image recognition', 'Sorting mechanism', 'Reward system', 'Analytics dashboard'],
          prizes: ['First Prize: $5,000', 'Second Prize: $2,500', 'Third Prize: $1,250']
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const expandedDomain = expandedDomainId
    ? domains.find((d) => d.id === expandedDomainId)
    : null;

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: colors.primary }}
    >
      {/* Money Heist-inspired background pattern */}
      <div className="absolute inset-0 opacity-0">
        <div className="h-full w-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Bold Title Section */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <h1 
              className="relative text-6xl md:text-8xl font-black tracking-tight mb-4"
              style={{ 
                color: colors.accent,
                fontFamily: 'var(--font-heading)',
                textShadow: '2px 2px 0px rgba(0,0,0,0.3)'
              }}
            >
              Problem Statements
            </h1>
          </div>
          
          {/* Vault-style divider */}
          <div className="flex items-center justify-center mb-6">
            <div 
              className="h-1 w-20"
              style={{ backgroundColor: colors.accent }}
            />
            <div 
              className="mx-4 text-2xl"
              style={{ color: colors.text }}
            >
              ◈
            </div>
            <div 
              className="h-1 w-20"
              style={{ backgroundColor: colors.accent }}
            />
          </div>
          
          <p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            style={{ 
              color: colors.text,
              fontFamily: 'var(--font-body)'
            }}
          >
            Choose Your Mission. Crack the Code. Win the Prize.
          </p>
        </motion.div>

        {/* Domain Cards Grid */}
        <LayoutGroup>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {domains.map((domain, index) => (
              <DomainCard
                key={domain.id}
                domain={domain}
                onClick={() => setExpandedDomainId(domain.id)}
                layoutId={`domain-${domain.id}`}
                index={index}
              />
            ))}
          </motion.div>

          <AnimatePresence>
            {expandedDomain && (
              <motion.div
                className="fixed inset-0 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                  onClick={() => setExpandedDomainId(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                />

                <motion.div
                  layout
                  layoutId={`domain-${expandedDomain.id}`}
                  className="relative h-full w-full overflow-y-auto"
                  style={{ backgroundColor: colors.primary }}
                  transition={{
                    layout: { type: 'spring', stiffness: 110, damping: 24, mass: 1 }
                  }}
                >
                  <div className="container mx-auto px-4 py-10">
                    <div className="flex items-start justify-between gap-4 mb-8">
                      <div>
                        <h2
                          className="text-4xl md:text-6xl font-black"
                          style={{ color: colors.accent, fontFamily: 'var(--font-heading)' }}
                        >
                          {expandedDomain.title}
                        </h2>
                        <p
                          className="text-base md:text-lg mt-2"
                          style={{ color: colors.text, fontFamily: 'var(--font-body)' }}
                        >
                          {expandedDomain.description}
                        </p>
                      </div>

                      <button
                        className="px-4 py-2 rounded-lg border"
                        style={{
                          borderColor: colors.accent,
                          color: colors.text,
                          backgroundColor: `${colors.accent}15`,
                          fontFamily: 'var(--font-mono)'
                        }}
                        onClick={() => setExpandedDomainId(null)}
                      >
                        CLOSE
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {expandedDomain.problems.map((problem, idx) => (
                        <ProblemStatementCard
                          key={problem.id}
                          problem={problem}
                          index={idx}
                          layoutId={`problem-${problem.id}`}
                          onClick={() => setSelectedProblem(problem)}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selectedProblem && (
              <ProblemStatementDetail
                problem={selectedProblem}
                layoutId={`problem-${selectedProblem.id}`}
                onClose={() => setSelectedProblem(null)}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </div>
  );
};

export default ProblemStatements;