
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, IceCream } from "lucide-react";
import { toast } from "sonner";
import { newsletterService } from "@/lib/newsletter";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    try {
      await newsletterService.subscribe(email.trim(), 'footer');

      toast.success("🎉 Thank you for subscribing! A confirmation email is being sent to your inbox right now.", {
        duration: 8000,
      });

      // Show additional info
      setTimeout(() => {
        toast.info("📧 Check your email inbox (and spam folder) for your FanIce newsletter welcome email. It should arrive within a minute!", {
          duration: 6000,
        });
      }, 2000);

      setEmail("");

    } catch (error: any) {
      if (error.message === 'Email already subscribed') {
        toast.info("You're already subscribed to our newsletter! 📧");
      } else if (error.message === 'Invalid email address') {
        toast.error("Please enter a valid email address");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="bg-softBlack text-white pt-8 sm:pt-10 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-0 pb-6 sm:pb-8 border-b border-white/10">
          <div className="lg:pr-0">
            <Link to="/" className="inline-flex items-center gap-2 mb-3">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB4buwMPZdVyoOYKJPsU4ynG2t7ufRnDz_OK5G3bdj357j-RRNx59Bx0Bp8DZ5FH3r2tY&usqp=CAU"
                alt="Adejola & Sons Logo"
                className="h-8 w-auto"
                loading="lazy"
              />
              <span className="font-serif text-xl sm:text-2xl font-bold">Adejola & Sons</span>
            </Link>
            <p className="text-white/70 mb-4 max-w-xs text-sm">
            Are you looking for a reliable way to get FanIce products? We've got you covered! We deliver a wide variety of FanIce products throughout Nigeria.
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:ml-12 lg:pr-0 lg:-mr-12">
            <h4 className="font-serif text-base font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    if (location.pathname === '/') {
                      // If already on home page, scroll to top
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    } else {
                      // If on different page, navigate to home
                      navigate('/');
                    }
                  }}
                  className="text-white/70 hover:text-white transition-colors duration-200 text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <Link to="/products" className="text-white/70 hover:text-white transition-colors duration-200">
                  Products
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.querySelector('#about');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="text-white/70 hover:text-white transition-colors duration-200 text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.querySelector('#contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="text-white/70 hover:text-white transition-colors duration-200 text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:pl-0 lg:-ml-12">
            <h4 className="font-serif text-base font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">
                  plot 5, block 3, prayer city, Ibafo, ogun state, Nigeria.
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                <a href="tel:08051531723" className="text-white/70 hover:text-white transition-colors duration-200">
                  +234 8051531723
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                <a href="mailto:adejolaomowunmi@gmail.com" className="text-white/70 hover:text-white transition-colors duration-200">
                  adejola&sons@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:pl-12 lg:ml-4">
            <h4 className="font-serif text-base font-semibold mb-3">Opening Hours</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-white/70">Weekdays </span>
                <span>09:00 AM - 09:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/70">Weekends</span>
                <span>10:00 AM - 08:00 PM</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-white/10">
              <h5 className="font-medium mb-2 text-sm">Subscribe to our newsletter</h5>
              <form className="flex flex-col sm:flex-row gap-2 sm:gap-0" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 text-white placeholder-white/50 rounded-md sm:rounded-l-md sm:rounded-r-none px-3 py-2 w-full focus:outline-none focus:bg-white/20 transition-colors text-xs"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white px-3 py-2 rounded-md sm:rounded-r-md sm:rounded-l-none hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs whitespace-nowrap"
                >
                  {isSubmitting ? "..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="pt-5 text-center text-white/60 text-xs">
          <p>© {currentYear} Adejola & Sons, All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
