
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SuccessPage = () => {
  return (
    <>
      <Helmet>
        <title>¡Compra Exitosa! - Yanfran</title>
        <meta name="description" content="Tu compra se ha realizado con éxito." />
      </Helmet>

      <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full bg-card rounded-2xl shadow-xl border border-border p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-card-foreground mb-4">
            ¡Gracias por tu compra!
          </h1>
          
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Tu pedido ha sido procesado correctamente. Te enviaremos un correo electrónico con los detalles y la información de seguimiento muy pronto.
          </p>

          <div className="bg-muted rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              ¿Qué sigue ahora?
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2 mt-4">
              <li>1. Recibirás confirmación por email.</li>
              <li>2. Prepararemos tu pedido para el envío.</li>
              <li>3. Te notificaremos cuando esté en camino.</li>
            </ul>
          </div>

          <Button asChild className="w-full gradient-primary text-white font-semibold py-6 text-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200">
            <Link to="/">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver a la tienda
            </Link>
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default SuccessPage;
