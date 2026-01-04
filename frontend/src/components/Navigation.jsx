import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import './Navigation.css';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { favoriteIds } = useFavorites();

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/destinations', label: 'Explore' },
        { path: '/contact', label: 'Contact' }
    ];

    const isActive = (path) => location.pathname === path;

    // Logo Click Handler → Redirect + Scroll to Top
    const handleLogoClick = () => {
        navigate("/");
        window.scrollTo(0, 0);
        setIsOpen(false); // Close mobile menu when navigating
    };

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Close mobile menu on window resize (when switching to desktop)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('mobile-menu-open');
        } else {
            document.body.classList.remove('mobile-menu-open');
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove('mobile-menu-open');
        };
    }, [isOpen]);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Updated Logo (click to go home + scroll top) */}
                    <span
                        onClick={handleLogoClick}
                        className="flex items-center cursor-pointer"
                    >
                        <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                            TourEase
                        </span>
                    </span>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                    isActive(item.path)
                                        ? 'bg-teal-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        
                        {/* Favorites Link */}
                        <Link
                            to="/favorites"
                            className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                                isActive('/favorites')
                                    ? 'bg-teal-500 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
            
                            <span>Favorites</span>
                            {favoriteIds.length > 0 && (
                                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                                    {favoriteIds.length}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex">
                        <Link
                            to="/signup"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="nav-button touch-target md:hidden p-2 hover:bg-gray-100 active:bg-gray-200 rounded-lg transition-colors touch-manipulation"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                    >
                        <div className="relative w-6 h-6">
                            <Menu className={`absolute inset-0 w-6 h-6 transition-all duration-200 ${
                                isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                            }`} />
                            <X className={`absolute inset-0 w-6 h-6 transition-all duration-200 ${
                                isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                            }`} />
                        </div>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className={`mobile-menu-container md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className="pb-4 pt-2 space-y-1 bg-white border-t border-gray-100">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`nav-link mobile-nav-link touch-target block px-4 py-3 rounded-lg font-semibold transition-colors touch-manipulation ${
                                    isActive(item.path)
                                        ? 'bg-teal-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        
                        {/* Mobile Favorites Link */}
                        <Link
                            to="/favorites"
                            onClick={() => setIsOpen(false)}
                            className={`nav-link mobile-nav-link touch-target flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors touch-manipulation ${
                                isActive('/favorites')
                                    ? 'bg-teal-500 text-white'
                                    : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                            }`}
                        >
                            <Heart className={`w-5 h-5 ${favoriteIds.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                            <span>Favorites</span>
                            {favoriteIds.length > 0 && (
                                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                                    {favoriteIds.length}
                                </span>
                            )}
                        </Link>

                        <div className="pt-2">
                            <Link
                                to="/signup"
                                className="nav-link mobile-nav-link touch-target block w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center touch-manipulation"
                                onClick={() => setIsOpen(false)}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
