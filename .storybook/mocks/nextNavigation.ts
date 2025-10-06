export const useRouter = () => ({
  push: () => {},
  back: () => {},
  forward: () => {},
  refresh: () => {},
  replace: () => {},
  prefetch: () => {}
});

export const usePathname = () => '';
export const useSearchParams = () => ({
  get: () => null,
  toString: () => ''
});
