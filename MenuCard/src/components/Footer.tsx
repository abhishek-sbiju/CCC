import { Instagram, MapPin, Phone, Clock, Mail, ArrowRight } from "lucide-react";

const primaryTel = "+918551894992";
const telDisplayPrimary = "+91 85518 94992";
const telDisplaySecondary = "+91 95611 59994";

const Footer = () => {
  return (
    <footer
      className="relative border-t border-white/10 mt-12 pt-20 pb-10 px-6 md:px-12 lg:px-20 text-center md:text-left overflow-hidden"
      style={{ background: "hsl(100 25% 16%)" }}
    >
      {/* Subtle leaf-vein pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.1) 40px,
            rgba(255,255,255,0.1) 41px
          )`,
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="font-heading text-2xl font-bold uppercase tracking-[0.14em] text-white/90 mb-2">
            Cafe Chai Coffee
          </h2>
          <p className="font-heading text-sm md:text-base text-gold-light/90 tracking-wide mb-6">
            {"Goa's Ultimate Bar & Restaurant Experience"}
          </p>
          <a
            href={`tel:${primaryTel}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gold/50 text-gold text-xs tracking-[0.15em] font-body font-semibold hover:bg-gold hover:text-black transition-all duration-300 mb-6"
          >
            Book a Table
            <ArrowRight size={14} className="shrink-0" aria-hidden />
          </a>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-gold hover:text-gold hover:scale-110 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Reach Us */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-heading text-sm font-semibold tracking-[0.25em] text-gold mb-5 uppercase">
            Reach Us
          </h3>
          <ul className="space-y-4 font-body text-sm text-white/50 flex flex-col items-center md:items-start">
            <li className="flex items-start gap-3 text-left max-w-sm">
              <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
              <span>
                Lane No.3, Upper Orchard, Near MES College Rd, Dabolim, Goa — 403726
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-gold shrink-0 mt-0.5" />
              <div className="flex flex-col text-left gap-1">
                <a href={`tel:${primaryTel}`} className="hover:text-gold transition-colors duration-300">
                  {telDisplayPrimary}
                </a>
                <a href="tel:+919561159994" className="hover:text-gold transition-colors duration-300">
                  {telDisplaySecondary}
                </a>
                <span className="text-white/40 pt-1">
                  Contact us:{" "}
                  <a href={`tel:${primaryTel}`} className="hover:text-gold transition-colors duration-300">
                    8551894992
                  </a>
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={18} className="text-gold shrink-0 mt-0.5" />
              <a
                href="mailto:info@cafechaicoffee.com"
                className="hover:text-gold transition-colors duration-300 break-all"
              >
                info@cafechaicoffee.com
              </a>
            </li>
          </ul>
        </div>

        {/* Opening hours */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-heading text-sm font-semibold tracking-[0.25em] text-gold mb-5 uppercase">
            Opening Hours
          </h3>
          <ul className="space-y-3 font-body text-sm text-white/50 flex flex-col items-center md:items-start">
            <li className="flex items-start gap-3 text-left">
              <Clock size={18} className="text-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-white/80">Open All Days</p>
                <p className="mt-1">10:00 AM — 11:00 PM</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 font-body text-[11px] text-white/25 tracking-wider">
        <p>© {new Date().getFullYear()} Cafe Chai Coffee. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gold/70 transition-colors duration-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gold/70 transition-colors duration-300">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
