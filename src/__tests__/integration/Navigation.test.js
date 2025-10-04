import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';

// Mock services
jest.mock('../../services/authService', () => ({
  onAuthStateChange: jest.fn(() => jest.fn()),
  checkAdminRole: jest.fn(() => Promise.resolve(false))
}));

jest.mock('../../services/courseService', () => ({
  getAllCourses: jest.fn(() => Promise.resolve({
    success: true,
    data: []
  })),
  createCourse: jest.fn(() => Promise.resolve({
    success: true,
    data: { id: '1', name: 'Test Course' }
  }))
}));

jest.mock('../../config/appConfig', () => ({
  shop: {
    services: []
  }
}));

jest.mock('../../utils/configValidator', () => ({
  logConfigValidation: jest.fn()
}));

describe('Navigation Integration Tests', () => {
  beforeEach(() => {
    // Mock window.matchMedia for responsive design
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test('navigates from mobile menu to course creation page', async () => {
    render(<App />);
    
    // Open mobile menu
    const mobileToggle = screen.getByLabelText('Toggle menu');
    fireEvent.click(mobileToggle);
    
    // Click course creation link
    const courseCreateButton = screen.getByText('コース作成');
    fireEvent.click(courseCreateButton);
    
    await waitFor(() => {
      expect(screen.getByText('コース作成')).toBeInTheDocument();
      expect(screen.getByText('新しいコースを作成して、お客様に提供するサービスを追加してください')).toBeInTheDocument();
    });
  });

  test('navigates from home to course page', async () => {
    render(<App />);
    
    // Wait for home page to load
    await waitFor(() => {
      expect(screen.getByText('yoon²')).toBeInTheDocument();
    });
    
    // Click on menu image to navigate to course page
    const menuImages = screen.getAllByText('詳細を見る');
    fireEvent.click(menuImages[0]);
    
    await waitFor(() => {
      expect(screen.getByText('コース一覧')).toBeInTheDocument();
    });
  });

  test('navigates back from course page to home', async () => {
    render(<App />);
    
    // Navigate to course page first
    await waitFor(() => {
      expect(screen.getByText('yoon²')).toBeInTheDocument();
    });
    
    const menuImages = screen.getAllByText('詳細を見る');
    fireEvent.click(menuImages[0]);
    
    await waitFor(() => {
      expect(screen.getByText('コース一覧')).toBeInTheDocument();
    });
    
    // Click back button
    const backButton = screen.getByText('← ホームに戻る');
    fireEvent.click(backButton);
    
    await waitFor(() => {
      expect(screen.getByText('yoon²')).toBeInTheDocument();
    });
  });

  test('navigates back from course creation page to home', async () => {
    render(<App />);
    
    // Navigate to course creation page
    const mobileToggle = screen.getByLabelText('Toggle menu');
    fireEvent.click(mobileToggle);
    
    const courseCreateButton = screen.getByText('コース作成');
    fireEvent.click(courseCreateButton);
    
    await waitFor(() => {
      expect(screen.getByText('コース作成')).toBeInTheDocument();
    });
    
    // Click back button
    const backButton = screen.getByText('← ホームに戻る');
    fireEvent.click(backButton);
    
    await waitFor(() => {
      expect(screen.getByText('yoon²')).toBeInTheDocument();
    });
  });

  test('maintains consistent navigation between mobile and desktop', async () => {
    render(<App />);
    
    // Test desktop navigation
    const homeButton = screen.getByText('ホーム');
    fireEvent.click(homeButton);
    
    await waitFor(() => {
      expect(screen.getByText('yoon²')).toBeInTheDocument();
    });
    
    // Test mobile navigation
    const mobileToggle = screen.getByLabelText('Toggle menu');
    fireEvent.click(mobileToggle);
    
    const mobileHomeButton = screen.getByText('ホーム');
    fireEvent.click(mobileHomeButton);
    
    await waitFor(() => {
      expect(screen.getByText('yoon²')).toBeInTheDocument();
    });
  });
});

