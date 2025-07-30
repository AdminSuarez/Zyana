"use client";

import React, { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
  mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === 'development',
    track_pageview: true,
    persistence: 'localStorage',
  });
}

export const analytics = {
  // Track user actions
  track: (event: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      mixpanel.track(event, properties);
    }
  },

  // Identify user
  identify: (userId: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      mixpanel.identify(userId);
      if (properties) {
        mixpanel.people.set(properties);
      }
    }
  },

  // Track page views
  page: (pageName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      mixpanel.track('Page View', {
        page: pageName,
        ...properties,
      });
    }
  },

  // Track conversions
  conversion: (type: 'signup' | 'subscription' | 'reading_completed', properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      mixpanel.track('Conversion', {
        type,
        ...properties,
      });
    }
  },

  // Track revenue
  revenue: (amount: number, plan: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      mixpanel.track('Revenue', {
        amount,
        plan,
        currency: 'USD',
        ...properties,
      });
      
      // Track with Mixpanel People for LTV calculations
      mixpanel.people.track_charge(amount);
    }
  }
};

// Hook for tracking page views automatically
export function usePageTracking(pageName: string) {
  useEffect(() => {
    analytics.page(pageName);
  }, [pageName]);
}

// Component for tracking user interactions
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Track app initialization
    analytics.track('App Initialized', {
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
    });
  }, []);

  return <>{children}</>;
}
