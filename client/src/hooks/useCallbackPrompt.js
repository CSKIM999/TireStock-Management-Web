import { useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { useBlocker } from "./useBlocker";

export const useCallbackPrompt = (when) => {
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [blockedLocation, setBlockedLocation] = useState(null);

  const cancelNavigation = useCallback(() => {
    setShowPrompt(false);
    setBlockedLocation(null);
  }, []);
  const confirmNavigation = useCallback(() => {
    if (blockedLocation) {
      blockedLocation.retry();
      cancelNavigation(); // 클린업
    }
  }, [blockedLocation]);

  const blocker = useCallback(
    (tx) => {
      console.log("in blocker", tx);
      if (tx.location.pathname !== location.pathname) {
        setBlockedLocation(tx);
        setShowPrompt(true);
      }
    },
    [location]
  );

  useBlocker(blocker, when);

  return [showPrompt, confirmNavigation, cancelNavigation];
};
