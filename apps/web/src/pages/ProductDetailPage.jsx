import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ShoppingCart, CreditCard, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/useCart.jsx';
import { getProduct } from '@/api/EcommerceApi';
import { cn } from '@/lib/utils';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // 🔥 CARGAR PRODUCTO
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProduct(id);

        if (!data) throw new Error("Producto no encontrado");

        setProduct(data);

        if (data?.variants?.length > 0) {
          setSelectedVariant(data.variants[0]);
        }

        // 🔥 IMAGEN INICIAL
        if (data?.images?.length > 0) {
          setSelectedImage(data.images[0].url);
        } else {
          setSelectedImage(data.image);
        }

      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // 🔥 TODAS LAS IMÁGENES
  const images = product?.images?.length
    ? product.images.map(img => img.url)
    : [product?.image];

  // 💰 PRECIOS
  const hasSale = useMemo(() => {
    return selectedVariant?.sale_price_in_cents != null;
  }, [selectedVariant]);

  const displayPrice = useMemo(() => {
    if (!selectedVariant) return '';
    return hasSale 
      ? selectedVariant.sale_price_formatted 
      : selectedVariant.price_formatted;
  }, [selectedVariant, hasSale]);

  const originalPrice = useMemo(() => {
    if (!selectedVariant || !hasSale) return null;
    return selectedVariant.price_formatted;
  }, [selectedVariant, hasSale]);

  // 🛒 AGREGAR
  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;

    try {
      await addToCart(product, selectedVariant, quantity, selectedVariant.inventory_quantity);

      toast({
        title: "Agregado al carrito",
        description: `${product.title} (${selectedVariant.title})`,
      });

    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // 🔥 COMPRAR → AGREGA + ABRE CARRITO
  const handleBuyNow = async () => {
    if (!product || !selectedVariant) return;

    try {
      await addToCart(product, selectedVariant, quantity, selectedVariant.inventory_quantity);

      window.dispatchEvent(new CustomEvent("add-to-cart", {
        detail: { id: product.id }
      }));

    } catch (error) {
      console.error(error);
    }
  };

  // ⏳ LOADING
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <Skeleton className="h-10 w-1/2 mb-6" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  // ❌ ERROR
  if (error || !product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-red-500">Producto no encontrado</h2>
        <Button onClick={() => navigate('/')}>Volver</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.title}</title>
      </Helmet>

      <div className="container mx-auto px-4 py-10">

        <Button onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver
        </Button>

        <div className="grid md:grid-cols-2 gap-10">

          {/* 🔥 GALERÍA PRO */}
          <div className="space-y-4">

            {/* IMAGEN PRINCIPAL */}
            <div className="aspect-square overflow-hidden rounded-xl border">
              <img
                src={selectedImage}
                className="w-full h-full object-cover hover:scale-110 transition duration-500 cursor-zoom-in"
              />
            </div>

            {/* MINIATURAS */}
            <div className="flex gap-3 overflow-x-auto">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    selectedImage === img
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                />
              ))}
            </div>

          </div>

          {/* INFO */}
          <div>

            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

            <div className="mb-4">
              <span className="text-2xl font-bold">{displayPrice}</span>
              {originalPrice && (
                <span className="ml-2 line-through text-gray-500">
                  {originalPrice}
                </span>
              )}
            </div>

            <p className="mb-6">{product.description}</p>

            {/* 🎨 VARIANTES */}
            {product.variants?.length > 1 && (
              <div className="mb-6">
                <p className="mb-2 font-semibold">Selecciona variante:</p>

                <div className="flex gap-2 flex-wrap">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={cn(
                        "px-4 py-2 border rounded-lg",
                        selectedVariant?.id === variant.id
                          ? "border-primary bg-primary/10"
                          : "border-gray-300"
                      )}
                    >
                      {variant.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 🔢 CANTIDAD */}
            <div className="mb-6 flex items-center gap-4">
              <span>Cantidad:</span>

              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            {/* 🛒 BOTONES */}
            <div className="flex gap-4">
              <Button onClick={handleAddToCart}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Agregar
              </Button>

              <Button onClick={handleBuyNow}>
                <CreditCard className="w-4 h-4 mr-2" />
                Comprar ahora
              </Button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;