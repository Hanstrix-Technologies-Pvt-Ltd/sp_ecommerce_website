"use client";

import { useEffect, useState } from "react";

const LAPTOP_UI_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

export function useIsLaptopUI(): boolean {
  const [isLaptopUI, setIsLaptopUI] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia(LAPTOP_UI_QUERY);
    const update = (): void => setIsLaptopUI(mq.matches);

    update();

    const listener = (): void => update();

    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", listener);
      return () => mq.removeEventListener("change", listener);
    }

    if (typeof mq.addListener === "function") {
      mq.addListener(listener);
      return () => mq.removeListener(listener);
    }

    return undefined;
  }, []);

  return isLaptopUI;
}
