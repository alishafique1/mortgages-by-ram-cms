import { Link, useLoaderData } from "react-router";
import { getPages, getGlobal } from "../../lib/api";
import { handleApiError } from "../../lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { usePreApprovalModal } from "../../contexts/PreApprovalModalContext";

export async function navigationLoader() {
  try {
    const globalResponse = await getGlobal();
    handleApiError(globalResponse, "global");
    
    return {
      pages: [], // No pages content type exists in Strapi
      global: globalResponse?.data || null,
    };
  } catch (error) {
    console.error("Error loading navigation data:", error);
    return {
      pages: [],
      global: null,
    };
  }
}

export function Navigation() {
  const data = useLoaderData<typeof navigationLoader>();
  const pages = data?.pages || [];
  const global = data?.global || null;
  const siteName = global?.title || "Mortgages by Ram";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal } = usePreApprovalModal();

  // Get navigation data from Strapi Global
  const header = global?.header;
  const logo = header?.logo;
  const navItems = header?.navItems || [];
  const cta = header?.cta;

  // Handle opening pre-approval modal
  const handleOpenModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openModal();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-background shadow-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to={logo?.href || "/"} 
            className="text-xl font-bold text-foreground hover:text-primary transition-colors flex items-center"
          >
            {logo?.image?.url ? (
              <img 
                src={logo.image.url} 
                alt={logo.image.alternativeText || logo.label || siteName}
                className="h-8 w-auto mr-2"
              />
            ) : (
              logo?.label || siteName
            )}
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Dynamic Navigation Items from Strapi */}
            {navItems.map((item: any, index: number) => (
              <Link
                key={index}
                to={item.href}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Fallback Navigation Items if Strapi data is empty */}
            {navItems.length === 0 && (
              <>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/articles"
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  Articles
                </Link>
              </>
            )}
            
            {/* CTA Button from Strapi */}
            {cta && (
              <a
                href="#"
                onClick={handleOpenModal}
                className={`px-4 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                  cta.isButtonLink 
                    ? `${
                        cta.type === 'PRIMARY' 
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                      }` 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {cta.label}
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {/* Dynamic Mobile Navigation Items from Strapi */}
              {navItems.map((item: any, index: number) => (
                <Link
                  key={index}
                  to={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Fallback Mobile Navigation Items if Strapi data is empty */}
              {navItems.length === 0 && (
                <>
                  <Link
                    to="/"
                    className="text-muted-foreground hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/articles"
                    className="text-muted-foreground hover:text-primary transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Articles
                  </Link>
                </>
              )}
              
              {/* Mobile CTA Button */}
              {cta && (
                <a
                  href="#"
                  onClick={handleOpenModal}
                  className={`px-4 py-2 rounded-md font-medium transition-colors text-center cursor-pointer ${
                    cta.isButtonLink 
                      ? `${
                          cta.type === 'PRIMARY' 
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                        }` 
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {cta.label}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}