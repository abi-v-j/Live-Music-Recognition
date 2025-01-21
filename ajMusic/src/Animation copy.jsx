import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MusicFound from './MusicFound/MusicFound';

const Animation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setIsAnimating(prev => !prev);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsAnimating(false); // Stop animation after closing the modal
  };

  useEffect(() => {
    let timer;
    if (isAnimating) {
      timer = setTimeout(() => {
        setShowModal(true);
        setIsAnimating(false); // Pause the animation when the modal opens
      }, 5000); // Show modal after 5 seconds
    }

    return () => clearTimeout(timer); // Cleanup the timer
  }, [isAnimating]);

  const circleVariants = {
    initial: {
      scale: 1,
      boxShadow: '0 0 0 0 rgba(0, 186, 255, 0.4)',
    },
    animate: {
      scale: [1, 1.1, 1],
      boxShadow: [
        '0 0 0 0 rgba(0, 186, 255, 0.4)',
        '0 0 0 20vmin rgba(0, 186, 255, 0.3)',
        '0 0 0 0 rgba(0, 186, 255, 0)',
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const modalVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(to bottom, #00b4ff, #0078ff)',
      }}
    >
      <motion.div
        className='logo'
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: '#00d1ff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          cursor: 'pointer',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        }}
        onClick={handleClick}
        variants={circleVariants}
        initial='initial'
        animate={isAnimating ? 'animate' : 'initial'}
      >
        {/* Icon */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='#ffffff'
          width='50px'
          height='50px'
        >
          <path d='M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2zM11 18h2v3h-2z' />
        </svg>

        {isAnimating && (
          <motion.p
            style={{
              color: '#ffffff',
              fontSize: '16px',
              marginTop: '12px',
              textAlign: 'center',
              fontFamily: "'Arial', sans-serif",
              fontWeight: '525',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Listening
          </motion.p>
        )}
      </motion.div>

      {showModal && (
        <motion.div
          className='modal'
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
          variants={modalVariants}
          initial='initial'
          animate='animate'
          exit='exit'
        >
          <motion.div
            className='modal-content'
            style={{
              borderRadius: '10px',
              color: 'white',
              fontSize: '20px',
              textAlign: 'center',
              maxWidth: '90%',
              minWidth: '300px',
              padding: '20px',
              fontFamily: "'Arial', sans-serif",
              position: 'relative', // Needed for close button positioning
              overflow: 'auto', // Allow scrolling for large content
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '0px',
                right: '0px',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
              }}
              aria-label='Close modal'
            >
              &times;
            </button>

            <div style={{ display: 'block', textAlign: 'center' }}>
              <MusicFound />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Animation;
