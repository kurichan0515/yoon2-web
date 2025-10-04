import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';

// Mock all services
jest.mock('../../services/authService', () => ({
  onAuthStateChange: jest.fn(() => jest.fn()),
  checkAdminRole: jest.fn(() => Promise.resolve(false))
}));

jest.mock('../../services/courseService', () => ({
  getAllCourses: jest.fn(() => Promise.resolve({
    success: true,
    data: [
      {
        id: '1',
        name: 'yoon²極メニュー',
        description: 'イヤーエステと耳つぼの組み合わせ',
        price: 8000,
        duration: '90分',
        image: '/images/test.jpg',
        category: 'recommend'
      }
    ]
  })),
  createCourse: jest.fn(() => Promise.resolve({
    success: true,
    data: { id: '2', name: 'New Course' }
  }))
}));

jest.mock('../../config/appConfig', () => ({
  shop: {
    services: [
      {
        id: '1',
        name: 'yoon²極メニュー',
        category: 'recommend',
        price: 8000,
        duration: '90分',
        description: 'イヤーエステと耳つぼの組み合わせ'
      }
    ]
  }
}));

jest.mock('../../utils/configValidator', () => ({
  logConfigValidation: jest.fn()
}));

describe('User Flow E2E Tests', () => {
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

  test('complete mobile navigation flow', async () => {
    render(<App />);
    
    // Start at home page
    await waitFor(() => {
      expect(screen.getByText('yoon²')).toBeInTheDocument();
    });
    
    // Open mobile menu
    const mobileToggle = screen.getByLabelText('Toggle menu');
    fireEvent.click(mobileToggle);
    
    // Navigate to course creation
    const courseCreateButton = screen.getByText('コース作成');
    fireEvent.click(courseCreateButton);
    
    await waitFor(() => {
      expect(screen.getByText('コース作成')).toBeInTheDocument();
    });
    
    // Fill course creation form
    fireEvent.change(screen.getByLabelText(/コース名/), { 
      target: { value: 'Test Course' } 
    });
    fireEvent.change(screen.getByLabelText(/説明/), { 
      target: { value: 'Test Description' } 
    });
    fireEvent.change(screen.getByLabelText(/価格/), { 
      target: { value: '5000' } 
    });
    fireEvent.change(screen.getByLabelText(/時間/), { 
      target: { value: '60分' } 
    });
    
    // Submit form
    const submitButton = screen.getByText('コースを作成');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('コースが正常に作成されました！')).toBeInTheDocument();
    });
    
    // Wait for redirect to home
    await waitFor(() => {
      expect(screen.getByText('yoon²')).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  test('complete desktop navigation flow', async () => {
    render(<App />);
    
    // Start at home page
    await waitFor(() => {
      expect(screen.getByText('yoon²')).toBeInTheDocument();
    });
    
    // Navigate to course page via menu images
    const menuImages = screen.getAllByText('詳細を見る');
    fireEvent.click(menuImages[0]);
    
    await waitFor(() => {
      expect(screen.getByText('コース一覧')).toBeInTheDocument();
    });
    
    // Verify course details are displayed
    expect(screen.getByText('yoon²極メニュー')).toBeInTheDocument();
    expect(screen.getByText('¥8,000')).toBeInTheDocument();
    expect(screen.getByText('90分')).toBeInTheDocument();
    
    // Navigate back to home
    const backButton = screen.getByText('← ホームに戻る');
    fireEvent.click(backButton);
    
    await waitFor(() => {
      expect(screen.getByText('yoon²')).toBeInTheDocument();
    });
  });

  test('responsive design behavior', async () => {
    render(<App />);
    
    // Test desktop view
    await waitFor(() => {
      expect(screen.getByText('yoon²')).toBeInTheDocument();
    });
    
    // Verify desktop navigation is visible
    expect(screen.getByText('ホーム')).toBeInTheDocument();
    expect(screen.getByText('店舗情報')).toBeInTheDocument();
    expect(screen.getByText('予約状況')).toBeInTheDocument();
    expect(screen.getByText('予約・お問い合わせ')).toBeInTheDocument();
    
    // Verify mobile toggle is present
    const mobileToggle = screen.getByLabelText('Toggle menu');
    expect(mobileToggle).toBeInTheDocument();
    
    // Test mobile menu
    fireEvent.click(mobileToggle);
    
    // Verify mobile menu items
    expect(screen.getByText('コース作成')).toBeInTheDocument();
  });

  test('simplified home display verification', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('yoon²')).toBeInTheDocument();
    });
    
    // Verify simplified menu display
    expect(screen.getByText('サービスメニュー')).toBeInTheDocument();
    expect(screen.getByText('おすすめメニュー')).toBeInTheDocument();
    expect(screen.getByText('耳つぼメニュー')).toBeInTheDocument();
    expect(screen.getByText('イヤーエステ・ドライヘッドスパ')).toBeInTheDocument();
    
    // Verify images are displayed
    expect(screen.getByAltText('おすすめメニュー')).toBeInTheDocument();
    expect(screen.getByAltText('耳つぼメニュー')).toBeInTheDocument();
    expect(screen.getByAltText('イヤーエステ・ドライヘッドスパメニュー')).toBeInTheDocument();
    
    // Verify "詳細を見る" links
    const detailLinks = screen.getAllByText('詳細を見る');
    expect(detailLinks).toHaveLength(3);
  });
});

