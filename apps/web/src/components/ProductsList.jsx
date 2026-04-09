import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProducts, getProductQuantities } from '@/api/EcommerceApi';
import { useCart } from '@/hooks/useCart.jsx'; // 🔥 IMPORTANTE
import ProductCard from '@/components/ProductCard.jsx';

const ProductsList = ({ setIsCartOpen }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { addToCart } = useCart(); // 🔥 IMPORTANTE

  useEffect(() => {
    const fetchProductsWithQuantities = async () => {
      try {
        setLoading(true);
        setError(null);

        const productsResponse = await getProducts({ limit: 8 });

        if (productsResponse.products.length === 0) {
          setProducts([]);
          return;
        }

        const productIds = productsResponse.products.map(product => product.id);

        const quantitiesResponse = await getProductQuantities({
          fields: 'inventory_quantity',
          product_ids: productIds
        });

        const variantQuantityMap = new Map();
        quantitiesResponse.variants.forEach(variant => {
          variantQuantityMap.set(variant.id, variant.inventory_quantity);
        });

        const productsWithQuantities = productsResponse.products.map(product => ({
          ...product,
          variants: product.variants.map(variant => ({
            ...variant,
            inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity
          }))
        }));

        setProducts(productsWithQuantities);
      } catch (err) {
        setError(err.message || 'Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProductsWithQuantities();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Cargando catálogo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-destructive/10 rounded-2xl border border-destructive/20">
        <p className="text-destructive font-medium mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="text-sm underline hover:text-destructive/80"
        >
          Intentar nuevamente
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-muted rounded-2xl border border-border">
        <p className="text-muted-foreground">No hay productos disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product, index) => {

        const defaultVariant = product.variants[0];

        const originalPrice = defaultVariant?.price_in_cents 
          ? defaultVariant.price_in_cents / 100 
          : null;

        const discountedPrice = defaultVariant?.sale_price_in_cents 
          ? defaultVariant.sale_price_in_cents / 100 
          : originalPrice;

        const finalOriginalPrice = defaultVariant?.sale_price_in_cents 
          ? originalPrice 
          : null;

        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard
              id={product.id}
              image={product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"}
              name={product.title}
              originalPrice={finalOriginalPrice}
              discountedPrice={discountedPrice}
              urgencyText={
                product.ribbon_text || 
                (defaultVariant?.inventory_quantity < 5 
                  ? 'Últimas unidades' 
                  : 'Disponible')
              }

              // 🔥 CLAVE PARA BOTÓN INTELIGENTE
              variants={product.variants}

              // 🔥 COMPRA REAL
              onBuyClick={async () => {
                if (!defaultVariant) return;

                await addToCart(
                  product,
                  defaultVariant,
                  1,
                  defaultVariant.inventory_quantity
                );

                // 🔥 abre carrito
                window.dispatchEvent(new CustomEvent("add-to-cart", {
                  detail: { id: product.id }
                }));
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProductsList;