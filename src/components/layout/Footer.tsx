import { Link } from 'react-router-dom';
import { AmazonLogo } from '../ui/AmazonLogo';
import { Globe } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-12 bg-[#232f3e] text-white text-xs select-none">
      {/* ── Back to Top Bar (#37475a) ────────────────────────────────────── */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#37475a] hover:bg-[#485769] text-white text-center py-3.5 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
      >
        Back to top
      </button>

      {/* ── Main Links Columns (#232f3e) ─────────────────────────────────── */}
      <div className="max-w-[1000px] mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold text-sm mb-3">Get to Know Us</h4>
            <ul className="space-y-2 text-[#dddddd]">
              <li><a href="#" className="hover:underline">About Amazon</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Press Releases</a></li>
              <li><a href="#" className="hover:underline">Amazon Science</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">Connect with Us</h4>
            <ul className="space-y-2 text-[#dddddd]">
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
              <li><a href="#" className="hover:underline">Instagram</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">Make Money with Us</h4>
            <ul className="space-y-2 text-[#dddddd]">
              <li><a href="#" className="hover:underline">Sell on Amazon</a></li>
              <li><a href="#" className="hover:underline">Sell under Amazon Accelerator</a></li>
              <li><a href="#" className="hover:underline">Protect and Build Your Brand</a></li>
              <li><a href="#" className="hover:underline">Amazon Global Selling</a></li>
              <li><a href="#" className="hover:underline">Become an Affiliate</a></li>
              <li><a href="#" className="hover:underline">Fulfilment by Amazon</a></li>
              <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
              <li><a href="#" className="hover:underline">Amazon Pay on Merchants</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-3">Let Us Help You</h4>
            <ul className="space-y-2 text-[#dddddd]">
              <li><Link to="/orders" className="hover:underline">Your Account</Link></li>
              <li><Link to="/orders" className="hover:underline">Returns Centre</Link></li>
              <li><a href="#" className="hover:underline">Recalls and Product Safety Alerts</a></li>
              <li><a href="#" className="hover:underline">100% Purchase Protection</a></li>
              <li><a href="#" className="hover:underline">Amazon App Download</a></li>
              <li><a href="#" className="hover:underline">Help</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Mid Language / Country Bar ───────────────────────────────────── */}
      <div className="border-t border-[#3a4553] py-8">
        <div className="max-w-[1000px] mx-auto px-4 flex flex-wrap items-center justify-center gap-6">
          <Link to="/">
            <AmazonLogo className="h-6" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 border border-[#848688] rounded-[3px] text-xs text-[#cccccc] cursor-pointer hover:border-white">
              <Globe className="w-3.5 h-3.5" />
              <span>English</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 border border-[#848688] rounded-[3px] text-xs text-[#cccccc] cursor-pointer hover:border-white">
              <span>🇮🇳</span>
              <span>India</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sub-footer (#131921) ─────────────────────────────────────────── */}
      <div className="bg-[#131921] py-8 text-[#999999]">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-[11px] mb-8 leading-tight">
            <div>
              <p className="text-white font-bold">AbeBooks</p>
              <p className="text-[#999999]">Books, art & collectibles</p>
            </div>
            <div>
              <p className="text-white font-bold">Amazon Web Services</p>
              <p className="text-[#999999]">Scalable Cloud Computing Services</p>
            </div>
            <div>
              <p className="text-white font-bold">Audible</p>
              <p className="text-[#999999]">Download Audio Books</p>
            </div>
            <div>
              <p className="text-white font-bold">IMDb</p>
              <p className="text-[#999999]">Movies, TV & Celebrities</p>
            </div>
            <div>
              <p className="text-white font-bold">Shopbop</p>
              <p className="text-[#999999]">Designer Fashion Brands</p>
            </div>
            <div>
              <p className="text-white font-bold">Amazon Business</p>
              <p className="text-[#999999]">Everything For Your Business</p>
            </div>
            <div>
              <p className="text-white font-bold">Prime Now</p>
              <p className="text-[#999999]">2-Hour Delivery on Everyday Items</p>
            </div>
            <div>
              <p className="text-white font-bold">Amazon Prime Music</p>
              <p className="text-[#999999]">100 million songs, ad-free</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#dddddd] mb-2">
            <a href="#" className="hover:underline">Conditions of Use & Sale</a>
            <a href="#" className="hover:underline">Privacy Notice</a>
            <a href="#" className="hover:underline">Interest-Based Ads</a>
          </div>
          <p className="text-center text-[11px] text-[#999999]">
            © 1996-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates
          </p>
        </div>
      </div>
    </footer>
  );
}
