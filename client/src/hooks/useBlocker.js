import { useContext, useEffect } from "react";
import { UNSAFE_NavigationContext } from "react-router-dom";

/**
 * 오직 PostPage 를 위해 존재하는 hook.
 * @param {*} blocker
 * @param {*} when
 */
export const useBlocker = (blocker, when = true) => {
  const { navigator } = useContext(UNSAFE_NavigationContext);

  useEffect(() => {
    if (!when) return;

    console.log("USEBLOCKER");
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
