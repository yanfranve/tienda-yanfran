import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/firebase/config.js";
import { useCart } from '@/hooks/useCart.jsx';
import ProductCard from '@/components/ProductCard.jsx';

const ProductsList = ({ setIsCartOpen }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const q = query(
          collection(db, "products_store"),
          where("active", "==", true),
          limit(8)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map(doc => {
          const product = doc.data();

          return {
            id: doc.id,
            title: product.name,
            image: product.images?.[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
            ribbon_text: null,

            // 🔥 Variantes reales desde Firebase
            variants: (product.variants || []).map(variant => ({
              id: variant.id,
              price_in_cents: variant.price * 100,
              sale_price_in_cents: null,
              inventory_quantity: variant.stock,
              size: variant.size,
              color: variant.color
            }))
          };
        });

        setProducts(data);

      } catch (err) {
        setError(err.message || "Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔄 LOADING
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Cargando catálogo...</p>
      </div>
    );
  }

  // ❌ ERROR
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

  // 📦 VACÍO
  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-muted rounded-2xl border border-border">
        <p className="text-muted-foreground">No hay productos disponibles.</p>
      </div>
    );
  }

  // 🛒 LISTA
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product, index) => {

        const defaultVariant = product.variants?.[0];

        if (!defaultVariant) return null;

        const originalPrice = defaultVariant.price_in_cents / 100;

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
              image={product.image}
              name={product.title}
              originalPrice={null}
              discountedPrice={originalPrice}
              urgencyText={
                defaultVariant.inventory_quantity < 5
                  ? 'Últimas unidades'
                  : 'Disponible'
              }

              variants={product.variants}

              onBuyClick={async () => {
                await addToCart(
                  product,
                  defaultVariant,
                  1,
                  defaultVariant.inventory_quantity
                );

                // 🔥 abrir carrito
                window.dispatchEvent(new CustomEvent("add-to-cart", {
                  detail: { id: product.id }
                }));

                if (setIsCartOpen) setIsCartOpen(true);
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProductsList;