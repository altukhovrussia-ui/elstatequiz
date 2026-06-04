import { Instagram, Send, Phone } from 'lucide-react';
import elstateLogo from '../assets/elstate-logo.svg';

export function Footer() {
  return (
    <footer className="bg-brand-beige-light py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Main row: logo left, socials right */}
        <div className="flex items-center justify-between mb-8">
          <img
            src={elstateLogo}
            alt="Elstate"
            className="h-5 md:h-6"
          />
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com/elstate_dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gray hover:text-brand-gold transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://t.me/elstate_dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gray hover:text-brand-gold transition-colors"
            >
              <Send className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/message"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gray hover:text-brand-gold transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="w-full h-px bg-black/10 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-brand-gray text-xs tracking-wider">
            © 2026 ELSTATE. All rights reserved.
          </span>
          <div className="flex items-center gap-4 text-brand-gray text-xs">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-black transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
