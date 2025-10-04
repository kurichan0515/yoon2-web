import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CoursePage from '../CoursePage';
import courseService from '../../services/courseService';

// Mock courseService
jest.mock('../../services/courseService');

describe('CoursePage Component', () => {
  const mockOnNavigate = jest.fn();

  beforeEach(() => {
    mockOnNavigate.mockClear();
    courseService.getAllCourses.mockResolvedValue({
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
        },
        {
          id: '2',
          name: '耳つぼ（付け放題）',
          description: '耳つぼの基本施術',
          price: 3000,
          duration: '60分',
          image: '/images/test2.jpg',
          category: 'mimitubo'
        }
      ]
    });
  });

  test('renders course page with loading state', () => {
    courseService.getAllCourses.mockImplementation(() => new Promise(() => {}));
    
    render(<CoursePage onNavigate={mockOnNavigate} />);
    
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
  });

  test('renders course list after loading', async () => {
    render(<CoursePage onNavigate={mockOnNavigate} />);
    
    await waitFor(() => {
      expect(screen.getByText('コース一覧')).toBeInTheDocument();
      expect(screen.getByText('yoon²極メニュー')).toBeInTheDocument();
      expect(screen.getByText('耳つぼ（付け放題）')).toBeInTheDocument();
    });
  });

  test('displays course details correctly', async () => {
    render(<CoursePage onNavigate={mockOnNavigate} />);
    
    await waitFor(() => {
      expect(screen.getByText('¥8,000')).toBeInTheDocument();
      expect(screen.getByText('90分')).toBeInTheDocument();
      expect(screen.getByText('イヤーエステと耳つぼの組み合わせ')).toBeInTheDocument();
    });
  });

  test('filters courses by category', async () => {
    render(<CoursePage onNavigate={mockOnNavigate} />);
    
    await waitFor(() => {
      expect(screen.getByText('すべて')).toBeInTheDocument();
      expect(screen.getByText('おすすめメニュー')).toBeInTheDocument();
      expect(screen.getByText('耳つぼ')).toBeInTheDocument();
    });

    const recommendButton = screen.getByText('おすすめメニュー');
    fireEvent.click(recommendButton);

    await waitFor(() => {
      expect(screen.getByText('yoon²極メニュー')).toBeInTheDocument();
      expect(screen.queryByText('耳つぼ（付け放題）')).not.toBeInTheDocument();
    });
  });

  test('navigates to booking when course button is clicked', async () => {
    render(<CoursePage onNavigate={mockOnNavigate} />);
    
    await waitFor(() => {
      const bookingButtons = screen.getAllByText('予約する');
      fireEvent.click(bookingButtons[0]);
      expect(mockOnNavigate).toHaveBeenCalledWith('booking');
    });
  });

  test('navigates back to home when back button is clicked', async () => {
    render(<CoursePage onNavigate={mockOnNavigate} />);
    
    await waitFor(() => {
      const backButton = screen.getByText('← ホームに戻る');
      fireEvent.click(backButton);
      expect(mockOnNavigate).toHaveBeenCalledWith('home');
    });
  });

  test('displays error message when loading fails', async () => {
    courseService.getAllCourses.mockResolvedValue({
      success: false,
      error: 'Failed to load courses'
    });

    render(<CoursePage onNavigate={mockOnNavigate} />);
    
    await waitFor(() => {
      expect(screen.getByText('エラーが発生しました')).toBeInTheDocument();
      expect(screen.getByText('Failed to load courses')).toBeInTheDocument();
    });
  });
});
