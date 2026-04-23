import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
            <h1 className="text-9xl font-bold text-slate-200">404</h1>
            <p className="text-2xl font-semibold text-slate-800 mt-4">Page Not Found</p>
            <p className="text-slate-500 mt-2 mb-8">The page you are looking for doesn't exist.</p>
            <Link
                to="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
                Go Home
            </Link>
        </div>
    );
}
