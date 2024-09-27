import { useState } from 'react';

export const useFetch = (callback: () => void) => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetching = async () => {
    try {
      setIsLoading(true)
      await callback()
    } catch (e) {

      setError(e.message);
    } finally {
      setIsLoading(false)
    }
  }

  return [fetching, isLoading, error] as const;
}