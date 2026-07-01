import { persistAuthData } from './authStorage';

describe('auth storage helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('persists a token from a nested auth response and stores the user payload', () => {
    const response = {
      success: true,
      data: {
        token: 'abc123',
        user: { id: 1, name: 'Test User' },
      },
    };

    const normalized = persistAuthData(response);

    expect(normalized.token).toBe('abc123');
    expect(localStorage.getItem('token')).toBe('abc123');

    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
    expect(savedUser.token).toBe('abc123');
    expect(savedUser.user).toEqual({ id: 1, name: 'Test User' });
  });
});
