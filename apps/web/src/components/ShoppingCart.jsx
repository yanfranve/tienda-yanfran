
import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart as ShoppingCartIcon, X, Trash2, Loader2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart.jsx';
import { Button } from '@/components/ui/button';
import { initializeCheckout } from '@/api/EcommerceApi';
import { useToast } from '@/hooks/use-toast';

const ShoppingCart = ({ isCartOpen, setIsCartOpen }) => {
  const { toast } = useToast();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = useCallback(async () => {
    if (cartItems.length === 0) {
      toast({
        title: 'Tu carrito está vacío',
        description: 'Agrega algunos productos antes de proceder al pago.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsCheckingOut(true);
      const items = cartItems.map(item => ({
        variant_id: item.variant.id,
        quantity: item.quantity,
      }));

      const successUrl = `${window.location.origin}/success`;
      const cancelUrl = window.location.href;

      const { url } = await initializeCheckout({ items, successUrl, cancelUrl });

      clearCart();
      window.location.href = url;
    } catch (error) {
      toast({
        title: 'Error al procesar',
        description: 'Hubo un problema al iniciar el pago. Por favor intenta nuevamente.',
        variant: 'destructive',
      });
      setIsCheckingOut(false);
    }
  }, [cartItems, clearCart, toast]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card text-card-foreground shadow-2xl flex flex-col z-50 border-l border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3">
                <ShoppingCartIcon className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Tu Carrito</h2>
              </div>
              <Button onClick={() => setIsCartOpen(false)} variant="ghost" size="icon" className="rounded-full hover:bg-muted">
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex-grow p-6 overflow-y-auto space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                    <ShoppingCartIcon size={32} className="text-muted-foreground/50" />
                  </div>
                  <p className="text-lg font-medium text-foreground mb-2">Tu carrito está vacío</p>
                  <p className="text-sm">¡Explora nuestros productos y encuentra lo que necesitas!</p>
                  <Button 
                    onClick={() => setIsCartOpen(false)} 
                    variant="outline" 
                    className="mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Seguir comprando
                  </Button>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.variant.id} className="flex gap-4 bg-background border border-border p-4 rounded-xl shadow-sm">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img 
                        src={item.product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80"} 
                        alt={item.product.title} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground line-clamp-2 leading-tight text-sm mb-1">
                          {item.product.title}
                        </h3>
                        {item.variant.title !== "Default Title" && (
                          <div className="inline-flex items-center px-2 py-0.5 mt-1.5 rounded bg-secondary/50 text-xs text-secondary-foreground">
                            <span className="font-semibold mr-1">Color/Var:</span> {item.variant.title}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-sm font-bold gradient-text">
                          {item.variant.sale_price_formatted || item.variant.price_formatted}
                        </p>
                        <div className="flex items-center border border-border rounded-lg bg-muted/50">
                          <button 
                            onClick={() => updateQuantity(item.variant.id, Math.max(1, item.quantity - 1))} 
                            className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            -
                          </button>
                          <span className="px-2 text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.variant.id, item.quantity + 1)} 
                            className="px-2 py-1 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.variant.id)} 
                      className="text-muted-foreground hover:text-destructive transition-colors p-1 h-fit"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-border bg-muted/30">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{getCartTotal()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Envío</span>
                    <span>Calculado en el pago</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-border">
                    <span className="text-base font-medium text-foreground">Total</span>
                    <span className="text-2xl font-bold gradient-text">{getCartTotal()}</span>
                  </div>
                </div>
                <Button 
                  onClick={handleCheckout} 
                  disabled={isCheckingOut}
                  className="w-full gradient-primary text-white font-semibold py-6 text-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/20"
                >
                  {isCheckingOut ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : null}
                  Proceder al pago
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
