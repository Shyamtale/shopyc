import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Star, ShoppingCart, Loader2, AlertCircle } from 'lucide-react';

export default function Details() {
    const { id } = useParams();
    const { dispatch } = useCart();
    const { data: product, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 size={40} className="animate-spin text-primary-600" />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="text-center py-20">
                <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h2>
                <Link to="/" className="text-primary-600 hover:underline">
                    Back to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto animation-fade-in">
            <Link
                to="/"
                className="inline-flex items-center text-slate-500 hover:text-primary-600 transition-colors mb-8 group"
            >
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Products
            </Link>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden md:flex">
                {/* Image Section */}
                <div className="md:w-1/2 bg-slate-50 p-8 flex items-center justify-center">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="max-h-[400px] object-contain mix-blend-multiply transition-transform hover:scale-105 duration-500"
                    />
                </div>

                {/* Info Section */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <span className="text-primary-600 font-bold tracking-wider uppercase text-xs mb-2">
                        {product.category}
                    </span>
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.title}</h1>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full text-amber-600 font-bold border border-amber-100">
                            <Star size={16} fill="currentColor" />
                            <span>{product.rating}</span>
                        </div>
                        <span className="text-slate-400">|</span>
                        <span className="text-slate-500 text-sm font-medium">{product.stock} in stock</span>
                    </div>

                    <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                        {product.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-8 border-t border-slate-100">
                        <div>
                            <p className="text-slate-400 text-xs font-semibold uppercase mb-1">Price</p>
                            <span className="text-3xl font-bold text-slate-900">${product.price}</span>
                        </div>

                        <button 
                            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold transition-all transform active:scale-95 shadow-lg shadow-primary-200"
                        >
                            <ShoppingCart size={20} />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
