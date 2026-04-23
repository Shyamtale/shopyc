import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartOverlay({ isOpen, onClose }) {
    const { state, dispatch, cartTotal, cartCount } = useCart();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
            
            <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animation-slide-left">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ShoppingCart className="text-primary-600" />
                            <h2 className="text-xl font-bold text-slate-900">Your Cart ({cartCount})</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {state.items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                                    <ShoppingCart size={40} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-1">Your cart is empty</h3>
                                <p className="text-slate-500 text-sm">Looks like you haven't added anything yet.</p>
                                <button 
                                    onClick={onClose}
                                    className="mt-6 text-primary-600 font-bold hover:underline"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            state.items.map((item) => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="w-20 h-20 bg-slate-50 rounded-xl p-2 flex-shrink-0">
                                        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-900 text-sm mb-1 truncate">{item.title}</h4>
                                        <p className="text-primary-600 font-bold text-sm mb-3">${item.price}</p>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                                                <button 
                                                    onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: Math.max(1, item.quantity - 1) } })}
                                                    className="p-1 px-2 hover:bg-slate-50 transition-colors"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="px-2 text-xs font-bold text-slate-700 min-w-[2rem] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button 
                                                    onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                                                    className="p-1 px-2 hover:bg-slate-50 transition-colors"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button 
                                                onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                                                className="text-slate-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right font-bold text-slate-800">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {state.items.length > 0 && (
                        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-slate-500 font-medium">Subtotal</span>
                                <span className="text-2xl font-bold text-slate-900">${cartTotal.toFixed(2)}</span>
                            </div>
                            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-primary-200 transition-all active:scale-[0.98]">
                                Checkout Now
                            </button>
                            <button 
                                onClick={() => dispatch({ type: 'CLEAR_CART' })}
                                className="w-full mt-4 text-slate-400 text-xs font-bold hover:text-slate-600 transition-colors"
                            >
                                Clear All Items
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
