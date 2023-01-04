import { useContext, useEffect, useCallback, useState } from "react";
import { UNSAFE_NavigationContext, useLocation } from "react-router-dom";

// 줜내 어렵내

// export function useBlocker(blocker, when = true) {
//   const { navigator } = useContext(UNSAFE_NavigationContext);
//   useEffect(() => {
//     if (!when) return;
//     console.log("im here", navigator);
//     const unblock = navigator.block((tx) => {
//       const autoUnblockingTx = {
//         ...tx,
//         retry() {
//           unblock();
//           tx.retry();
//         },
//       };
//       blocker(autoUnblockingTx);
//     });
//     return unblock;
//   }, [navigator, blocker, when]);
// }
export const useBlocker = (blocker, when = true) => {
  const { navigator } = useContext(UNSAFE_NavigationContext);

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
};

// export function usePrompt(message, when = true) {
//   const blocker = useCallback(
//     (tx) => {
//       console.log("in tx", tx);
//       tx.retry();
//       // if (window.confirm(message)) tx.retry();
//     },
//     [message]
//   );

//   console.log(message, "in CALLBACK");
//   useBlocker(blocker, when);
// }

export const useCallbackPrompt = (when) => {
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [blockedLocation, setBlockedLocation] = useState(null);

  const cancelNavigation = useCallback(() => {
    setShowPrompt(false);
    setBlockedLocation(null);
  }, []);

  const blocker = useCallback(
    (tx) => {
      if (tx.location.pathname !== location.pathname) {
        setBlockedLocation(tx);
        setShowPrompt(true);
      }
    },
    [location]
  );

  const confirmNavigation = useCallback(() => {
    if (blockedLocation) {
      blockedLocation.retry();
      cancelNavigation(); // 클린업
    }
  }, [blockedLocation]);

  useBlocker(blocker, when);

  return [showPrompt, confirmNavigation, cancelNavigation];
};
