
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TestimonialCard = ({ name, avatar, rating = 5, text, delay = 0 }) => {
  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-card rounded-xl p-6 shadow-md border border-border break-inside-avoid mb-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="w-12 h-12 rounded-xl">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="rounded-xl bg-primary text-primary-foreground font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-card-foreground">{name}</p>
          <div className="flex gap-0.5">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-accent text-accent" />
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-muted-foreground leading-relaxed">
        "{text}"
      </p>
    </motion.div>
  );
};

export default TestimonialCard;
