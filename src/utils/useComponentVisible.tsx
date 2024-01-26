import { useEffect, useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

export function useComponentVisible(initialIsVisible: any) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);

  const ref = useRef<any>(null);

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible, useOnClickOutside };
}
