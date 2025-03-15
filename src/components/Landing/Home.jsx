import React from "react";
import { Link } from "react-scroll";
import { ChevronDown, User, Building, Briefcase, Mail } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "../../assets/campus-dusk-bg1.jpg";

// Sample event data (can be replaced with server-fetched data later)
const upcomingEvents = [
  {
    id: 1,
    category: "Tech",
    title: "Microsoft Campus Recruitment",
    date: "20 Mar",
    description: "Microsoft will be conducting on-campus placement drives.",
  },
  {
    id: 2,
    category: "Engineering",
    title: "TCS CodeVita Challenge",
    date: "25 Mar",
    description: "Participate in TCS's annual coding competition.",
  },
];

const Home = () => {
  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const StatsCard = ({ icon: Icon, title, value, subValue, description }) => (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start">
        <div className="bg-[#4A90E2]/10 p-3 rounded-lg">
          <Icon size={24} className="text-[#4A90E2]" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm uppercase text-gray-500 font-medium tracking-wide">{title}</h3>
          <div className="flex items-end">
            <p className="text-3xl font-bold text-[#1E3A8A]">{value}</p>
            {subValue && <p className="ml-2 text-sm text-[#F4D03F]">{subValue}</p>}
          </div>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </motion.div>
  );

  const QuickLinkCard = ({ to, icon: Icon, title, description }) => (
    <Link
      to={to}
      spy={true}
      smooth={true}
      offset={-120}
      duration={800}
      className="group bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <motion.div
        className="bg-[#4A90E2] h-2 w-full group-hover:h-4 transition-all duration-300"
        initial={{ height: 8 }}
        whileHover={{ height: 16 }}
      />
      <div className="p-6">
        <div className="w-12 h-12 bg-[#4A90E2]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#4A90E2]/20 transition duration-300">
          <Icon size={24} className="text-[#4A90E2]" />
        </div>
        <h3 className="text-lg font-semibold text-[#1E3A8A] group-hover:text-[#4A90E2] transition duration-300 text-center">
          {title}
        </h3>
        <p className="text-gray-600 mt-2 text-center">{description}</p>
      </div>
    </Link>
  );

  const EventCard = ({ category, title, date, description }) => (
    <motion.div
      className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <div className="p-1 bg-gradient-to-r from-[#4A90E2] to-[#1E3A8A]"></div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-medium bg-[#4A90E2]/10 text-[#4A90E2] rounded-full mb-2">
              {category}
            </span>
            <h3 className="text-lg font-semibold text-[#1E3A8A]">{title}</h3>
          </div>
          <div className="bg-[#4A90E2]/10 px-3 py-2 rounded-lg text-center">
            <span className="block text-lg font-bold text-[#1E3A8A]">{date.split(" ")[0]}</span>
            <span className="text-xs text-gray-600">{date.split(" ")[1]}</span>
          </div>
        </div>
        <p className="text-gray-600 mt-3">{description}</p>
        <button className="mt-4 w-full bg-[#4A90E2] text-white py-2 rounded-md hover:bg-[#1E3A8A] transition duration-300">
          Register Now
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col items-center font-[Poppins,sans-serif]">
      {/* Hero Section */}
      <motion.section
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/70 to-[#4A90E2]/40 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-md"
              variants={fadeIn}
            >
              <span className="text-[#4A90E2]">Shape</span> Your Future with GCEK Placements
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl mb-8 font-light drop-shadow-md max-w-2xl mx-auto"
              variants={fadeIn}
            >
              Connecting talented students with industry leaders for exceptional career opportunities at Government College of Engineering Kannur
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeIn}>
              <Link
                to="placementdata"
                spy={true}
                smooth={true}
                offset={-120}
                duration={800}
                className="bg-[#4A90E2] text-white px-6 py-3 rounded-md hover:bg-[#1E3A8A] transition duration-300 cursor-pointer shadow-md hover:shadow-lg"
              >
                Explore Placements
              </Link>
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-120}
                duration={800}
                className="bg-transparent text-white border-2 border-[#4A90E2] px-6 py-3 rounded-md hover:bg-[#4A90E2] transition duration-300 cursor-pointer shadow-md hover:shadow-lg"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Link to="quicklinks" spy={true} smooth={true} offset={-120} duration={800} className="text-white cursor-pointer">
            <ChevronDown size={36} className="drop-shadow-md" />
          </Link>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-4 -mt-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            icon={User}
            title="Placements"
            value="95%"
            subValue="↑ 5%"
            description="Placement rate for 2023-24"
          />
          <StatsCard
            icon={Building}
            title="Recruiters"
            value="50+"
            subValue="↑ 15%"
            description="Top companies visiting our campus"
          />
          <StatsCard
            icon={Briefcase}
            title="Highest Package"
            value="13.2"
            subValue="LPA"
            description="Sobha Developers, Dubai (2023-24)"
          />
        </div>
      </section>

      {/* Upcoming Placement Events Section */}
      <section className="py-16 bg-[#F7FAFC] w-full">
        <div className="max-w-5xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-[#1E3A8A] text-center mb-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Upcoming Placement Events
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-[#4A90E2] mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard
                key={event.id}
                category={event.category}
                title={event.title}
                date={event.date}
                description={event.description}
              />
            ))}
            {/* Placeholder for no events */}
            {upcomingEvents.length === 0 && (
              <p className="text-center text-gray-600 col-span-full">
                No upcoming events scheduled. Check back later!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section id="quicklinks" className="py-20 text-center w-full bg-white">
        <motion.h2
          className="text-3xl font-bold text-[#1E3A8A] mb-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          Discover More
        </motion.h2>
        <motion.div
          className="w-24 h-1 bg-[#4A90E2] mx-auto mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          <QuickLinkCard
            to="recruiters"
            icon={Building}
            title="Our Recruiters"
            description="Meet the industry leaders that trust GCEK talent."
          />
          <QuickLinkCard
            to="placementdata"
            icon={Briefcase}
            title="Placement Data"
            description="Explore detailed placement statistics and success stories."
          />
          <QuickLinkCard
            to="contact"
            icon={Mail}
            title="Contact Us"
            description="Reach out to our placement cell for inquiries."
          />
        </div>
      </section>
    </div>
  );
};

export default Home;