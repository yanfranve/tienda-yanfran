import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = ({ 
  id,
  image, 
  name, 
  originalPrice, 
  discountedPrice, 
  urgencyText = 'Últimas unidades',
  onBuyClick,
  variants = []
}) => {

  const navigate = useNavigate();

  const hasVariants = variants.length > 1;

  const discountPercentage = originalPrice && discountedPrice 
    ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
    : 0;

  // 🔥 segunda imagen (hover)
  const secondImage = variants?.[1]?.image || image;

  const handleBuy = (e) => {
    e.stopPropagation();

    if (hasVariants) {
      navigate(`/product/${id}`);
    } else {
      if (onBuyClick) {
        onBuyClick(id);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >

      {/* LINK → imagen + nombre */}
      <Link to={`/product/${id}`} className="block">

        <div className="relative overflow-hidden aspect-square">

          {/* Imagen principal */}
          <img 
            src={image}
            alt={name}
            className="w-full h-full object-cover absolute inset-0 group-hover:opacity-0 transition duration-500"
          />

          {/* Imagen hover */}
          <img 
            src={secondImage}
            alt={name}
            className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
          />

          {/* Descuento */}
          {discountPercentage > 0 && (
            <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground font-bold">
              -{discountPercentage}%
            </Badge>
          )}

          {/* Urgencia */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-accent text-accent-foreground gap-1">
              <Zap className="w-3 h-3" />
              {urgencyText}
            </Badge>
          </div>

        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-3 text-card-foreground leading-snug hover:underline cursor-pointer">
            {name}
          </h3>
        </div>

      </Link>

      {/* PRECIO + BOTÓN */}
      <div className="px-6 pb-6 flex flex-col flex-grow">

        <div className="flex items-baseline gap-2 mb-4">
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice.toLocaleString('es-CL')}
            </span>
          )}
          <span className="text-2xl font-bold gradient-text">
            ${discountedPrice.toLocaleString('es-CL')}
          </span>
        </div>

        <div className="mt-auto">
          <Button 
            onClick={handleBuy}
            className="w-full gradient-primary text-white font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-200"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {hasVariants ? "Elegir opciones" : "Comprar ahora"}
          </Button>
        </div>

      </div>

    </motion.div>
  );
};

export default ProductCard;