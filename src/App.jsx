import React, { useEffect, useState, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lottie from 'react-lottie-player';

// Lazy load pages for better initial load performance
const WelcomePage = React.lazy(() => import('./pages/WelcomePage'));
const ChatPage = React.lazy(() => import('./pages/ChatPage'));
const MenuPage = React.lazy(() => import('./pages/MenuPage'));
const PaymentPage = React.lazy(() => import('./pages/PaymentPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

// Context
import { CartProvider } from './context/CartContext';
import { ChatProvider } from './context/ChatContext';
import { UserProvider } from './context/UserContext';
import { AppShell } from './components/SharedComponents/AppShell';

// Preload component
const PageLoader = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-[#F5F7FA] to-[#EEF1F4] flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="w-4 h-4 bg-[#4C4C9D] rounded-full animate-pulse mb-4"></div>
      <p className="text-[#7A7F87] text-sm">Loading experience...</p>
    </div>
  </div>
);

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [assetsPreloaded, setAssetsPreloaded] = useState(false);

  // Preload critical assets
  useEffect(() => {
    const preloadAssets = async () => {
      try {
        // Preload fonts
        const fontUrls = [
          '/assets/fonts/SpaceGrotesk-Variable.woff2',
          '/assets/fonts/Inter-Variable.woff2',
          '/assets/fonts/JetBrainsMono-Variable.woff2'
        ];

        await Promise.all(
          fontUrls.map(url => 
            new Promise((resolve, reject) => {
              const link = document.createElement('link');
              link.href = url;
              link.rel = 'preload';
              link.as = 'font';
              link.type = 'font/woff2';
              link.crossOrigin = 'anonymous';
              link.onload = resolve;
              link.onerror = reject;
              document.head.appendChild(link);
            })
          )
        );

        // Preload critical images (if any)
        // Add any critical images here

        setAssetsPreloaded(true);
      } catch (error) {
        console.error('Error preloading assets:', error);
        // Continue anyway to ensure app loads
        setAssetsPreloaded(true);
      }
    };

    preloadAssets();
  }, []);

  // Handle table ID from QR code
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tableId = params.get('table_id');
    
    if (tableId) {
      sessionStorage.setItem('table_id', tableId);
    }
    
    // Simulate initial load and redirect
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (location.pathname === '/') {
        navigate('/welcome');
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [location, navigate]);
  
  if (isLoading || !assetsPreloaded) {
    return <PageLoader />;
  }

  return (
    <UserProvider>
      <CartProvider>
        <ChatProvider>
          <AppShell>
            <AnimatePresence mode="wait">
              <Suspense fallback={<PageLoader />}>
                <Routes location={location} key={location.pathname}>
                  <Route path="/welcome" element={<WelcomePage />} />
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/payment" element={<PaymentPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </AppShell>
        </ChatProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App;