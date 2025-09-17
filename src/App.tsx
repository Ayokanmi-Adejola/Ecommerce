
import { useEffect, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { emailService } from "@/lib/emailService";
import { Helmet } from "react-helmet";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NotFound = lazy(() => import("./pages/NotFound"));
const NewsletterAdmin = lazy(() => import("./components/NewsletterAdmin"));
const EmailTest = lazy(() => import("./components/EmailTest"));

const queryClient = new QueryClient();

// Loading component for lazy-loaded routes
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-softBlack font-medium">Loading...</p>
    </div>
  </div>
);

const App = () => {
  // Initialize EmailJS when the app starts
  useEffect(() => {
    emailService.init();
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Helmet defaultTitle="Adejola and Sons Enterprise - Premium Artisanal Ice Cream" titleTemplate="%s | Adejola and Sons Enterprise">
          <meta name="description" content="Indulge in premium artisanal ice cream crafted with passion and the finest ingredients by Adejola and Sons Enterprise." />
        </Helmet>
        <PerformanceMonitor />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/newsletter-admin" element={<NewsletterAdmin />} />
              <Route path="/email-test" element={<EmailTest />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
