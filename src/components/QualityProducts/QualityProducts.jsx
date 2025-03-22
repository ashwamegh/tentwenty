import React, { useState } from 'react';
import './QualityProducts.css';

import client1Img from './../../assets/images/client-1.png';
import client2Img from './../../assets/images/client-2.png';
import client3Img from './../../assets/images/client-3.png';

const QualityProducts = ({
    title = 'Quality Products',
    description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
}) => {
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
        }
    ];

    // State for current active slide
    const [activeIndex, setActiveIndex] = useState(1);

    // Function to get the position class based on index relative to active index
    const getPositionClass = (index) => {
        if (index === activeIndex) return 'gallery-image-center';
        if (index === activeIndex - 1) return 'gallery-image-left';
        if (index === activeIndex + 1) return 'gallery-image-right';
        return 'gallery-image-hidden';
    };

    return (
        <section className="quality-section">
            {/* Main Title */}
            <h1 className="quality-title">{title}</h1>

            {/* Description */}
            <p className="quality-description">{description}</p>

            {/* Image Gallery */}
            <div className="quality-gallery" data-active-index={activeIndex}>
                {galleryItems.map((item, index) => (
                    <div
                        key={item.id}
                        className={getPositionClass(index)}
                        style={{
                            opacity: index === activeIndex ? 1 : 0.7,
                            zIndex: index === activeIndex ? 20 : 10
                        }}
                    >
                        <img src={item.image} alt={item.alt} className="gallery-image" draggable />
                        {index === activeIndex && (
                            <div className="drag-button">
                                <span className="drag-text">Drag</span>
                            </div>
                        )}
                    </div>
                ))}

                {/* Pagination Indicators */}
                <div className="gallery-pagination">
                    {galleryItems.map((_, index) => (
                        <div
                            key={index}
                            className={`pagination-dot ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Client Information - Only show for active slide */}
            {galleryItems[activeIndex] && (
                <div className="client-info">
                    <h2 className="client-name">{galleryItems[activeIndex].clientName}</h2>
                    <p className="client-location">{galleryItems[activeIndex].clientLocation}</p>
                </div>
            )}
        </section>
    );
};

export default QualityProducts;
