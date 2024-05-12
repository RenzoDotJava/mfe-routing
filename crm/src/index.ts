import('./bootstrap').then(
  ({ mount }) => {
    const localRoot = document.getElementById('_crm-dev-root');

    mount({
      mountPoint: localRoot!,
      routingStrategy: 'browser',
    });
  }
);

export { };