import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export function ScrollToTopButton({ threshold = 300 }) {
  const t = useTranslations('scroll');
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      const targetElement = document.getElementById(window.location.hash.substring(1)); // Remove '#' from the hash
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }

    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    showScrollTopButton && (
      <button
        onClick={scrollToTop}
        className='fixed bottom-6 right-6 w-10 h-10 items-center justify-center bg-blue-500 text-white rounded-full shadow-lg transition-opacity duration-300 opacity-80 hover:opacity-100'
        title={t('totop')}
      >
        ↑
      </button>
    )
  );
}

export default ScrollToTopButton;
