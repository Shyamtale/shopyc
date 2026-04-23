import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ItemCard({ product }) {
    const { dispatch } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    return (
        <Link
            to={`/product/${product.id}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary-900/10 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
        >
            <div className="relative aspect-square overflow-hidden bg-slate-100 p-4">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-slate-700 shadow-sm">
                    ${product.price}
                </div>
            </div>

            <div className="p-4 flex flex-col flex-1">
                <span className="inline-block bg-primary-100 text-primary-800 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-2 w-fit">
                    {product.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-primary-700 transition-colors">
                    {product.title}
                </h3>

                <div className="mt-auto flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-medium">
                        <Star size={14} fill="currentColor" />
                        <span>{product.rating}</span>
                    </div>
                    <button 
                        onClick={handleAddToCart}
                        className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-all active:scale-90 shadow-md"
                        title="Quick Add to Cart"
                    >
                        <ShoppingCart size={16} />
                    </button>
                </div>
            </div>
        </Link>
    );
}
