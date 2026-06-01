import '@testing-library/jest-dom';

// jsdom で未実装のAPIをモック
Object.defineProperty(window, 'scrollTo', { value: jest.fn(), writable: true });

const mockIntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn(),
}));
Object.defineProperty(window, 'IntersectionObserver', { value: mockIntersectionObserver, writable: true });
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false, media: query, onchange: null,
    addListener: jest.fn(), removeListener: jest.fn(),
    addEventListener: jest.fn(), removeEventListener: jest.fn(), dispatchEvent: jest.fn(),
  })),
});
