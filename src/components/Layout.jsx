import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartOverlay from './CartOverlay';
import Footer from './Footer';

export default function Layout({ children }) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartCount } = useCart();

    return (
        <div className="min-h-screen bg-primary-50 text-slate-900 font-sans flex flex-col">
            <nav className="bg-primary-100/80 backdrop-blur-md border-b border-primary-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-primary-500 p-2 rounded-lg text-white group-hover:bg-primary-600 transition-colors shadow-lg shadow-primary-200">
                                <ShoppingBag size={20} />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-800">
                                Smart<span className="text-primary-500">Dash</span>
                            </span>
                        </Link>

                        <button 
                            onClick={() => setIsCartOpen(true)}
                            className="relative bg-white p-2.5 rounded-xl border border-primary-200 text-slate-700 hover:text-primary-600 hover:border-primary-400 transition-all shadow-sm group"
                            aria-label="Open Cart"
                        >
                            <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-primary-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-pop-in">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
                {children}
            </main>

            <Footer />
        </div>
    );
}
