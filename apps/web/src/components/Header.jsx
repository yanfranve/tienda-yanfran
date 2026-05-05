import React, { useState, useEffect } from 'react';
import { Menu, ShoppingCart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/hooks/useCart.jsx';
import { onAuthChange, logoutUser } from '@/services/authService'; // 🔥 auth

const Header = ({ setIsCartOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // 🔥 usuario
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => {
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '/#productos' },
    { name: 'Servicios', href: '/#servicios' },
    { name: 'Contacto', href: '/#contacto' }
  ];

  const handleNavClick = (href) => {
    setIsOpen(false);

    if (href.startsWith('/#')) {
      const id = href.substring(2);

      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold gradient-text">Yanfran</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">

            {/* 🔐 LOGIN / USER */}
            {user ? (
              <>
                <span className="hidden md:block text-sm">
                  {user.email}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={logoutUser}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Iniciar sesión
              </Button>
            )}

            {/* 🛒 CARRITO */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsCartOpen(true)}
              className="relative hover:bg-muted rounded-full"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 text-[10px]">
                  {itemCount}
                </Badge>
              )}
            </Button>

            {/* 📱 MOBILE MENU */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col gap-6 mt-8">

                  {navLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => handleNavClick(link.href)}
                      className="text-lg text-left"
                    >
                      {link.name}
                    </button>
                  ))}

                  {/* 🔐 LOGIN MOBILE */}
                  {user ? (
                    <Button onClick={logoutUser}>
                      Cerrar sesión
                    </Button>
                  ) : (
                    <Button onClick={() => navigate("/login")}>
                      Iniciar sesión
                    </Button>
                  )}

                  <Button 
                    onClick={() => handleNavClick('/#productos')}
                    className="mt-4"
                  >
                    Ver Catálogo
                  </Button>

                </nav>
              </SheetContent>
            </Sheet>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;