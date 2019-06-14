import { useState } from 'react';

export const useIsLoadingState = value => {
  const [isLoading, setIsLoading] = useState(value);
  return [isLoading, setIsLoading];
};
