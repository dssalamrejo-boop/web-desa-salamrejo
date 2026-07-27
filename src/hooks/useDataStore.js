'use client';
import { useState, useEffect, useCallback } from 'react';
import { getData, saveData } from '@/lib/dataStore';

/**
 * React hook for using the shared data store.
 * Automatically loads from localStorage and saves on change.
 * Also listens for changes from other components/tabs.
 * 
 * @param {string} key - The data store key (e.g., 'aparatur', 'galeri')
 * @returns {[any, Function]} - [data, setData] similar to useState
 */
export function useDataStore(key) {
  const [data, setDataState] = useState(() => getData(key));
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount (client-side only)
  useEffect(() => {
    setDataState(getData(key));
    setLoaded(true);
  }, [key]);

  // Listen for changes from other components
  useEffect(() => {
    const handler = (e) => {
      if (e.detail?.key === key || e.detail?.key === '*') {
        setDataState(getData(key));
      }
    };
    window.addEventListener('desa-data-change', handler);
    // Also listen for storage events (cross-tab sync)
    const storageHandler = (e) => {
      if (e.key === `desa_salamrejo_${key}`) {
        setDataState(getData(key));
      }
    };
    window.addEventListener('storage', storageHandler);
    return () => {
      window.removeEventListener('desa-data-change', handler);
      window.removeEventListener('storage', storageHandler);
    };
  }, [key]);

  // Save wrapper
  const setData = useCallback((newData) => {
    const resolved = typeof newData === 'function' ? newData(getData(key)) : newData;
    saveData(key, resolved);
    setDataState(resolved);
  }, [key]);

  return [data, setData, loaded];
}
