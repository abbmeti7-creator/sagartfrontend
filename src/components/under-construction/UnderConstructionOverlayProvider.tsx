"use client";

import { createContext, useContext, useState } from "react";
import UnderConstructionOverlay from "./UnderConstructionOverlay";

interface UnderConstructionContextValue {
  openUnderConstruction: () => void;
  closeUnderConstruction: () => void;
}

const UnderConstructionContext = createContext<UnderConstructionContextValue>({
  openUnderConstruction: () => {},
  closeUnderConstruction: () => {},
});

export function UnderConstructionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openUnderConstruction = () => setIsOpen(true);
  const closeUnderConstruction = () => setIsOpen(false);

  return (
    <UnderConstructionContext.Provider
      value={{ openUnderConstruction, closeUnderConstruction }}
    >
      {children}

      <UnderConstructionOverlay
        isOpen={isOpen}
        onClose={closeUnderConstruction}
      />
    </UnderConstructionContext.Provider>
  );
}

export function useUnderConstruction() {
  return useContext(UnderConstructionContext);
}