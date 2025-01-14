'use client';
import { useEffect, useState } from 'react';

export const useProfile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch('/api/profile').then((response) => {
      response.json().then((data) => {
        setData(data);
        setLoading(false);
      });
    });
  }, []);

  return { loading, data };
};
