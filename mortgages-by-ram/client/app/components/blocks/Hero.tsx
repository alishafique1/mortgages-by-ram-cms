import type { TImage, TLink } from "../../types";
import { StrapiImage } from "../custom/StrapiImage";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { usePreApprovalModal } from "../../contexts/PreApprovalModalContext";

export interface IHero {
  __component: "blocks.hero";
  id: number;
  heading: string;
  text: string;
  links: TLink[];
  image: TImage | null;
}

export function Hero(props: IHero) {
  const { heading, text, links, image } = props;
  const { openModal } = usePreApprovalModal();

  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <span className="block text-white">{heading}</span>
            </h1>
            
            {/* Description */}
            <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl">
              {text}
            </p>
            
            {/* CTA Buttons */}
            {links && links.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4">
                {links.map((link, index) => {
                  // Primary button opens modal, others navigate normally
                  const isOpenModal = index === 0 || 
                    link.href === '/contact' || 
                    link.href === '#contact' ||
                    link.label?.toLowerCase().includes('pre-approved') ||
                    link.label?.toLowerCase().includes('get started') ||
                    link.label?.toLowerCase().includes('contact');
                  
                  if (isOpenModal) {
                    return (
                      <Button 
                        key={link.id} 
                        size="lg" 
                        onClick={openModal}
                        className="px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        {link.label}
                      </Button>
                    );
                  }
                  
                  return (
                    <Button 
                      key={link.id} 
                      size="lg" 
                      className="px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40"
                      asChild
                    >
                      <Link
                        to={link.href}
                        target={link.isExternal ? "_blank" : undefined}
                        rel={link.isExternal ? "noopener noreferrer" : undefined}
                      >
                        {link.label}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Image */}
          {image && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              <StrapiImage
                src={image.url}
                alt={image.alternativeText || heading}
                className="relative rounded-3xl shadow-2xl border border-white/10"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
