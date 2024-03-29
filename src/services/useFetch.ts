import { useState, useEffect } from 'react';
import { getTmdbAPIOptions } from '@/config/tmdbAPIOptions';
import { useDispatch, useSelector } from 'react-redux';

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

const useFetch = <T>(
  url: string,
  dispatchAction,
  payloadKey: string | null,
  responseDataKey?: string,
  slice?: string,
  options?: unknown
): FetchState<T> => {
  const dispatch = useDispatch();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const storeState = useSelector((state) => state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options || getTmdbAPIOptions('GET'));
        if (!response.ok) {
          throw new Error('Network Error');
        }
        const responseData = await response.json();

        if (dispatchAction && payloadKey) {
          dispatch(
            dispatchAction({
              [payloadKey]: responseDataKey
                ? responseData[responseDataKey]
                : responseData,
            })
          );
        } else if (dispatchAction) {
          dispatch(
            dispatchAction(
              responseDataKey ? responseData[responseDataKey] : responseData
            )
          );
        }

        setData(responseData);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (
      !slice ||
      !payloadKey ||
      !storeState ||
      !storeState[slice]?.[payloadKey]
    ) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
