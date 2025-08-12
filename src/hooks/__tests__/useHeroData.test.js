import { renderHook, waitFor } from '@testing-library/react';
import useHeroData from '../useHeroData';

// Mock fetch
global.fetch = jest.fn();

describe('useHeroData Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch hero data successfully', async () => {
    const mockHeroData = {
      title: 'STUDIO PICKENS',
      subtitle: 'Creative Excellence',
      atelierTitle: 'CUSTOM ATELIER WIGS',
      atelierDescription: 'Professional wig services'
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: mockHeroData })
    });

    const { result } = renderHook(() => useHeroData());

    // Initially loading should be true
    expect(result.current.loading).toBe(true);
    expect(result.current.heroData).toBeNull();
    expect(result.current.error).toBeNull();

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.heroData).toEqual(mockHeroData);
    expect(result.current.error).toBeNull();
    expect(fetch).toHaveBeenCalledWith('/api/hero');
  });

  test('should handle fetch error', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useHeroData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.heroData).toBeNull();
    expect(result.current.error).toBe('Network error');
  });

  test('should handle API error response', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ success: false, error: 'Internal server error' })
    });

    const { result } = renderHook(() => useHeroData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.heroData).toBeNull();
    expect(result.current.error).toBe('Failed to load hero data');
  });

  test('should handle invalid JSON response', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => { throw new Error('Invalid JSON'); }
    });

    const { result } = renderHook(() => useHeroData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.heroData).toBeNull();
    expect(result.current.error).toBe('Invalid JSON');
  });

  test('should provide updateHeroData function', async () => {
    const mockHeroData = {
      title: 'STUDIO PICKENS',
      subtitle: 'Creative Excellence',
      atelierTitle: 'CUSTOM ATELIER WIGS',
      atelierDescription: 'Professional wig services'
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, data: mockHeroData })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: 'Updated successfully' })
      });

    const { result } = renderHook(() => useHeroData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const updatedData = { ...mockHeroData, title: 'UPDATED STUDIO PICKENS' };
    
    await result.current.updateHeroData(updatedData);

    expect(fetch).toHaveBeenCalledWith('/api/hero/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': expect.stringContaining('Bearer ')
      },
      body: JSON.stringify(updatedData)
    });
  });
});