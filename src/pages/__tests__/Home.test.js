import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../Home';

// Mock appConfig
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
      },
      {
        id: '2',
        name: '耳つぼ（付け放題）',
        category: 'mimitubo',
        price: 3000,
        duration: '60分',
        description: '耳つぼの基本施術'
      }
    ]
  }
}));

describe('Home Component', () => {
  const mockOnNavigateToBooking = jest.fn();

  beforeEach(() => {
    mockOnNavigateToBooking.mockClear();
  });

  test('renders home page with hero section', () => {
    render(<Home onNavigateToBooking={mockOnNavigateToBooking} />);
    
    expect(screen.getByText('yoon²')).toBeInTheDocument();
    expect(screen.getByText('ear esthetic & acupressure salon')).toBeInTheDocument();
    expect(screen.getByText('イヤーエステと耳つぼで至福のひととき')).toBeInTheDocument();
  });

  test('renders simplified menu grid', () => {
    render(<Home onNavigateToBooking={mockOnNavigateToBooking} />);
    
    expect(screen.getByText('サービスメニュー')).toBeInTheDocument();
    expect(screen.getByText('おすすめメニュー')).toBeInTheDocument();
    expect(screen.getByText('耳つぼメニュー')).toBeInTheDocument();
    expect(screen.getByText('イヤーエステ・ドライヘッドスパ')).toBeInTheDocument();
  });

  test('navigates to course page when menu image is clicked', () => {
    render(<Home onNavigateToBooking={mockOnNavigateToBooking} />);
    
    const menuCards = screen.getAllByText('詳細を見る');
    fireEvent.click(menuCards[0]);
    
    expect(mockOnNavigateToBooking).toHaveBeenCalledWith('course');
  });

  test('displays menu images with proper alt text', () => {
    render(<Home onNavigateToBooking={mockOnNavigateToBooking} />);
    
    expect(screen.getByAltText('おすすめメニュー')).toBeInTheDocument();
    expect(screen.getByAltText('耳つぼメニュー')).toBeInTheDocument();
    expect(screen.getByAltText('イヤーエステ・ドライヘッドスパメニュー')).toBeInTheDocument();
  });

  test('shows image placeholders when images fail to load', () => {
    render(<Home onNavigateToBooking={mockOnNavigateToBooking} />);
    
    const images = screen.getAllByRole('img');
    images.forEach(img => {
      fireEvent.error(img);
    });
    
    expect(screen.getByText('おすすめメニュー')).toBeInTheDocument();
    expect(screen.getByText('耳つぼメニュー')).toBeInTheDocument();
    expect(screen.getByText('イヤーエステ・ドライヘッドスパメニュー')).toBeInTheDocument();
  });
});
