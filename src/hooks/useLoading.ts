import { useState } from 'react';

export const useLoading = () => {
  const [apiStatus, setApiStatus] = useState<
    'idle' | 'pending' | 'resolved' | 'rejected'
  >('idle');

  const setIdle = () => {
    setApiStatus('idle');
  };
  const setPending = () => {
    setApiStatus('pending');
  };
  const setResolved = () => {
    setApiStatus('rejected');
  };
  const setRejected = () => {
    setApiStatus('rejected');
  };

  return {
    apiStatus,
    setIdle,
    setPending,
    setResolved,
    setRejected,
  };
};
