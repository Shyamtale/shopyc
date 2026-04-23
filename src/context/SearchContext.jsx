import { createContext, useContext, useReducer } from 'react';

const SearchContext = createContext();

const initialState = {
    searchQuery: '',
    category: 'all',
    sortBy: 'default',
    page: 1,
};

function searchReducer(state, action) {
    switch (action.type) {
        case 'SET_SEARCH':
            return { ...state, searchQuery: action.payload, page: 1 }; // Reset page on search
        case 'SET_CATEGORY':
            return { ...state, category: action.payload, page: 1 }; // Reset page on filter
        case 'SET_SORT':
            return { ...state, sortBy: action.payload };
        case 'SET_PAGE':
            return { ...state, page: action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

export function SearchProvider({ children }) {
    const [state, dispatch] = useReducer(searchReducer, initialState);

    return (
        <SearchContext.Provider value={{ state, dispatch }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}
