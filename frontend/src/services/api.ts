
const API_URL = 'http://localhost:3000/api';

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

export const api = {
    request: async (endpoint: string, options: FetchOptions = {}) => {
        const token = localStorage.getItem('token');
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(error.error || `Request failed: ${response.status}`);
        }

        return response.json();
    },

    get: (endpoint: string) => api.request(endpoint, { method: 'GET' }),

    post: (endpoint: string, body: any) => api.request(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
    }),

    put: (endpoint: string, body: any) => api.request(endpoint, {
        method: 'PUT',
        body: JSON.stringify(body),
    }),

    delete: (endpoint: string) => api.request(endpoint, { method: 'DELETE' }),
};
