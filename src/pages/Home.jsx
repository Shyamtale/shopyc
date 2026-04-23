import { useMemo, useEffect, useState } from 'react';
import { useSearch } from '../context/SearchContext';
import { useFetch } from '../hooks/useFetch';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import ItemCard from '../components/ItemCard';
import Pagination from '../components/Pagination';
import { Loader2, AlertCircle, ArrowRight, Zap, ShieldCheck, Truck } from 'lucide-react';

export default function Home() {
    const { state, dispatch } = useSearch();
    const [categories, setCategories] = useState([]);

    // 1. Fetch Data based on Search Query (Debounced in Context)
    // We fetch a larger limit to handle client-side filtering/sorting efficiently for this demo
    const endpoint = state.searchQuery
        ? `https://dummyjson.com/products/search?q=${state.searchQuery}&limit=100`
        : `https://dummyjson.com/products?limit=100`;

    const { data, loading, error } = useFetch(endpoint);

    // Fetch categories once
    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(cats => setCategories(cats.map(c => c.slug || c))) // Handle strings or objects
            .catch(console.error);
    }, []);

    // 2. Filter & Sort Logic (Client-Side for "Array Mastery")
    const processedData = useMemo(() => {
        if (!data?.products) return [];

        let result = [...data.products];

        // Filter by Category
        if (state.category !== 'all') {
            result = result.filter(item => item.category === state.category);
        }

        // Sort
        switch (state.sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating-desc':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'default':
            default:
                // Keep default order
                break;
        }

        return result;
    }, [data, state.category, state.sortBy]);

    // 3. Pagination Logic
    const ITEMS_PER_PAGE = 8;
    const totalPages = Math.ceil(processedData.length / ITEMS_PER_PAGE);

    const currentData = useMemo(() => {
        const start = (state.page - 1) * ITEMS_PER_PAGE;
        return processedData.slice(start, start + ITEMS_PER_PAGE);
    }, [processedData, state.page]);

    const handlePageChange = (newPage) => {
        dispatch({ type: 'SET_PAGE', payload: newPage });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] text-white p-8 md:p-16 shadow-2xl">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-500/20 to-transparent pointer-events-none" />
                <div className="relative z-10 max-w-2xl">
                    <span className="inline-block bg-primary-500 text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-6">
                        Limited Time Offer: 20% Off
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
                        Elevate Your <span className="text-primary-400 font-outline">Lifestyle</span> with SmartDash.
                    </h1>
                    <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-lg">
                        Explore our premium collection of tech, fashion, and lifestyle essentials curated just for you.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-primary-500/25 flex items-center gap-2 group">
                            Start Shopping
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-bold transition-all border border-white/10">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-16 border-t border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/10 p-3 rounded-xl"><Truck size={24} className="text-primary-400" /></div>
                        <div>
                            <p className="font-bold text-sm">Free Shipping</p>
                            <p className="text-xs text-slate-400">On all orders over $99</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/10 p-3 rounded-xl"><ShieldCheck size={24} className="text-primary-400" /></div>
                        <div>
                            <p className="font-bold text-sm">Secure Payment</p>
                            <p className="text-xs text-slate-400">100% secure checkout</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/10 p-3 rounded-xl"><Zap size={24} className="text-primary-400" /></div>
                        <div>
                            <p className="font-bold text-sm">Fast Delivery</p>
                            <p className="text-xs text-slate-400">2-3 business days</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="w-full md:w-auto">
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">Discover Products</h1>
                    <p className="text-slate-500 text-sm">Find the best items for your needs</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
                    <SearchBar />
                    <Filters categories={categories} />
                </div>
            </div>

            {/* Content Area */}
            {loading ? (
                <div className="flex flex-col items-center justify-center p-20 text-slate-400 animate-pulse">
                    <Loader2 size={40} className="animate-spin mb-4" />
                    <p>Loading products...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-8 flex flex-col items-center text-red-600">
                    <AlertCircle size={48} className="mb-4" />
                    <h2 className="text-lg font-bold mb-2">Something went wrong</h2>
                    <p className="mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                    >
                        Try Again
                    </button>
                </div>
            ) : processedData.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                    <p className="text-lg text-slate-500 font-medium">No products found.</p>
                    <p className="text-slate-400 text-sm mt-2">Try adjusting your search or filters.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {currentData.map((product) => (
                            <ItemCard key={product.id} product={product} />
                        ))}
                    </div>

                    <Pagination
                        currentPage={state.page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
}
