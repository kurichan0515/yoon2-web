import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';

// Mock window.matchMedia for responsive design testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('Header Component', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  test('renders header with logo and navigation', () => {
    render(<Header currentPage="home" onPageChange={mockOnPageChange} />);
    
    expect(screen.getByText('yoon²')).toBeInTheDocument();
    expect(screen.getByText('ear esthetic & acupressure salon')).toBeInTheDocument();
    expect(screen.getByText('ホーム')).toBeInTheDocument();
    expect(screen.getByText('店舗情報')).toBeInTheDocument();
  });

  test('displays mobile menu toggle button', () => {
    render(<Header currentPage="home" onPageChange={mockOnPageChange} />);
    
    const mobileToggle = screen.getByLabelText('Toggle menu');
    expect(mobileToggle).toBeInTheDocument();
  });

  test('toggles mobile menu when toggle button is clicked', () => {
    render(<Header currentPage="home" onPageChange={mockOnPageChange} />);
    
    const mobileToggle = screen.getByLabelText('Toggle menu');
    const nav = screen.getByRole('navigation');
    
    // Initially closed
    expect(nav).not.toHaveClass('header-nav-open');
    
    // Click to open
    fireEvent.click(mobileToggle);
    expect(nav).toHaveClass('header-nav-open');
    
    // Click to close
    fireEvent.click(mobileToggle);
    expect(nav).not.toHaveClass('header-nav-open');
  });

  test('calls onPageChange when navigation item is clicked', () => {
    render(<Header currentPage="home" onPageChange={mockOnPageChange} />);
    
    const shopButton = screen.getByText('店舗情報');
    fireEvent.click(shopButton);
    
    expect(mockOnPageChange).toHaveBeenCalledWith('shop');
  });

  test('closes mobile menu when navigation item is clicked', () => {
    render(<Header currentPage="home" onPageChange={mockOnPageChange} />);
    
    const mobileToggle = screen.getByLabelText('Toggle menu');
    const nav = screen.getByRole('navigation');
    
    // Open menu
    fireEvent.click(mobileToggle);
    expect(nav).toHaveClass('header-nav-open');
    
    // Click navigation item
    const homeButton = screen.getByText('ホーム');
    fireEvent.click(homeButton);
    
    // Menu should be closed
    expect(nav).not.toHaveClass('header-nav-open');
  });

  test('shows active state for current page', () => {
    render(<Header currentPage="shop" onPageChange={mockOnPageChange} />);
    
    const shopButton = screen.getByText('店舗情報');
    const homeButton = screen.getByText('ホーム');
    
    expect(shopButton).toHaveClass('active');
    expect(homeButton).not.toHaveClass('active');
  });
});

describe('Header Mobile Menu - Course Creation Feature', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  test('displays course creation link in mobile menu', () => {
    render(<Header currentPage="home" onPageChange={mockOnPageChange} />);
    
    // Open mobile menu
    const mobileToggle = screen.getByLabelText('Toggle menu');
    fireEvent.click(mobileToggle);
    
    // Check if course creation link exists
    expect(screen.getByText('コース作成')).toBeInTheDocument();
  });

  test('navigates to course creation page when clicked', () => {
    render(<Header currentPage="home" onPageChange={mockOnPageChange} />);
    
    // Open mobile menu
    const mobileToggle = screen.getByLabelText('Toggle menu');
    fireEvent.click(mobileToggle);
    
    // Click course creation link
    const courseCreateButton = screen.getByText('コース作成');
    fireEvent.click(courseCreateButton);
    
    expect(mockOnPageChange).toHaveBeenCalledWith('course-create');
  });

  test('closes mobile menu when course creation is clicked', () => {
    render(<Header currentPage="home" onPageChange={mockOnPageChange} />);
    
    const mobileToggle = screen.getByLabelText('Toggle menu');
    const nav = screen.getByRole('navigation');
    
    // Open menu
    fireEvent.click(mobileToggle);
    expect(nav).toHaveClass('header-nav-open');
    
    // Click course creation
    const courseCreateButton = screen.getByText('コース作成');
    fireEvent.click(courseCreateButton);
    
    // Menu should be closed
    expect(nav).not.toHaveClass('header-nav-open');
  });
});

