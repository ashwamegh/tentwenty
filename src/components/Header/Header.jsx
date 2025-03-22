'use client';
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'motion/react';
import './Header.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if screen is mobile size
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkIfMobile();

        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);

        // Clean up event listener
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    // Close menu when switching from mobile to desktop
    useEffect(() => {
        if (!isMobile) {
            setIsMenuOpen(false);
        }
    }, [isMobile]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header-container">
            <div className="header-inner">
                {/* Logo on desktop, Contact Us on mobile */}
                {!isMobile ? (
                    <div className="header-logo">TenTwenty</div>
                ) : (
                    <button className="contact-button mobile-header-contact">Contact Us</button>
                )}

                {/* Desktop Navigation */}
                {!isMobile && (
                    <div className="header-nav desktop-nav">
                        <div className="nav-item">About</div>
                        <div className="nav-item">News</div>
                        <div className="nav-item">Services</div>
                        <div className="nav-item">Our Team</div>
                        <div className="nav-item">Make Enquiry</div>
                    </div>
                )}

                {/* Contact Button - visible on desktop */}
                {!isMobile && <button className="contact-button">Contact Us</button>}

                {/* Hamburger Menu - visible on mobile */}
                {isMobile && (
                    <div className="hamburger-menu" onClick={toggleMenu}>
                        <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
                        <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
                        <div className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></div>
                    </div>
                )}

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isMobile && isMenuOpen && (
                        <motion.div
                            className="mobile-nav"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mobile-nav-items">
                                <div className="nav-item">About</div>
                                <div className="nav-item">News</div>
                                <div className="nav-item">Services</div>
                                <div className="nav-item">Our Team</div>
                                <div className="nav-item">Make Enquiry</div>
                                {!isMobile && (
                                    <button className="contact-button mobile-contact">
                                        Contact Us
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}

export default Header;
