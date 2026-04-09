
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServiceCard = ({ icon: Icon, title, description, whatsappLink }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full border border-border"
    >
      <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-white" />
      </div>
      
      <h3 className="text-2xl font-semibold mb-4 text-card-foreground">
        {title}
      </h3>
      
      <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
        {description}
      </p>

      <Button 
        onClick={() => window.open(whatsappLink, '_blank')}
        className="w-full bg-whatsapp hover:bg-whatsapp-dark text-white active:scale-[0.98] transition-all duration-200"
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        Hablar por WhatsApp
      </Button>
    </motion.div>
  );
};

export default ServiceCard;
