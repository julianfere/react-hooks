import { useEffect, useState } from "react";

/**
 * Custom hook for determining the current breakpoint.
 * @returns {Breakpoint} An object containing the current breakpoint.
 * @property {boolean} isXs A boolean indicating whether the width is < 576px
 * @property {boolean} isSm A boolean indicating whether the width is >= 576px and < 768px
 * @property {boolean} isMd A boolean indicating whether the width is >= 768px and < 992px
 * @property {boolean} isLg A boolean indicating whether the width is >= 992px and < 1200px
 * @property {boolean} isXl A boolean indicating whether the width is >= 1200px
 * @example
 * function MyComponent() {
 * const { isXs, isSm, isMd, isLg, isXl } = useBreakpoint();
 *
 * return (
 *  <div>
 *   {isXs && <p>Current breakpoint is xs.</p>}
 *   {isSm && <p>Current breakpoint is sm.</p>}
 *   {isMd && <p>Current breakpoint is md.</p>}
 *   {isLg && <p>Current breakpoint is lg.</p>}
 *   {isXl && <p>Current breakpoint is xl.</p>}
 *  </div>
 * );
 * }
 */
const useBreakpoint = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowSize.width]);

  return {
    isXs: windowSize.width < 576,
    isSm: windowSize.width >= 576 && windowSize.width < 768,
    isMd: windowSize.width >= 768 && windowSize.width < 992,
    isLg: windowSize.width >= 992 && windowSize.width < 1200,
    isXl: windowSize.width >= 1200,
  };
};

export default useBreakpoint;
