'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PricingPopup from '@/components/PricingPopup';

export default function PostLogin() {
  const [hydrated, setHydrated] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Ensures this only runs on the client
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const shouldShow = localStorage.getItem('showPricingPopup');
    if (shouldShow === 'true') {
      setShowPricing(true);
      localStorage.removeItem('showPricingPopup');
    } else {
      router.push('/agents');
    }
  }, [hydrated, router]);

  const handleClose = () => {
    setShowPricing(false);
    router.push('/agents');
  };

  if (!hydrated) return null;

  return <>{showPricing && <PricingPopup onClose={handleClose} />}</>;
}
