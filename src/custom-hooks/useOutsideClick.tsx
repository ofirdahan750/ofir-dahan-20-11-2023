import { useEffect } from "react";

const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetElement = event.target as HTMLElement;
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !ref.current.contains(event.target as Node) &&
        !targetElement.closest(".PrivateSwitchBase-input") &&
        !targetElement.closest(".MuiTypography-root") &&
        !targetElement.closest(".MuiList-root") &&
        !targetElement.closest(".MuiBackdrop-root")
      ) {
        callback();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [ref, callback]);
};

export default useOutsideClick;
