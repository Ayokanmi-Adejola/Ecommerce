import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Search, FilterX } from "lucide-react";
import { useLocation } from "react-router-dom";
import { categories, getProductsByCategory, searchProducts } from "@/data/products";

const Products = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Handle URL parameters for category filtering
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const categoryParam = urlParams.get('category');

    if (categoryParam) {
      const categories = categoryParam.split(',');
      // If multiple categories are specified, show all matching products
      if (categories.length > 1) {
        setActiveCategory("Goslo Premium");
      } else {
        setActiveCategory(categories[0]);
      }
    }
  }, [location.search]);

  // Optimized filtering with useMemo for better performance
  const filteredProducts = useMemo(() => {
    let filtered = getProductsByCategory(activeCategory);
    return searchProducts(filtered, searchTerm);
  }, [activeCategory, searchTerm]);

  const clearFilters = useCallback(() => {
    setActiveCategory("All");
    setSearchTerm("");
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Products - FanIce Ice Cream</title>
        <meta name="description" content="Explore our range of premium artisanal ice cream flavors." />
      </Helmet>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <section className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-charcoal/80 max-w-2xl mx-auto leading-tight">
            Indulge in the refreshing taste you know and love, delivered fresh.
            </h1>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8 items-start sm:items-center sm:justify-between">
            {/* Search bar */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search flavors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2.5 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary text-sm bg-white"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-white"
                      : "bg-secondary/50 text-softBlack hover:bg-secondary"
                  }`}
                >
                  {category}
                </button>
              ))}

              {(activeCategory !== "All" || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="px-3 sm:px-4 py-2 rounded-full bg-gray-100 text-softBlack text-xs sm:text-sm hover:bg-gray-200 transition-colors flex items-center"
                >
                  <FilterX className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  priority={index < 4} // Priority loading for first 4 products
                  showPrice={false}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-secondary/30 rounded-lg p-8 max-w-md mx-auto"
              >
                <h3 className="font-serif text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  We couldn't find any products matching your current filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="button-primary inline-flex items-center"
                >
                  <FilterX className="w-4 h-4 mr-2" />
                  Clear all filters
                </button>
              </motion.div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Products;
