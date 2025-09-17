
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu, X, Facebook, Instagram, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (link: any, isMobile = false) => {
    if (link.isAnchor) {
      // If we're not on the home page, navigate to home first
      if (location.pathname !== '/') {
        window.location.href = `/${link.path}`;
        return;
      }

      // For mobile, close menu first then scroll after a delay
      if (isMobile) {
        setMobileMenuOpen(false);
        setTimeout(() => {
          // Ensure body scroll is restored before scrolling
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.width = '';
          document.body.style.overflow = '';

          setTimeout(() => {
            const element = document.querySelector(link.path);
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }, 50); // Small delay to ensure body styles are applied
        }, 300); // Wait for menu close animation
      } else {
        // Desktop - immediate scroll
        const element = document.querySelector(link.path);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === '/') {
      // If already on home page, scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "#about", isAnchor: true },
    { name: "Contact", path: "#contact", isAnchor: true },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300",
          scrolled ? "bg-white/90 backdrop-blur-sm shadow-soft py-3" : "bg-transparent py-5"
        )}
      >
        <div className="container-custom flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src="data:image/png;base64,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"
              alt="Logo"
              className="h-8 sm:h-10 w-auto"
              loading="eager"
            />
            <Link
              to="/"
              onClick={handleHomeClick}
              className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-softBlack hover:opacity-90 transition-opacity"
            >
              Adejola & Sons
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.isAnchor ? (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className="nav-link"
                >
                  {link.name}
                </button>
              ) : link.name === "Home" ? (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={handleHomeClick}
                  className="nav-link"
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="nav-link"
                >
                  {link.name}
                </Link>
              )
            ))}

            {/* Social Media Links */}
            <div className="flex items-center space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-softBlack hover:text-primary transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-softBlack hover:text-primary transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-softBlack hover:text-primary transition-colors" />
              </a>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-softBlack" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 relative z-[70]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-softBlack" />
              ) : (
                <Menu className="h-6 w-6 text-softBlack" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] md:hidden"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed top-0 right-0 h-screen w-72 max-w-[85vw] bg-white z-[60] flex flex-col pt-20 px-4 sm:px-6 md:hidden transform transition-transform duration-300 ease-in-out shadow-2xl overflow-y-auto",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ position: 'fixed' }}
      >
        <nav className="flex flex-col space-y-6 flex-1 overflow-y-auto">
          {navLinks.map((link) => (
            link.isAnchor ? (
              <button
                key={link.name}
                onClick={() => handleNavClick(link, true)}
                className="text-lg sm:text-xl font-medium text-softBlack text-left py-3 border-b border-gray-100 hover:text-primary transition-colors"
              >
                {link.name}
              </button>
            ) : link.name === "Home" ? (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => {
                  handleHomeClick();
                  setMobileMenuOpen(false);
                }}
                className="text-xl font-medium text-softBlack py-2 border-b border-gray-100 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className="text-xl font-medium text-softBlack py-2 border-b border-gray-100 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            )
          ))}

          {/* Social Media Links for mobile */}
          <div className="flex items-center space-x-5 pt-8 mt-auto pb-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="h-6 w-6 text-softBlack hover:text-primary transition-colors" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="h-6 w-6 text-softBlack hover:text-primary transition-colors" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-6 w-6 text-softBlack hover:text-primary transition-colors" />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
