'use client';
import LoginForm from '../../components/LoginForm';
import Head from 'next/head';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import SignupForm from '../../components/SignupForm';
import VoiceRecorderModal from '../../components/VoiceRecorderModal';


const AnimatedSphere = dynamic(() => import('../../components/AnimatedSphere'), { ssr: false });

export default function OldHome() {
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const openModal = () => setShowModal(true);
  // const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);
  const [showAgentModal, setShowAgentModal] = useState(false);

  const openLoginModal = () => {
  setShowModal(false); // Close signup
  setShowLoginModal(true); // Open login
};

  const openSignupModal = () => {
    setShowLoginModal(false); // Close login
    setShowModal(true); // Open signup
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
  }};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FFFBF3] text-gray-900 min-h-screen relative overflow-hidden">
      <Head>
        <title>Voyo | AI Agent Solutions (Old Home)</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Geometric Background Elements */}
      <div className="geometric-shape geometric-shape-1"></div>
      <div className="geometric-shape geometric-shape-2"></div>
      <div className="geometric-shape geometric-shape-3"></div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-[#FFFBF3] px-6 lg:px-12 py-6">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src="/logo-voyo-removebg-preview.png" className="w-50 h-50" alt="Voyo Logo" />
            {/* <span className="text-xl font-semibold text-gray-900">VOYO</span> */}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer"
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection('ecosystem')}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer"
            >
              Ecosystem
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer"
            >
              Contact
            </button>

            <button onClick={openModal} className="btn-modern">
              Get Started
            </button>
            <a
              href="https://calendly.com/yatharthkher/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modern-outline"
            >
              Schedule Call
            </a>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <details className="relative">
              <summary className="list-none text-gray-900 cursor-pointer text-xl font-bold">☰</summary>
              <div className="absolute right-0 mt-2 modern-card w-56 z-50 p-4 flex flex-col gap-3">
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('ecosystem')}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer"
                >
                  Ecosystem
                </button>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer"
                >
                  Contact
                </button>
                <button onClick={openModal} className="btn-modern w-full">
                    Get Started
                </button>
                <a
                  href="https://calendly.com/yatharthkher/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-modern-outline w-full text-center"
                >
                  Schedule Call
                </a>
              </div>
            </details>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative section-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
                AI <span className="text-highlight font-medium">Agents</span> that work
                <br />
                <span className="text-gradient font-medium">like humans</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Transform your business with intelligent AI agents that handle complex queries, 
                boost efficiency, and deliver precision at scale.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={openModal}
                className="btn-modern text-lg px-8 py-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Building
              </motion.button>
              <motion.button
                onClick={openLoginModal}
                className="btn-modern-outline text-lg px-8 py-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign In
              </motion.button>
              <motion.button
                onClick={() => setShowAgentModal(true)}
                className="text-highlight hover:text-orange-600 font-medium text-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Live Demo →
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <div className="text-3xl font-semibold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600 font-medium">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-gray-900">10M+</div>
                <div className="text-sm text-gray-600 font-medium">Interactions</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-gray-900">80%</div>
                <div className="text-sm text-gray-600 font-medium">Cost Savings</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="relative flex justify-center lg:justify-end animate-float"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="w-80 h-80 lg:w-96 lg:h-96">
              <AnimatedSphere />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section id="ecosystem" className="section-padding-sm bg-[#f5f1e8]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Trusted by industry leaders</h3>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              We efficiently manage millions of AI-powered interactions monthly, 
              maintaining near-perfect uptime for businesses worldwide.
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16">
              <motion.div
                className="modern-card p-6"
                whileHover={{ y: -4 }}
              >
                <img src="/TigerPay.png" alt="TigerPay" className="w-28 h-auto" />
              </motion.div>
              
              <motion.div
                className="modern-card p-6"
                whileHover={{ y: -4 }}
              >
                <span className="text-2xl font-semibold text-gray-900">Shuraa</span>
              </motion.div>
              
              <motion.div
                className="modern-card p-6"
                whileHover={{ y: -4 }}
              >
                <img src="/as-logo.png" alt="AS" className="w-28 h-auto" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl lg:text-5xl font-light mb-6">
              The only <span className="text-highlight font-medium">AI platform</span> you need
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
              From conversational AI agents to intelligent co-pilots, unlock endless possibilities 
              to transform your business operations and customer experiences.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="modern-card p-8 text-center"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">✓</span>
                </div>
                <h4 className="text-xl font-semibold mb-4">No-Code Platform</h4>
                <p className="text-gray-600">Build sophisticated AI agents without writing code</p>
              </motion.div>

              <motion.div 
                className="modern-card p-8 text-center"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">📊</span>
                </div>
                <h4 className="text-xl font-semibold mb-4">Cost-Effective</h4>
                <p className="text-gray-600">Reduce operational costs by up to 80%</p>
              </motion.div>

              <motion.div 
                className="modern-card p-8 text-center"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="text-xl font-semibold mb-4">Powerful Analytics</h4>
                <p className="text-gray-600">Deep insights to optimize performance</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-[#f5f1e8]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl lg:text-5xl font-light mb-6">
              <span className="text-gradient font-medium">Powerful features</span> for modern businesses
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to build, deploy, and scale AI agents
            </p>
          </motion.div>

          <div className="feature-grid">
            <motion.div 
              className="modern-card p-8"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-xl font-semibold mb-4">Accurate Image Classification</h4>
              <p className="text-gray-600 leading-relaxed">
                Enhance support by precisely categorizing images with advanced AI vision technology 
                for faster, more accurate resolutions.
              </p>
            </motion.div>

            <motion.div 
              className="modern-card p-8"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🛡️</span>
              </div>
              <h4 className="text-xl font-semibold mb-4">Automated Quality Audits</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Greeting & Introduction</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Customer Sentiment Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Action Verification</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="modern-card p-8"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">💬</span>
              </div>
              <h4 className="text-xl font-semibold mb-4">Intelligent Conversations</h4>
              <p className="text-gray-600 leading-relaxed">
                Seamlessly integrate multiple data sources and SOPs to generate 
                contextually accurate responses and intelligent actions.
              </p>
            </motion.div>

            <motion.div 
              className="modern-card p-8"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🎙️</span>
              </div>
              <h4 className="text-xl font-semibold mb-4">Voice AI Agents</h4>
              <p className="text-gray-600 leading-relaxed">
                Build and deploy cost-effective voice AI agents that communicate 
                and take actions with human-like intelligence.
              </p>
            </motion.div>

            <motion.div 
              className="modern-card p-8"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📈</span>
              </div>
              <h4 className="text-xl font-semibold mb-4">AI-Powered Analytics</h4>
              <p className="text-gray-600 leading-relaxed">
                Identify critical issues and unlock valuable insights from 
                millions of customer interactions with intelligent analysis.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Agent Co-pilot Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl lg:text-5xl font-light mb-6">
                <span className="text-gradient font-medium">Agent Co-pilot</span>
              </h3>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Empower your team with real-time, AI-driven insights and personalized 
                customer intelligence that transforms every interaction.
              </p>

              <div className="space-y-6">
                <motion.div 
                  className="modern-card p-6"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-sm">💬</span>
                    </div>
                    <h4 className="text-lg font-semibold">Chat Summarization</h4>
                  </div>
                  <p className="text-gray-600">Automatically summarizes complex conversations</p>
                </motion.div>

                <motion.div 
                  className="modern-card p-6"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-sm">✨</span>
                    </div>
                    <h4 className="text-lg font-semibold">Smart Suggestions</h4>
                  </div>
                  <p className="text-gray-600">AI-powered, policy-driven response suggestions</p>
                </motion.div>

                <motion.div 
                  className="modern-card p-6"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-sm">🎯</span>
                    </div>
                    <h4 className="text-lg font-semibold">Contextual Actions</h4>
                  </div>
                  <p className="text-gray-600">Intelligent recommendations for optimal outcomes</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
            <div className="relative w-80 h-80 mx-auto">
              {/* Central VOYO hub */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 modern-card w-20 h-20 flex items-center justify-center z-20"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-highlight font-semibold text-lg">voyo</span>
              </motion.div>

              {/* 🔁 Rotating Container for Orbiting Icons */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              >
                {[
                  { src: "/whatsapp.png", angle: 0 },
                  { src: "/zendesk.png", angle: 72 },
                  { src: "/salesforce.png", angle: 144 },
                  { src: "/slack.png", angle: 216 },
                  { src: "/freshdesk.png", angle: 288 },
                ].map(({ src, angle }, i) => {
                  const radius = 120;
                  const rad = (angle * Math.PI) / 180;
                  const x = radius * Math.cos(rad);
                  const y = radius * Math.sin(rad);

                  return (
                    <div
                      key={i}
                      className="absolute w-16 h-16 modern-card flex items-center justify-center"
                      style={{
                        top: `calc(50% + ${y}px)`,
                        left: `calc(50% + ${x}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <img src={src} className="w-18 h-15" alt="Integration" />
                    </div>
                  );
                })}
              </motion.div>
            </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="section-padding bg-[#f5f1e8]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-4xl lg:text-5xl font-light mb-6">
              <span className="text-gradient font-medium">Proven results</span> that matter
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your operations with AI-powered optimization that delivers 
              measurable results and unprecedented performance improvements.
            </p>
          </motion.div>

          <div className="stats-grid">
            <motion.div 
              className="modern-card p-8 text-center"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-light mb-4 text-gradient">80%</div>
              <h4 className="text-lg font-semibold mb-2">AI Agent Resolution</h4>
              <p className="text-gray-600 text-sm">
                Increase resolution rates while minimizing customer frustration
              </p>
            </motion.div>

            <motion.div 
              className="modern-card p-8 text-center"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-light mb-4 text-gradient">25%</div>
              <h4 className="text-lg font-semibold mb-2">Compliance Increase</h4>
              <p className="text-gray-600 text-sm">
                Enhance standards with intelligent co-pilot assistance
              </p>
            </motion.div>

            <motion.div 
              className="modern-card p-8 text-center"
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-light mb-4 text-gradient">20%</div>
              <h4 className="text-lg font-semibold mb-2">Faster Resolution</h4>
              <p className="text-gray-600 text-sm">
                Accelerate issue resolution for complex queries
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl lg:text-5xl font-light mb-6">
              Ready to <span className="text-highlight font-medium">transform</span> your business?
            </h3>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Get started today and see how AI can revolutionize your customer interactions—
              faster, smarter, and more effective than ever before.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
              <motion.button
                onClick={openModal}
                className="btn-modern text-lg px-10 py-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Free Trial
              </motion.button>

              <motion.a
                href="https://calendly.com/yatharthkher/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modern-outline text-lg px-10 py-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Demo
              </motion.a>
            </div>

            <div className="flex justify-center items-center space-x-8 text-gray-600 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free 30-Day Trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Cancel Anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-padding-sm bg-[#f5f1e8] border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src="/logo-voyo-removebg-preview.png" className="w-30 h-30" alt="Voyo Logo" />
              {/* <span className="text-lg font-semibold text-gray-900">VOYO</span> */}
            </div>

            <div className="flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#ecosystem" className="text-gray-600 hover:text-gray-900 transition-colors">Ecosystem</a>
              <a href="https://calendly.com/yatharthkher/15min" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              © 2025 Voyo AI. All rights reserved. Built with precision and powered by innovation.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showModal && (
        <div
          className="fixed inset-0 bg-white bg-opacity-60 flex justify-center items-start pt-12 pb-12 overflow-y-auto z-50"
        >
          <div
            className="modern-card p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <SignupForm onClose={() => setShowModal(false)} /> */}
            <SignupForm 
              onClose={() => setShowModal(false)} 
              switchToLogin={openLoginModal}
            />

          </div>
        </div>
      )}

      {showLoginModal && (
        <div
          className="fixed inset-0 bg-white bg-opacity-60 flex justify-center items-center z-50"
        >
          <div
            className="modern-card p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <LoginForm onClose={closeLoginModal} /> */}
            <LoginForm 
              onClose={closeLoginModal} 
              switchToSignup={openSignupModal}
            />

          </div>
        </div>
      )}

      {showAgentModal && (
        <VoiceRecorderModal onClose={() => setShowAgentModal(false)} agentId="QToM8kQDmosNTgBrqM4Q" />
      )}
    </div>
  );
}