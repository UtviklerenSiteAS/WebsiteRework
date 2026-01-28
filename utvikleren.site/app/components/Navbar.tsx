"use client";

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

// #region reference

export interface NavbarMenuItem {
    label: string;
    href: string;
}

export interface NavbarProps {
    logoSrc?: string;
    menuItems?: NavbarMenuItem[];
    socialLinks?: { label: string; href: string }[];
    accentColor?: string;
}

const Navbar: React.FC<NavbarProps> = ({
    logoSrc = '/Logo.png',
    menuItems = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Contact', href: '/contact' }
    ],
    socialLinks = [
        { label: 'Twitter', href: 'https://twitter.com' },
        { label: 'GitHub', href: 'https://github.com' },
        { label: 'LinkedIn', href: 'https://linkedin.com' }
    ],
    accentColor = '#5227FF'
}) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Animate menu open
            gsap.to('.nav-menu-overlay', {
                x: 0,
                duration: 0.4,
                ease: 'power4.out'
            });

            gsap.to('.nav-menu-item', {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.05,
                ease: 'power3.out',
                delay: 0.1
            });

            gsap.to('.nav-social-item', {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.05,
                ease: 'power3.out',
                delay: 0.2
            });

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Animate menu close
            gsap.to('.nav-menu-overlay', {
                x: '100%',
                duration: 0.5,
                ease: 'power3.in'
            });

            // Reset menu items
            gsap.set('.nav-menu-item', { y: 30, opacity: 0 });
            gsap.set('.nav-social-item', { y: 20, opacity: 0 });

            // Re-enable body scroll
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Fixed Navbar */}
            <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex items-center justify-between pointer-events-none">
                {/* Logo */}
                <Link href="/" className="pointer-events-auto">
                    <img
                        src={logoSrc}
                        alt="Logo"
                        className="h-8 w-auto object-contain"
                    />
                </Link>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4 pointer-events-auto z-[60]">
                    {/* Profile Button */}
                    <button
                        className="profile-btn relative w-12 h-12 flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition-colors cursor-pointer shadow-lg"
                        aria-label="Profile"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </button>

                    {/* Hamburger Button */}
                    <button
                        onClick={toggleMenu}
                        className="hamburger-btn relative w-12 h-12 flex flex-col items-center justify-center gap-[5px] bg-white rounded-full cursor-pointer shadow-lg hover:bg-gray-200 transition-colors"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isOpen}
                    >
                        <span
                            className={`hamburger-line block w-5 h-[2px] bg-black rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : ''
                                }`}
                        />
                        <span
                            className={`hamburger-line block w-5 h-[2px] bg-black rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''
                                }`}
                        />
                        <span
                            className={`hamburger-line block w-5 h-[2px] bg-black rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''
                                }`}
                        />
                    </button>
                </div>
            </nav>

            {/* Backdrop Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-500 fade-in border-none"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Side Menu Drawer */}
            <div
                className={`nav-menu-overlay fixed top-0 right-0 w-full sm:w-[480px] h-full bg-[#0a0a0a] z-50 transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] border-l border-white/10 shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full relative overflow-y-auto custom-scrollbar">

                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                        <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-purple-900/40 rounded-full blur-[100px]" />
                    </div>

                    <div className="flex flex-col justify-center min-h-full px-12 md:px-16 py-24">
                        {/* Menu Items */}
                        <ul className="space-y-4 mb-12 relative z-10 w-full">
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    className="nav-menu-item translate-y-8"
                                // removed opacity-0 here because GSAP handles it, avoiding initial flash invisible issues if GSAP fails
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-5xl md:text-6xl font-bold text-white hover:text-white/70 transition-all duration-300 block relative group"
                                        style={{
                                            letterSpacing: '-0.03em'
                                        }}
                                        onMouseEnter={(e) => {
                                            gsap.to(e.currentTarget, {
                                                x: 10,
                                                color: accentColor,
                                                duration: 0.3,
                                                ease: 'power2.out'
                                            });
                                        }}
                                        onMouseLeave={(e) => {
                                            gsap.to(e.currentTarget, {
                                                x: 0,
                                                color: 'white',
                                                duration: 0.3,
                                                ease: 'power2.out'
                                            });
                                        }}
                                    >
                                        <span className="inline-block mr-4 text-xs font-mono font-normal opacity-30 align-middle">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Social Links */}
                        <div className="mt-auto pb-6 relative z-10 w-full border-t border-white/10 pt-8">
                            <h3
                                className="text-xs font-mono uppercase tracking-widest mb-6 text-white/40"
                            >
                                Follow Us
                            </h3>
                            <ul className="flex gap-6">
                                {socialLinks.map((social, index) => (
                                    <li
                                        key={index}
                                        className="nav-social-item translate-y-5"
                                    >
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-300 uppercase tracking-wider"
                                        >
                                            {social.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// #endregion

// #region

export default Navbar;

// #endregion
