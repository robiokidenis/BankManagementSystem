import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "flowbite";
import { initFlowbite } from 'flowbite';

import { useEffect } from 'react';

import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {


    // Initialize Flowbite scripts and components on page load
    initFlowbite();

    // Reinitialize Flowbite scripts and components on route change
    const handleRouteChange = () => {
      initFlowbite();
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    // Remove event listener when component unmounts
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);
  
  return <Component {...pageProps} />
}
