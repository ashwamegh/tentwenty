import React, { useState, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useInView, useAnimation } from 'framer-motion';
import './QualityProducts.css';

import client1Img from './../../assets/images/client-1.png';
import client2Img from './../../assets/images/client-2.png';
import client3Img from './../../assets/images/client-3.png';

const QualityProducts = ({
    title = 'Quality Products',
    description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
}) => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
    // Gallery data
    const galleryItems = [
        {
            id: 1,
            image: client1Img,
            alt: 'Garden bench surrounded by plants',
            clientName: 'Client 1',
            clientLocation: 'Dubai, United Arab Emirates'
        },
        {
            id: 2,
            image: client2Img,
            alt: 'Person walking through yellow flower field',
            clientName: 'Client 2',
            clientLocation: 'Abu Dhabi, United Arab Emirates'
        },
        {
            id: 3,
            image: client3Img,
            alt: 'Person working in a greenhouse',
            clientName: 'Client 3',
            clientLocation: 'Sharjah, United Arab Emirates'
        },
        {
            id: 4,
            image: client1Img,
            alt: 'Garden bench surrounded by plants',
            clientName: 'Client 1',
            clientLocation: 'Dubai, United Arab Emirates'
        },
        {
            id: 5,
            image: client2Img,
            alt: 'Person walking through yellow flower field',
            clientName: 'Client 2',
            clientLocation: 'Abu Dhabi, United Arab Emirates'
        },
        {
            id: 6,
            image: client3Img,
            alt: 'Person working in a greenhouse',
            clientName: 'Client 3',
            clientLocation: 'Sharjah, United Arab Emirates'
        }
    ];

    // State for current active slide
    const [activeIndex, setActiveIndex] = useState(1);
    const galleryRef = useRef(null);
    const controls = useAnimation();

    const handleDrag = (_, info) => {
        const { offset } = info;
        // Apply a temporary transform to the gallery based on drag position
        const moveX = offset.x * 0.1;
        controls.set({
            x: moveX
        });
    };

    // Handle drag end to determine slide change
    const handleDragEnd = (_, info) => {
        const { offset, velocity } = info;

        // Determine direction and if we should change slides
        if (offset.x > 80 || (offset.x > 0 && velocity.x > 200)) {
            // Dragged right, go to previous slide with circular wrapping
            setActiveIndex((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1));
        } else if (offset.x < -80 || (offset.x < 0 && velocity.x < -200)) {
            // Dragged left, go to next slide with circular wrapping
            setActiveIndex((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0));
        }

        // Animate back to center position with a smooth transition
        controls.start({
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30
            }
        });
    };

    // Function to get the position class and style
    const getItemStyle = (index) => {
        // Calculate the shortest distance in a circular array
        const getCircularDistance = (current, target, length) => {
            const directDistance = target - current;
            const wrappedDistance =
                directDistance > 0 ? directDistance - length : directDistance + length;
            return Math.abs(directDistance) < Math.abs(wrappedDistance)
                ? directDistance
                : wrappedDistance;
        };

        const distance = getCircularDistance(activeIndex, index, galleryItems.length);

        let className = '';
        let transform = '';
        let zIndex = 10;
        let opacity = 1;

        let angle = 0;
        let translateZ = 0;
        let translateY = 0;
        let translateX = 0;
        let scale = 1;

        if (distance === 0) {
            // Center image
            className = 'gallery-image-center';
            angle = 0;
            translateZ = 0;
            translateY = 0;
            translateX = 0;
            scale = 1;
            zIndex = 30;
            opacity = 1;
        } else if (distance === -1 || distance === galleryItems.length - 1) {
            // Left image (in front)
            className = 'gallery-image-left';
            translateX = -33;
            angle = -9.55;
            scale = 0.9;
            zIndex = 20; // In front of center
        } else if (distance === 1 || distance === -(galleryItems.length - 1)) {
            // Right image (in front)
            className = 'gallery-image-right';
            translateX = -33;
            angle = 9.55;
            scale = 0.9;
            zIndex = 20;
        } else if (distance === -2 || distance === galleryItems.length - 2) {
            className = 'gallery-image-hidden';
            opacity = 0;
            zIndex = 0;
        } else if (distance === 2 || distance === -(galleryItems.length - 2)) {
            className = 'gallery-image-hidden';
            opacity = 0;
            zIndex = 0;
        } else {
            className = 'gallery-image-hidden';
            opacity = 0;
        }

        transform = `translateX(${translateX}%) translateY(${translateY}%) translateZ(${translateZ}%) rotateZ(${angle}deg) scale(${scale})`;

        return { className, style: { transform, zIndex, opacity } };
    };

    return (
        <section className="quality-section" ref={sectionRef}>
            <h1 className="quality-title">
                {title.split(' ').map((word, index) => (
                    <motion.span
                        key={index}
                        className="inline-block mr-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{
                            duration: 0.5,
                            ease: 'easeOut',
                            delay: index * 0.1 // Stagger delay for each word
                        }}
                    >
                        {word}
                    </motion.span>
                ))}
            </h1>

            <p className="quality-description">
                {description.split(' ').map((word, index) => (
                    <motion.span
                        key={index}
                        className="inline-block mr-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{
                            duration: 0.5,
                            ease: 'easeOut',
                            delay: 0.3 + index * 0.05 // Start after title with smaller stagger
                        }}
                    >
                        {word}
                    </motion.span>
                ))}
            </p>

            {/* Image Gallery - Circular Draggable Gallery */}
            <div className="quality-gallery-container">
                <motion.div
                    className="quality-gallery"
                    data-active-index={activeIndex}
                    ref={galleryRef}
                    animate={controls}
                >
                    {galleryItems.map((item, index) => {
                        const { className, style } = getItemStyle(index);
                        return (
                            <div
                                key={item.id}
                                className={`gallery-item ${className}`}
                                style={style}
                            >
                                <img
                                    src={item.image}
                                    alt={item.alt}
                                    className="gallery-image"
                                    draggable={false}
                                />
                                {index === activeIndex && (
                                    <motion.div
                                        className="drag-button"
                                        drag="x"
                                        dragElastic={0.2}
                                        dragTransition={{ bounceStiffness: 0, bounceDamping: 0 }}
                                        onDrag={handleDrag}
                                        onDragEnd={handleDragEnd}
                                        style={{ cursor: 'grab' }}
                                        whileDrag={{ cursor: 'grabbing' }}
                                    >
                                        <span className="drag-text">Drag</span>
                                    </motion.div>
                                )}
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            {galleryItems[activeIndex] && (
                <div className="client-info">
                    <motion.h2
                        className="client-name"
                        key={`name-${activeIndex}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        {galleryItems[activeIndex].clientName.split(' ').map((word, index) => (
                            <motion.span
                                key={index}
                                className="inline-block mr-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    ease: 'easeOut',
                                    delay: index * 0.1
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.h2>
                    <motion.p
                        className="client-location"
                        key={`location-${activeIndex}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
                    >
                        {galleryItems[activeIndex].clientLocation}
                    </motion.p>
                </div>
            )}
        </section>
    );
};

export default QualityProducts;
