import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CourseValidationError } from '../../domain/course/Course';

const mockExecute = jest.fn();
jest.mock('../../infrastructure/container', () => ({
  courseUseCases: {
    create: { execute: mockExecute },
    getAll: { execute: jest.fn().mockResolvedValue([]) },
    update: { execute: jest.fn() },
    delete: { execute: jest.fn() },
  },
}));

import CourseCreatePage from '../../views/CourseCreatePage';

describe('CourseCreatePage Component', () => {
  const mockOnNavigate = jest.fn();

  const fillForm = () => {
    fireEvent.change(screen.getByLabelText(/コース名/), { target: { value: 'Test Course' } });
    fireEvent.change(screen.getByLabelText(/説明/), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/価格/), { target: { value: '5000' } });
    fireEvent.change(screen.getByLabelText(/時間/), { target: { value: '60分' } });
  };

  beforeEach(() => {
    mockOnNavigate.mockClear();
    mockExecute.mockResolvedValue({ id: '1', name: 'Test Course' });
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
    mockExecute.mockRejectedValueOnce(new CourseValidationError({
      name: 'コース名は必須です',
      description: '説明は必須です',
      price: '価格は0より大きい値である必要があります',
      duration: '時間は必須です',
    }));
    render(<CourseCreatePage onNavigate={mockOnNavigate} />);
    fireEvent.click(screen.getByText('コースを作成'));
    await waitFor(() => {
      expect(screen.getByText('コース名は必須です')).toBeInTheDocument();
      expect(screen.getByText('説明は必須です')).toBeInTheDocument();
      expect(screen.getByText('価格は0より大きい値である必要があります')).toBeInTheDocument();
      expect(screen.getByText('時間は必須です')).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    render(<CourseCreatePage onNavigate={mockOnNavigate} />);
    fillForm();
    fireEvent.click(screen.getByText('コースを作成'));
    await waitFor(() => {
      expect(mockExecute).toHaveBeenCalled();
    });
  });

  test('displays success message after successful creation', async () => {
    render(<CourseCreatePage onNavigate={mockOnNavigate} />);
    fillForm();
    fireEvent.click(screen.getByText('コースを作成'));
    await waitFor(() => {
      expect(screen.getByText('コースが正常に作成されました！')).toBeInTheDocument();
    });
  });

  test('displays error message when creation fails', async () => {
    mockExecute.mockRejectedValueOnce(new Error('Creation failed'));
    render(<CourseCreatePage onNavigate={mockOnNavigate} />);
    fillForm();
    fireEvent.click(screen.getByText('コースを作成'));
    await waitFor(() => {
      expect(screen.getByText('エラー: Creation failed')).toBeInTheDocument();
    });
  });

  test('handles image file upload', () => {
    render(<CourseCreatePage onNavigate={mockOnNavigate} />);
    const fileInput = screen.getByLabelText(/画像/);
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(fileInput).toBeInTheDocument();
  });
});
