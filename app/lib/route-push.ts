export function pushRoute(
  router: {
    push: (href: string) => void;
  },
  href: string,
) {
  router.push(href);
}

