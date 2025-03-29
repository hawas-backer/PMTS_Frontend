import React, { memo } from "react";
import { Link } from "react-scroll";
import { ChevronDown, User, Building, Briefcase, Mail } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "../../assets/campus-dusk-bg1.jpg";

// Sample event data
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

// Simplified animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

// Memoized card components
const StatsCard = memo(({ icon: Icon, title, value, subValue, description }) => (
  <motion.div
    className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeIn}
  >
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
      <div className="bg-[#4A90E2]/10 p-3 rounded-lg">
        <Icon size={24} className="text-[#4A90E2]" />
      </div>
      <div className="text-center sm:text-left">
        <h3 className="text-sm uppercase text-gray-500 font-medium">{title}</h3>
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <p className="text-2xl sm:text-3xl font-bold text-[#1E3A8A]">{value}</p>
          {subValue && <p className="text-sm text-[#F4D03F]">{subValue}</p>}
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  </motion.div>
));

const QuickLinkCard = memo(({ to, icon: Icon, title, description }) => (
  <Link
    to={to}
    spy={true}
    smooth={true}
    offset={-70}
    duration={500}
    className="group bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
  >
    <div className="bg-[#4A90E2] h-1 w-full group-hover:h-2 transition-all duration-300" />
    <div className="p-4 sm:p-6">
      <div className="w-12 h-12 bg-[#4A90E2]/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon size={24} className="text-[#4A90E2]" />
      </div>
      <h3 className="text-lg font-semibold text-[#1E3A8A] group-hover:text-[#4A90E2] transition duration-300 text-center">
        {title}
      </h3>
      <p className="text-gray-600 mt-2 text-center text-sm sm:text-base">{description}</p>
    </div>
  </Link>
));

const EventCard = memo(({ category, title, date, description }) => (
  <motion.div
    className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeIn}
  >
    <div className="p-1 bg-gradient-to-r from-[#4A90E2] to-[#1E3A8A]" />
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
        <div className="text-center sm:text-left">
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
      <p className="text-gray-600 mt-3 text-sm sm:text-base">{description}</p>
      <button className="mt-4 w-full bg-[#4A90E2] text-white py-2 rounded-md hover:bg-[#1E3A8A] transition duration-300">
        Register Now
      </button>
    </div>
  </motion.div>
));

const Home = () => {
  return (
    <div className="flex flex-col items-center font-[Poppins,sans-serif]">
      {/* Hero Section */}
      <section className="relative w-full min-h-[100vh] bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/70 to-[#4A90E2]/40 flex items-center justify-center px-4">
          <div className="text-center text-white max-w-3xl">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <span className="text-[#4A90E2]">Shape</span> Your Future with GCEK Placements
            </motion.h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 font-light max-w-2xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              Connecting talented students with industry leaders for exceptional career opportunities
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <Link
                to="placementdata"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="bg-[#4A90E2] text-white px-6 py-3 rounded-md hover:bg-[#1E3A8A] transition duration-300 cursor-pointer shadow-md hover:shadow-lg"
              >
                Explore Placements
              </Link>
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="bg-transparent text-white border-2 border-[#4A90E2] px-6 py-3 rounded-md hover:bg-[#4A90E2] transition duration-300 cursor-pointer shadow-md hover:shadow-lg"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <Link to="quicklinks" spy={true} smooth={true} offset={-70} duration={500} className="text-white cursor-pointer">
            <ChevronDown size={36} className="drop-shadow-md" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-4 -mt-16 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

      {/* Upcoming Events Section */}
      <section className="py-12 sm:py-16 bg-[#F7FAFC] w-full">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] text-center mb-2">
            Upcoming Placement Events
          </h2>
          <div className="w-24 h-1 bg-[#4A90E2] mx-auto mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section id="quicklinks" className="py-12 sm:py-20 text-center w-full bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A8A] mb-2">
          Discover More
        </h2>
        <div className="w-24 h-1 bg-[#4A90E2] mx-auto mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
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

export default memo(Home);