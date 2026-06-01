const useRouter = () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn(), back: jest.fn() });
const usePathname = () => '/';
const useSearchParams = () => ({ get: jest.fn() });
module.exports = { useRouter, usePathname, useSearchParams };
