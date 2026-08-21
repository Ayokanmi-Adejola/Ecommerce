
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Truck, Clock, MapPin, IceCream } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen w-screen flex items-center justify-center overflow-hidden">

      {/* Background image — fills the entire section */}
      <div className="absolute inset-0 z-0">
        <img
          src="/delivery.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      {/* Overlay — blue-tinted dark gradient so text is legible */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-blue-950/80 via-blue-900/65 to-blue-800/30"></div>

      {/* Bottom fade to blend into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-10 bg-gradient-to-t from-white/10 to-transparent"></div>

      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-sm font-medium rounded-full mb-6"
          >
            <IceCream className="w-4 h-4 text-blue-300" />
            Nigeria's Premium Ice Cream Distributor
          </motion.span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
            Delivering Quality{" "}
            <span className="text-blue-300">Ice Cream</span>{" "}
            Nationwide
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
            Our fleet of refrigerated vehicles and expert team ensure your FanIce products
            arrive in perfect condition — maintaining consistent temperature from our
            warehouse to your freezer.
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
              <Truck className="w-4 h-4 text-blue-300 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-white">Nationwide Coverage</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 text-blue-300 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-white">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4 text-blue-300 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-white">Live Tracking</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/products"
              className="w-full sm:w-auto bg-blue-600 text-white px-7 py-3.5 rounded-md shadow-strong transition-all duration-300 hover:bg-blue-500 inline-flex items-center justify-center group font-medium"
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
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="w-full sm:w-auto bg-white/15 backdrop-blur-sm text-white border border-white/30 px-7 py-3.5 rounded-md transition-all duration-300 hover:bg-white/25 inline-flex items-center justify-center font-medium"
            >
              About Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
