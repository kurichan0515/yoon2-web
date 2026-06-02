import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('../../services/analyticsService', () => ({
  default: { trackPageView: jest.fn() },
  trackPageView: jest.fn(), trackMenuView: jest.fn(), trackFaqView: jest.fn(),
  trackReviewsView: jest.fn(), trackHotpepperClick: jest.fn(), trackLineClick: jest.fn(),
}));
jest.mock('../../services/googleAdsService', () => ({ trackLineAddConversion: jest.fn(), trackPageView: jest.fn() }));

jest.mock('../../components/SocialFeed', () => () => <div data-testid="social-feed" />);
jest.mock('../../components/FAQ', () => () => <div data-testid="faq" />);
jest.mock('../../components/MenuSection', () => () => <div data-testid="menu-section" />);
jest.mock('../../components/ReviewsSection', () => () => <div data-testid="reviews" />);
jest.mock('../../components/ConcernSection', () => () => <div data-testid="concern" />);
jest.mock('../../components/MenuDiagnosis', () => () => <div data-testid="diagnosis" />);
jest.mock('../../components/FlowSection', () => () => <div data-testid="flow" />);
jest.mock('../../components/common/AdSense', () => () => null);

jest.mock('../../config/appConfig', () => ({
  default: {
    features: { firstVisitDiscount: true },
    shop: {
      name: 'yoon²', phone: '080-0000-0000', address: '愛媛県松山市', postalCode: '790-0000',
      lineUrl: 'https://lin.ee/test', instagramUrl: '',
      _googleMapsUrl: null, get googleMapsUrl() { return ''; },
      hours: { open: '10:00', close: '20:00', weekday: '10:00-20:00', weekend: '10:00-20:00', note: '' },
      holidays: '不定休', description: '', email: '', payment: [],
      facilities: { totalSeats: 1, staffCount: 1, parkingSpaces: 1, features: [] },
      notes: [], access: { stations: [], landmarks: '', parking: '', parkingPhotos: { parkingLot: '', routeToShop: '' } },
      services: [],
    },
    social: { twitter: { url: '' }, instagram: { url: '', username: '' }, line: { url: 'https://lin.ee/test', note: '' } },
    adsense: { enabled: false, publisherId: '', defaultAdSlot: '', devMode: false },
    googleAds: { conversionId: '', conversionLabel: '', enabled: false },
    booking: { availableTimes: [], advanceBookingDays: 30, minAdvanceHours: 2 },
    firebase: { apiKey: '', authDomain: '', projectId: '', storageBucket: '', messagingSenderId: '', appId: '' },
  },
  __esModule: true,
}));

import Home from '../../views/Home';

describe('Home Component', () => {
  test('renders home page with hero section', () => {
    render(<Home />);
    expect(screen.getAllByText('yoon²').length).toBeGreaterThan(0);
  });

  test('renders child sections', () => {
    render(<Home />);
    expect(screen.getByTestId('social-feed')).toBeInTheDocument();
    expect(screen.getByTestId('faq')).toBeInTheDocument();
    expect(screen.getByTestId('menu-section')).toBeInTheDocument();
  });
});
