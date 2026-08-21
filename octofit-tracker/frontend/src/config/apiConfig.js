/**
 * API Configuration
 * 
 * IMPORTANT: Set VITE_CODESPACE_NAME in .env.local
 * Example: VITE_CODESPACE_NAME=legendary-meme-7vjv74px7rqcp57w
 * 
 * This will generate: https://legendary-meme-7vjv74px7rqcp57w-8000.app.github.dev/api
 * 
 * Without VITE_CODESPACE_NAME, falls back to localhost: http://localhost:8000/api
 */

export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName && codespaceName !== 'undefined') {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
}

/**
 * Fetch data from API endpoint
 * Handles both paginated and array responses
 */
export async function fetchFromApi(endpoint) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Handle both array and paginated responses
    return Array.isArray(data) ? data : data.data || data.results || [];
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    throw error;
  }
}

/**
 * Post data to API endpoint
 */
export async function postToApi(endpoint, payload) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to post to ${url}:`, error);
    throw error;
  }
}
