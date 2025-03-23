import React, { useState, useEffect, useCallback } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react';
import heroImage from '../../assets/images/hero-img.png';
import lineSvg from '../../assets/images/line.svg';
import farm1 from '../../assets/images/farm-1.jpeg';
import farm2 from '../../assets/images/farm-2.jpeg';
import farm3 from '../../assets/images/farm-3.jpeg';
import farm4 from '../../assets/images/farm-4.jpeg';
import farm5 from '../../assets/images/farm-5.jpeg';

import './HeroSection.css';

// Object containing all hero images with descriptive keys
const HERO_IMAGES = {
    heroImage: {
        src: heroImage,
        alt: 'Farm landscape'
    },
    farm1: {
        src: farm1,
        alt: 'Farm 1'
    },
    farm2: {
        src: farm2,
        alt: 'Farm 2'
    },
    farm3: {
        src: farm3,
        alt: 'Farm 3'
    },
    farm4: {
        src: farm4,
        alt: 'Farm 4'
    },
    farm5: {
        src: farm5,
        alt: 'Farm 5'
    }
};

// Convert to array for easier cycling
const HERO_IMAGE_ARRAY = Object.values(HERO_IMAGES);

export const HeroSection = () => {
    const [animationKey, setAnimationKey] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Function to restart animation and change image
    const restartAnimation = () => {
        setAnimationKey((prev) => prev + 1);
        changeImage();
    };

    // Function to change the hero image - wrapped in useCallback to prevent recreation on every render
    const changeImage = useCallback(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % HERO_IMAGE_ARRAY.length);
    }, []);

    // Reset animation to create a continuous loop
    useEffect(() => {
        const intervalId = setInterval(() => {
            setAnimationKey((prev) => prev + 1);
            changeImage();
            // After first animation cycle, set isInitialLoad to false
            if (isInitialLoad) {
                setIsInitialLoad(false);
            }
        }, 4000);

        return () => clearInterval(intervalId);
    }, [changeImage, isInitialLoad]);

    return (
        <div className="hero-container">
            <div className="hero-inner">
                <div className="hero-image-container">
                    {/* Previous image stays in place */}
                    <img
                        className="hero-image hero-image-previous"
                        alt={
                            HERO_IMAGE_ARRAY[
                                (currentImageIndex - 1 + HERO_IMAGE_ARRAY.length) %
                                    HERO_IMAGE_ARRAY.length
                            ].alt
                        }
                        src={
                            HERO_IMAGE_ARRAY[
                                (currentImageIndex - 1 + HERO_IMAGE_ARRAY.length) %
                                    HERO_IMAGE_ARRAY.length
                            ].src
                        }
                    />

                    {/* Current image slides in with animation */}
                    <AnimatePresence>
                        <motion.div
                            key={`image-${animationKey}`}
                            className="hero-image-wrapper"
                            initial={{ height: 0 }}
                            animate={{ height: '100%' }}
                            transition={{
                                duration: 1.5,
                                ease: 'easeInOut'
                            }}
                        >
                            <img
                                className="hero-image hero-image-current"
                                alt={HERO_IMAGE_ARRAY[currentImageIndex].alt}
                                src={HERO_IMAGE_ARRAY[currentImageIndex].src}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="hero-text-container">
                    <AnimatePresence mode="wait">
                        {isInitialLoad ? (
                            // Initial load animation - fade in and slide up
                            <motion.div
                                key={`text-initial`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.2,
                                    ease: 'easeOut'
                                }}
                            >
                                <motion.p
                                    className="hero-heading"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.4,
                                        ease: 'easeOut'
                                    }}
                                >
                                    From Our Farms
                                    <br />
                                    to Your Hands
                                </motion.p>

                                <motion.div
                                    className="hero-welcome"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.6,
                                        ease: 'easeOut'
                                    }}
                                >
                                    Welcome To TenTwenty Farms
                                </motion.div>
                            </motion.div>
                        ) : (
                            // Word-by-word animation for subsequent changes
                            <motion.div
                                key={`text-${animationKey}`}
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 1 }}
                                className="hero-text-animation-container"
                            >
                                <div className="hero-heading hero-heading-wrapper">
                                    <div className="hero-heading-row">
                                        {['From', 'Our', 'Farms'].map((word, index) => (
                                            <motion.span
                                                key={`heading1-${word}-${animationKey}`}
                                                initial={{ y: 50, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -50, opacity: 0 }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: 0.1 * index,
                                                    ease: 'easeOut'
                                                }}
                                                className="hero-word-span"
                                            >
                                                {word}
                                            </motion.span>
                                        ))}
                                    </div>

                                    <div className="hero-heading-row-2">
                                        {['to', 'Your', 'Hands'].map((word, index) => (
                                            <motion.span
                                                key={`heading2-${word}-${animationKey}`}
                                                initial={{ y: 50, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -50, opacity: 0 }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: 0.1 * (index + 3), // Continue from previous line
                                                    ease: 'easeOut'
                                                }}
                                                className="hero-word-span"
                                            >
                                                {word}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                {/* Welcome text stays constant after initial load */}
                                <div className="hero-welcome">Welcome To TenTwenty Farms</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="hero-controls">
                    <div className="hero-nav-container">
                        <div className="hero-nav-border-container">
                            {/* Top border */}
                            <motion.div
                                key={`top-${animationKey}`}
                                className="hero-border-top"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{
                                    duration: 1,
                                    ease: 'easeInOut',
                                    delay: 0
                                }}
                            />
                            {/* Right border */}
                            <motion.div
                                key={`right-${animationKey}`}
                                className="hero-border-right"
                                initial={{ height: 0 }}
                                animate={{ height: '100%' }}
                                transition={{
                                    duration: 1,
                                    ease: 'easeInOut',
                                    delay: 1
                                }}
                            />
                            {/* Bottom border */}
                            <motion.div
                                key={`bottom-${animationKey}`}
                                className="hero-border-bottom"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{
                                    duration: 1,
                                    ease: 'easeInOut',
                                    delay: 2
                                }}
                            />
                            {/* Left border */}
                            <motion.div
                                key={`left-${animationKey}`}
                                className="hero-border-left"
                                initial={{ height: 0 }}
                                animate={{ height: '100%' }}
                                transition={{
                                    duration: 1,
                                    ease: 'easeInOut',
                                    delay: 3
                                }}
                            />
                        </div>

                        <div className="hero-nav-next-container">
                            <div
                                className="hero-nav-next-bg"
                                onClick={restartAnimation}
                                style={{
                                    backgroundImage: `url(${
                                        HERO_IMAGE_ARRAY[
                                            (currentImageIndex + 1) % HERO_IMAGE_ARRAY.length
                                        ].src
                                    })`
                                }}
                            >
                                {/* Overlay to ensure text is visible */}
                                <div className="hero-nav-overlay" />
                                <div className="hero-nav-next-text">Next</div>
                            </div>
                        </div>
                    </div>

                    <div className="hero-pagination">
                        <div className="hero-pagination-number">
                            {String(currentImageIndex + 1).padStart(2, '0')}
                        </div>

                        <img className="hero-pagination-line" alt="Line" src={lineSvg} />

                        <div className="hero-pagination-number">
                            {String(HERO_IMAGE_ARRAY.length).padStart(2, '0')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
