
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Shield, Headphones, Package, Monitor, Smartphone, Sparkles, MessageCircle } from 'lucide-react';
import ProductsList from '@/components/ProductsList.jsx';
import ServiceCard from '@/components/ServiceCard.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';
import { Button } from '@/components/ui/button';


const HomePage = ({ setIsCartOpen }) => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Monitor,
      title: 'Diseño web profesional',
      description: 'Creamos sitios web modernos y responsivos que convierten visitantes en clientes. Diseño personalizado adaptado a tu marca.',
      whatsappLink: 'https://wa.me/56912345678?text=Hola,%20me%20interesa%20el%20servicio%20de%20diseño%20web'
    },
    {
      icon: Smartphone,
      title: 'Desarrollo de aplicaciones',
      description: 'Desarrollamos apps móviles y web que impulsan tu negocio. Soluciones escalables con tecnología de vanguardia.',
      whatsappLink: 'https://wa.me/56912345678?text=Hola,%20me%20interesa%20el%20desarrollo%20de%20apps'
    },
    {
      icon: Sparkles,
      title: 'Soluciones digitales a medida',
      description: 'Automatización, integración de sistemas y consultoría digital. Transformamos tus procesos para mayor eficiencia.',
      whatsappLink: 'https://wa.me/56912345678?text=Hola,%20necesito%20una%20solución%20digital%20personalizada'
    }
  ];

  const testimonials = [
    {
      name: 'Camila Rojas',
      avatar: '',
      rating: 5,
      text: 'Excelente servicio. Los productos llegaron rápido y en perfecto estado. El soporte por WhatsApp es muy atento.'
    },
    {
      name: 'Diego Fernández',
      avatar: '',
      rating: 5,
      text: 'Contraté el diseño web y superó mis expectativas. Profesionales, rápidos y con muy buena comunicación.'
    },
    {
      name: 'Valentina Silva',
      avatar: '',
      rating: 5,
      text: 'Los audífonos que compré son increíbles. Muy buena calidad por el precio. Totalmente recomendado.'
    },
    {
      name: 'Matías Contreras',
      avatar: '',
      rating: 5,
      text: 'Me ayudaron a crear la app de mi negocio. El equipo es muy profesional y cumplieron todos los plazos.'
    }
  ];

  const benefits = [
    { icon: Zap, text: 'Entrega rápida en Chile' },
    { icon: Shield, text: 'Pago seguro' },
    { icon: Headphones, text: 'Soporte por WhatsApp' },
    { icon: Package, text: 'Productos probados' }
  ];

  const scrollToProducts = () => {
    const element = document.getElementById('productos');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Yanfran - Soluciones digitales y productos de calidad en Chile</title>
        <meta name="description" content="Impulsa tu negocio con productos de calidad y servicios digitales profesionales. Entrega rápida en Chile, pago seguro y soporte por WhatsApp." />
             
      </Helmet>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1562600484-c6ef0ffe27a2?w=1920&q=80" 
            alt="Tecnología moderna"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
              Impulsa tu negocio con<br />
              <span className="gradient-text">soluciones digitales</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Productos de calidad y servicios profesionales para emprendedores chilenos que buscan crecer
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={scrollToProducts}
                size="lg"
                className="gradient-primary text-white font-semibold text-lg px-8 py-6 hover:opacity-90 active:scale-[0.98] transition-all duration-200"
              >
                Ver Catálogo
              </Button>
              <Button 
                onClick={() => window.open('https://wa.me/56912345678', '_blank')}
                size="lg"
                className="bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold text-lg px-8 py-6 active:scale-[0.98] transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Hablar por WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problema Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              ¿Cansado de perder tiempo, dinero o no encontrar soluciones efectivas?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Sabemos lo frustrante que es buscar productos de calidad a buen precio o servicios digitales confiables. 
              Por eso creamos Yanfran: tu aliado para crecer sin complicaciones.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solución Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              La solución que necesitas
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              En Yanfran ofrecemos productos tecnológicos cuidadosamente seleccionados con entrega rápida en Chile, 
              y servicios digitales profesionales para llevar tu negocio al siguiente nivel. Todo con soporte personalizado 
              por WhatsApp para que nunca estés solo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <p className="font-semibold text-card-foreground">{benefit.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados Section */}
      <section id="productos" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Catálogo de Productos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tecnología de calidad a precios increíbles. Stock limitado.
            </p>
          </motion.div>

        <ProductsList setIsCartOpen={setIsCartOpen} />
        </div>
      </section>

      {/* Servicios Digitales Section */}
      <section id="servicios" className="py-24 bg-muted border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Servicios digitales profesionales
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transformamos tu visión en realidad con soluciones tecnológicas a medida
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                whatsappLink={service.whatsappLink}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Más de 200 clientes satisfechos en Chile
            </p>
          </motion.div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                avatar={testimonial.avatar}
                rating={testimonial.rating}
                text={testimonial.text}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Urgencia Banner */}
      <section className="py-16 gradient-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Oferta limitada - Stock bajo
            </h3>
            <p className="text-lg text-white/90 mb-6">
              No te quedes sin tu producto favorito. Aprovecha los descuentos antes de que se agoten.
            </p>
            <Button 
              onClick={scrollToProducts}
              size="lg"
              className="bg-white text-primary font-semibold hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
            >
              Ver productos ahora
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contacto" className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-card-foreground">
              ¿Listo para dar el siguiente paso?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Únete a cientos de emprendedores chilenos que ya confían en Yanfran para crecer. 
              Compra productos de calidad o contrata nuestros servicios digitales hoy mismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={scrollToProducts}
                size="lg"
                className="gradient-primary text-white font-semibold text-lg px-8 py-6 hover:opacity-90 active:scale-[0.98] transition-all duration-200"
              >
                Ver Catálogo
              </Button>
              <Button 
                onClick={() => window.open('https://wa.me/56912345678', '_blank')}
                size="lg"
                className="bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold text-lg px-8 py-6 active:scale-[0.98] transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contactar por WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <FloatingWhatsAppButton />
    </>
  );
};

export default HomePage;
