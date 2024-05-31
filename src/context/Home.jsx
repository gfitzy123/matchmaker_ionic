import { createContext, useContext, useMemo, useState } from "react";

const HomeContext = createContext(null);

export function HomeProvider({ children }) {
  const [opt, setOpt] = useState(0);

  const value = useMemo(
    () => ({
      opt,
      setOpt,
    }),
    [opt, setOpt]
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export const useHomeContext = () => useContext(HomeContext);
