"use client";

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

type LoadingContextType = {
  loaders: string[];
  isLoading: (name?: string) => boolean;
  start: (name?: string) => void;
  stop: (name?: string) => void;
  reset: () => void;
};

const LoadingContext = createContext<LoadingContextType>({
  loaders: [],
  isLoading: () => false,
  start: () => {},
  stop: () => {},
  reset: () => {},
});

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loaders, setLoaders] = useState<string[]>([]);

  const isLoading = useCallback(
    (name = "app") => loaders.includes(name),
    [loaders]
  );

  const start = (name = "app") => {
    setLoaders((prev) => (prev.includes(name) ? prev : [...prev, name]));
  };

  const stop = (name = "app") => {
    setLoaders((prev) => prev.filter((loader) => loader !== name));
  };

  const reset = () => {
    setLoaders([]);
  };

  const value = useMemo(
    () => ({
      loaders,
      isLoading,
      start,
      stop,
      reset,
    }),
    [isLoading, loaders]
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
