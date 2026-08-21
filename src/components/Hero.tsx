
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Truck, Clock, MapPin, IceCream } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100/40"></div>

        {/* Soft decorative shapes */}
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-blue-600/5 rounded-bl-[100px] sm:rounded-bl-[200px] blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-400/8 rounded-tr-[100px] sm:rounded-tr-[200px] blur-3xl"></div>

        {/* Additional ambient lighting */}
        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="order-2 md:order-1"
        >


          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-800 leading-tight mb-6 flex items-center gap-3 flex-wrap">
            Delivering Quality <span className="text-blue-600"> Ice Cream </span>
            <IceCream className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-blue-600 flex-shrink-0" />
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
          Our fleet of refrigerated vehicles and expert team ensure your FanIce products arrive in perfect condition,
          maintaining consistent temperature from our warehouse to your freezer.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-8">
            <div className="flex items-center gap-3 bg-white/80 border border-blue-100 p-3 sm:p-4 rounded-lg backdrop-blur-sm shadow-soft">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-700">Nationwide Coverage</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 border border-blue-100 p-3 sm:p-4 rounded-lg backdrop-blur-sm shadow-soft">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-700">24/7 Support</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 border border-blue-100 p-3 sm:p-4 rounded-lg backdrop-blur-sm shadow-soft">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-700">Live Tracking</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/products"
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-md shadow-soft transition-all duration-300 hover:bg-blue-700 hover:shadow-medium inline-flex items-center justify-center group text-center"
            >
              Explore Products
              <svg
                className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <button
              onClick={() => {
                const element = document.querySelector('#about');
                if (element) {
                  element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }
              }}
              className="w-full sm:w-48 bg-white text-blue-700 border border-blue-200 px-8 py-3 rounded-md shadow-soft transition-all duration-300 hover:bg-blue-50 hover:shadow-medium inline-flex items-center justify-center text-center"
            >
              About Us
            </button>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="order-1 md:order-2 relative"
        >
          <div className="relative aspect-square max-w-md mx-auto">
            {/* Enhanced Floating Animation with blue gradient */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-full h-full rounded-full bg-gradient-to-b from-blue-400/20 via-blue-200/20 to-transparent blur-2xl"
            />

            {/* Main Image */}
            <img
              src="/delivery.png"
              alt="Ice cream delivery vehicle"
              className="w-full h-full object-contain relative z-10 drop-shadow-xl"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />

            {/* Enhanced Decorative Element */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-blue-400/15 to-blue-200/15 blur-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
