const configuredApiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const apiUrl = (path) => `${configuredApiUrl}${path}`;

export const websocketUrl = (path) => {
  const configuredWebsocketUrl = (import.meta.env.VITE_WS_URL || '').replace(/\/$/, '');

  if (configuredWebsocketUrl) return `${configuredWebsocketUrl}${path}`;
  if (configuredApiUrl) {
    const url = new URL(configuredApiUrl);
    url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
    url.pathname = path;
    url.search = '';
    url.hash = '';
    return url.toString();
  }

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}://${window.location.host}${path}`;
};
