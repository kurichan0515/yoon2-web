import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false, media: query, onchange: null,
    addListener: jest.fn(), removeListener: jest.fn(),
    addEventListener: jest.fn(), removeEventListener: jest.fn(), dispatchEvent: jest.fn(),
  })),
});

describe('Header Component', () => {
  const mockOnPageChange = jest.fn();
  beforeEach(() => { mockOnPageChange.mockClear(); });

  test('renders header with logo and navigation', () => {
    render(<Header currentPage="home" onPageChange={mockOnPageChange} />);
    expect(screen.getByText('yoon²')).toBeInTheDocument();
    expect(screen.getByText('ear esthetic & acupressure salon')).toBeInTheDocument();
    expect(screen.getByText('ホーム')).toBeInTheDocument();
    expect(screen.getByText('店舗情報')).toBeInTheDocument();
  });

  test('displays mobile menu toggle button', () => {
    render(<Header currentPage="home" onPageChange={mockOnPageChange} />);
    expect(screen.getByLabelText('Toggle menu')).toBeInTheDocument();
  });

  test('toggles mobile menu when toggle button is clicked', () => {
    render(<Header currentPage="home" onPageChange={mockOnPageChange} />);
    const toggle = screen.getByLabelText('Toggle menu');
    const nav = screen.getByRole('navigation');
    expect(nav).not.toHaveClass('header-nav-open');
    fireEvent.click(toggle);
    expect(nav).toHaveClass('header-nav-open');
    fireEvent.click(toggle);
    expect(nav).not.toHaveClass('header-nav-open');
  });

  test('calls onPageChange when navigation item is clicked', () => {
    render(<Header currentPage="home" onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByText('店舗情報'));
    expect(mockOnPageChange).toHaveBeenCalledWith('shop');
  });

  test('closes mobile menu when navigation item is clicked', () => {
    render(<Header currentPage="home" onPageChange={mockOnPageChange} />);
    const toggle = screen.getByLabelText('Toggle menu');
    const nav = screen.getByRole('navigation');
    fireEvent.click(toggle);
    expect(nav).toHaveClass('header-nav-open');
    fireEvent.click(screen.getByText('ホーム'));
    expect(nav).not.toHaveClass('header-nav-open');
  });

  test('shows active state for current page', () => {
    render(<Header currentPage="shop" onPageChange={mockOnPageChange} />);
    expect(screen.getByText('店舗情報')).toHaveClass('active');
    expect(screen.getByText('ホーム')).not.toHaveClass('active');
  });
});

describe('Header Mobile Menu - Course Creation Feature', () => {
  const mockOnPageChange = jest.fn();
  beforeEach(() => { mockOnPageChange.mockClear(); });

  test('displays course creation link in mobile menu', () => {
    render(<Header currentPage="home" onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByLabelText('Toggle menu'));
    expect(screen.getByText('コース作成')).toBeInTheDocument();
  });

  test('navigates to course creation page when clicked', () => {
    render(<Header currentPage="home" onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByLabelText('Toggle menu'));
    fireEvent.click(screen.getByText('コース作成'));
    expect(mockOnPageChange).toHaveBeenCalledWith('course-create');
  });

  test('closes mobile menu when course creation is clicked', () => {
    render(<Header currentPage="home" onPageChange={mockOnPageChange} />);
    const toggle = screen.getByLabelText('Toggle menu');
    const nav = screen.getByRole('navigation');
    fireEvent.click(toggle);
    expect(nav).toHaveClass('header-nav-open');
    fireEvent.click(screen.getByText('コース作成'));
    expect(nav).not.toHaveClass('header-nav-open');
  });
});
