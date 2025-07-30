'use client';

import { motion, easeOut, easeInOut } from "framer-motion";
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import DownloadAppSection from '../components/DownloadAppSection';
import WhyChooseTransLinka from '@/components/WhyChooseTransLinka';
import HowItWorks from '@/components/HowItWorks';
import ContactPage from '@/components/ContactPage';
import FooterAndCTA from '@/components/FooterAndCTA';


const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: easeOut }
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: easeOut }
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: easeOut }
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: easeInOut }
  },
};

const slideInFromBottom = {
  hidden: { opacity: 0, y: 100 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1, ease: easeOut }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <main className="scroll-smooth overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar />
      </motion.div>

      <motion.section
        id="hero"
        className="relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp}>
          <Hero />
        </motion.div>
      </motion.section>

      <motion.section
        id="download"
        className="relative scroll-mt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInLeft}
      >
        <DownloadAppSection />
      </motion.section>

      <motion.section
        id="features"
        className="relative scroll-mt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={scaleIn}
      >
        <WhyChooseTransLinka />
      </motion.section>

      <motion.section
        id="how-it-works"
        className="relative scroll-mt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInRight}
      >
        <HowItWorks />
      </motion.section>

      <motion.section
        id="contact"
        className="relative scroll-mt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={slideInFromBottom}
      >
        <ContactPage />
      </motion.section>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInUp}
      >
        <FooterAndCTA />
      </motion.div>
    </main>
  );
}
