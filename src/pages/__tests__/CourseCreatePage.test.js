import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseCreatePage from '../CourseCreatePage';
import courseService from '../../services/courseService';

// Mock courseService
jest.mock('../../services/courseService');

describe('CourseCreatePage Component', () => {
  const mockOnNavigate = jest.fn();

  beforeEach(() => {
    mockOnNavigate.mockClear();
    courseService.createCourse.mockResolvedValue({
      success: true,
      data: { id: '1', name: 'Test Course' }
    });
  });

  test('renders course creation form', () => {
    render(<CourseCreatePage onNavigate={mockOnNavigate} />);
    
    expect(screen.getByText('コース作成')).toBeInTheDocument();
    expect(screen.getByLabelText(/コース名/)).toBeInTheDocument();
    expect(screen.getByLabelText(/説明/)).toBeInTheDocument();
    expect(screen.getByLabelText(/価格/)).toBeInTheDocument();
    expect(screen.getByLabelText(/時間/)).toBeInTheDocument();
    expect(screen.getByLabelText(/カテゴリ/)).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    render(<CourseCreatePage onNavigate={mockOnNavigate} />);
    
    const submitButton = screen.getByText('コースを作成');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('コース名は必須です')).toBeInTheDocument();
      expect(screen.getByText('説明は必須です')).toBeInTheDocument();
      expect(screen.getByText('価格は0より大きい値である必要があります')).toBeInTheDocument();
      expect(screen.getByText('時間は必須です')).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    render(<CourseCreatePage onNavigate={mockOnNavigate} />);
    
    // Fill form
    fireEvent.change(screen.getByLabelText(/コース名/), { target: { value: 'Test Course' } });
    fireEvent.change(screen.getByLabelText(/説明/), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/価格/), { target: { value: '5000' } });
    fireEvent.change(screen.getByLabelText(/時間/), { target: { value: '60分' } });

    const submitButton = screen.getByText('コースを作成');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(courseService.createCourse).toHaveBeenCalledWith({
        name: 'Test Course',
        description: 'Test Description',
        price: '5000',
        duration: '60分',
        category: 'recommend',
        image: ''
      });
    });
  });

  test('displays success message after successful creation', async () => {
    render(<CourseCreatePage onNavigate={mockOnNavigate} />);
    
    // Fill form
    fireEvent.change(screen.getByLabelText(/コース名/), { target: { value: 'Test Course' } });
    fireEvent.change(screen.getByLabelText(/説明/), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/価格/), { target: { value: '5000' } });
    fireEvent.change(screen.getByLabelText(/時間/), { target: { value: '60分' } });

    const submitButton = screen.getByText('コースを作成');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('コースが正常に作成されました！')).toBeInTheDocument();
    });
  });

  test('displays error message when creation fails', async () => {
    courseService.createCourse.mockResolvedValue({
      success: false,
      error: 'Creation failed'
    });

    render(<CourseCreatePage onNavigate={mockOnNavigate} />);
    
    // Fill form
    fireEvent.change(screen.getByLabelText(/コース名/), { target: { value: 'Test Course' } });
    fireEvent.change(screen.getByLabelText(/説明/), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/価格/), { target: { value: '5000' } });
    fireEvent.change(screen.getByLabelText(/時間/), { target: { value: '60分' } });

    const submitButton = screen.getByText('コースを作成');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('エラー: Creation failed')).toBeInTheDocument();
    });
  });

  test('navigates back to home when cancel button is clicked', () => {
    render(<CourseCreatePage onNavigate={mockOnNavigate} />);
    
    const cancelButton = screen.getByText('キャンセル');
    fireEvent.click(cancelButton);
    
    expect(mockOnNavigate).toHaveBeenCalledWith('home');
  });

  test('navigates back to home when back button is clicked', () => {
    render(<CourseCreatePage onNavigate={mockOnNavigate} />);
    
    const backButton = screen.getByText('← ホームに戻る');
    fireEvent.click(backButton);
    
    expect(mockOnNavigate).toHaveBeenCalledWith('home');
  });

  test('handles image file upload', () => {
    render(<CourseCreatePage onNavigate={mockOnNavigate} />);
    
    const fileInput = screen.getByLabelText(/画像/);
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // File upload is handled internally, just verify no errors
    expect(fileInput).toBeInTheDocument();
  });
});
