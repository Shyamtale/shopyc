import { ShoppingBag, Facebook, Twitter, Instagram, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 pt-16 pb-8 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6 group">
                            <div className="bg-primary-500 p-2 rounded-lg text-white">
                                <ShoppingBag size={20} />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-800">
                                Smart<span className="text-primary-500">Dash</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            Simplifying your shopping experience with the best curated products from around the world. Quality and style at your fingertips.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Shop</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><Link to="/" className="hover:text-primary-600 transition-colors">All Products</Link></li>
                            <li><a href="#" className="hover:text-primary-600 transition-colors">Featured Items</a></li>
                            <li><a href="#" className="hover:text-primary-600 transition-colors">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-primary-600 transition-colors">Discounts</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-primary-600 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-primary-600 transition-colors">FAQs</a></li>
                            <li><a href="#" className="hover:text-primary-600 transition-colors">Shipping Policy</a></li>
                            <li><a href="#" className="hover:text-primary-600 transition-colors">Returns</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Stay Updated</h4>
                        <p className="text-sm text-slate-500 mb-4">Subscribe to our newsletter for the latest updates and deals.</p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Your email"
                                className="bg-slate-50 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none w-full"
                            />
                            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">
                        © 2026 SmartDash Commerce. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-xs text-slate-400 font-medium">
                        <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-slate-600 transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
