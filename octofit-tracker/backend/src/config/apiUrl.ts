/**
 * Get the API base URL based on environment
 * Uses Codespaces URLs when available, otherwise defaults to localhost
 */
export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;
  
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  
  return 'http://localhost:8000';
}
