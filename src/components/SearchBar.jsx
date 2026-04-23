import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { useDebounce } from '../hooks/useDebounce';

export default function SearchBar() {
    const { state, dispatch } = useSearch();
    const [localValue, setLocalValue] = useState(state.searchQuery);
    const debouncedValue = useDebounce(localValue, 500);

    // Sync debounced value to global context
    useEffect(() => {
        dispatch({ type: 'SET_SEARCH', payload: debouncedValue });
    }, [debouncedValue, dispatch]);

    const handleClear = () => {
        setLocalValue('');
        dispatch({ type: 'SET_SEARCH', payload: '' });
    };

    return (
        <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={18} />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-10 py-3 bg-white border-none rounded-2xl 
                   focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none
                   placeholder-slate-400 text-sm shadow-md hover:shadow-lg transition-all"
                placeholder="Search products..."
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
            />
            {localValue && (
                <button
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
}
