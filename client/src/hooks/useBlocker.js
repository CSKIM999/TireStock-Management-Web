import { useContext, useEffect } from "react";
import { UNSAFE_NavigationContext } from "react-router-dom";

export const useBlocker = (blocker, when = true) => {
  console.log("useBlocker CALL");
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
