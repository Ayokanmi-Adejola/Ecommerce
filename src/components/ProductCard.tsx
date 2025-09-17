
import { memo } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index: number;
  priority?: boolean;
  showPrice?: boolean;
}

const ProductCard = memo(({ product, priority = false, showPrice = true }: ProductCardProps) => {
  // Check if this is a featured product (for homepage display)
  const isFeaturedDisplay = product.id <= 6 && product.price === 0;

  const imageProps = {
    src: product.image,
    alt: product.name,
    className: "absolute inset-0 w-full h-full object-contain transition-transform duration-300 group-hover:scale-105",
    loading: (priority ? "eager" : "lazy") as "eager" | "lazy",
    decoding: "async" as const,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
    ...(priority && { fetchPriority: "high" as const }),
  };

  const content = (
    <>
      <div className="relative pb-[90%] bg-mint/10 p-4">
        <img {...imageProps} />
        {product.featured && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-white text-xs font-medium uppercase tracking-wide rounded-full z-10 shadow-sm">
            Premium
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-serif text-base font-semibold text-softBlack group-hover:text-primary transition-colors duration-300 mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-4 leading-normal">
          {product.description}
        </p>
        {!isFeaturedDisplay && showPrice && (
          <div className="mt-3 sm:mt-4">
            <span className="text-base sm:text-lg font-semibold text-primary">
              ₦{product.price.toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {isFeaturedDisplay ? (
        <div className="block">{content}</div>
      ) : (
        <Link to={`/products/${product.id}`} className="block">
          {content}
        </Link>
      )}
    </div>
  );
});

export default ProductCard;
