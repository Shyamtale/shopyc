import { useSearch } from '../context/SearchContext';
import { Filter } from 'lucide-react';

export default function Filters({ categories = [] }) {
    const { state, dispatch } = useSearch();

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter size={18} className="text-slate-500" />
                <select
                    className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg 
                     focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none shadow-md cursor-pointer hover:bg-primary-50 transition-colors border-none font-medium"
                    value={state.category}
                    onChange={(e) => dispatch({ type: 'SET_CATEGORY', payload: e.target.value })}
                >
                    <option value="all">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>

                <select
                    className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg 
                     focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none shadow-md cursor-pointer hover:bg-primary-50 transition-colors border-none font-medium"
                    value={state.sortBy}
                    onChange={(e) => dispatch({ type: 'SET_SORT', payload: e.target.value })}
                >
                    <option value="default">Sort By: Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Rating: High to Low</option>
                </select>
            </div>
        </div>
    );
}
