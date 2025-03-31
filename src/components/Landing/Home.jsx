import React, { memo } from "react";
import { Link } from "react-scroll";
import { ChevronDown, User, Building, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "../../assets/campus-dusk-bg1.jpg";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const StatsCard = memo(({ icon: Icon, title, value, subValue, description }) => (
  <motion.div
    className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-opacity-90"
    variants={fadeIn}
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center gap-4">
      <div className="bg-[var(--primary-accent)]/10 p-3 rounded-full">
        <Icon size={28} className="text-[var(--primary-accent)]" />
      </div>
      <div>
        <h3 className="text-sm uppercase text-[var(--secondary-text)] font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <p className="text-3xl font-bold text-[var(--primary-text)]">{value}</p>
          {subValue && <p className="text-sm font-medium text-[var(--highlight-color)]">{subValue}</p>}
        </div>
        <p className="text-sm text-[var(--muted-text)] mt-1">{description}</p>
      </div>
    </div>
  </motion.div>
));

const Home = () => {
  return (
    <div className="font-[Poppins,sans-serif] bg-[var(--primary-bg)] relative">
      <section 
        className="relative w-full min-h-[100vh] bg-cover bg-center overflow-hidden"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text contrast
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="relative z-10 inset-0 flex items-center justify-center px-4 min-h-[100vh]">
          <div className="text-center text-white max-w-4xl">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight text-white drop-shadow-lg"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
            >
              <span className="bg-gradient-to-r from-[var(--highlight-color)] to-white bg-clip-text text-transparent">
                Empowering Futures
              </span>
              <br />at GCEK Placements
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl mb-8 font-light max-w-2xl mx-auto text-white/90 drop-shadow-md"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              Building bridges to success through exceptional career opportunities
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              <Link
                to="placementdata"
                className="bg-white text-[var(--primary-accent)] px-8 py-3 rounded-full font-semibold hover:bg-[var(--highlight-color)] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Discover Opportunities
              </Link>
              <Link
                to="contact"
                className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[var(--primary-accent)] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>
        <motion.div 
          className="absolute bottom-12 left-0 right-0 flex justify-center z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Link to="stats" className="text-white">
            <ChevronDown size={40} className="drop-shadow-lg" />
          </Link>
        </motion.div>
      </section>

      <section id="stats" className="relative z-10 w-full max-w-6xl mx-auto px-4 -mt-20 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          <StatsCard
            icon={User}
            title="Placement Rate"
            value="95%"
            subValue="2023-24"
            description="Consistently high success rate"
          />
          <StatsCard
            icon={Building}
            title="Industry Partners"
            value="50+"
            subValue="Elite Firms"
            description="Top-tier company collaborations"
          />
          <StatsCard
            icon={Briefcase}
            title="Highest Package"
            value="13.2"
            subValue="LPA"
            description="Career-defining opportunities"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default memo(Home);