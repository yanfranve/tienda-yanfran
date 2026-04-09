
import React from 'react';
import { Mail, MessageCircle, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Productos', href: '#productos' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Contacto', href: '#contacto' }
  ];

  const legalLinks = [
    { name: 'Política de privacidad', href: '#' },
    { name: 'Términos de servicio', href: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  const handleLinkClick = (href) => {
    if (href.startsWith('#') && href !== '#') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <span className="text-2xl font-bold gradient-text">Yanfran</span>
            <p className="mt-4 text-sm opacity-80 leading-relaxed">
              Soluciones digitales y productos de calidad para impulsar tu negocio en Chile.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <span className="font-semibold text-lg mb-4 block">Enlaces rápidos</span>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span className="font-semibold text-lg mb-4 block">Contacto</span>
            <div className="space-y-3">
              <a 
                href="mailto:contacto@yanfran.cl" 
                className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
                contacto@yanfran.cl
              </a>
              <a 
                href="https://wa.me/56912345678" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                +56 9 1234 5678
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-muted/20 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-70">
            © {currentYear} Yanfran. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm opacity-70 hover:opacity-100 hover:text-accent transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
