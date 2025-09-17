
import { motion } from "framer-motion";
import { Shield, Truck, Award, Users } from "lucide-react"; // Import icons

const About = () => {
  return (
    <section id="about" className="section bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-lg relative z-10">
              <img
                src="https://zimcompass.ap-south-1.linodeobjects.com/zimcompass-product_e9b0638619660990409380.jpg"
                alt="FanIce Ice Cream making process"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-mint rounded-lg -z-0"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-softPink rounded-full -z-0 opacity-60"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block px-3 py-1 bg-mint text-primary text-sm font-medium rounded-full mb-6">Our Story</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4 sm:mb-6 text-softBlack">Excellence in Ice Cream Distribution</h2>

              <div className="space-y-4 text-charcoal/80">
                <p className="leading-relaxed">
                  Since our establishment, Adejola & Sons Distribution Company has been revolutionizing ice cream distribution
                  across Nigeria. As an authorized distributor for FanIce and other premium brands, we've built a reputation
                  for reliability and excellence in cold chain logistics.
                </p>
                <p className="leading-relaxed">
                  Our commitment to Danone's One Planet, One Health vision drives us to maintain sustainable practices
                  while ensuring the highest quality standards in ice cream distribution. We utilize advanced cold chain
                  technology and a modern fleet to guarantee product integrity from warehouse to delivery.
                </p>
              </div>
            </div>

            {/* Key Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
              {[
                {
                  icon: Shield,
                  title: "Quality Assured",
                  description: "Temperature-controlled storage and transport systems"
                },
                {
                  icon: Truck,
                  title: "Nationwide Network",
                  description: "Extensive distribution coverage across Nigeria"
                },
                {
                  icon: Users,
                  title: "Expert Team",
                  description: "Trained professionals in cold chain management"
                },
                {
                  icon: Award,
                  title: "Industry Leader",
                  description: "Multiple awards for distribution quality and excellence"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  className="p-4 sm:p-5 rounded-xl bg-white shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
                >
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-2 sm:mb-3" />
                  <h3 className="font-semibold mb-1 sm:mb-2 text-softBlack text-sm sm:text-base">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-charcoal/70 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Statistics */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
