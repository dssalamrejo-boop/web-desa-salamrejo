'use client';
import { useState, useEffect, useCallback } from 'react';
import { getDataSync, getDataAsync, saveData as storeSaveData } from '@/lib/dataStore';

/**
 * React hook for using the shared data store.
 * Automatically loads from localStorage synchronously, then fetches fresh data from Supabase.
 * Also listens for changes from other components/tabs.
 * 
 * @param {string} key - The data store key (e.g., 'aparatur', 'galeri')
 * @returns {[any, Function, boolean]} - [data, setData, loaded]
 */
export function useDataStore(key) {
  // Init with synchronous local storage to prevent UI flash
  const [data, setDataState] = useState(() => getDataSync(key));
  const [loaded, setLoaded] = useState(false);

  // Fetch from Supabase asynchronously
  useEffect(() => {
    let isMounted = true;
    
    // First set sync data to ensure UI has something instantly
    setDataState(getDataSync(key));
    
    // Then fetch async data from Supabase
    getDataAsync(key).then(asyncData => {
      if (isMounted) {
        setDataState(asyncData);
        setLoaded(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [key]);

  // Listen for changes from other components (broadcasted via custom event)
  useEffect(() => {
    const handler = (e) => {
      if (e.detail?.key === key || e.detail?.key === '*') {
        setDataState(getDataSync(key));
      }
    };
    window.addEventListener('desa-data-change', handler);
    
    // Cross-tab sync via storage event
    const storageHandler = (e) => {
      if (e.key === `desa_salamrejo_${key}`) {
        setDataState(getDataSync(key));
      }
    };
    window.addEventListener('storage', storageHandler);
    
    return () => {
      window.removeEventListener('desa-data-change', handler);
      window.removeEventListener('storage', storageHandler);
    };
  }, [key]);

  // Save wrapper (writes to local storage instantly, syncs to Supabase in background)
  const setData = useCallback((newData) => {
    const resolved = typeof newData === 'function' ? newData(getDataSync(key)) : newData;
    setDataState(resolved);
    storeSaveData(key, resolved);
  }, [key]);

  return [data, setData, loaded];
}
