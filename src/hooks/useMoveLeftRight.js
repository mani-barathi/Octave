import { useState, useEffect, useRef, useCallback } from "react";

// left and Right Buttons present inside NewReleases, ArtistPage,RecentlyPlayed
function useMoveLeftRight() {
  const [leftBtn, setLeftBtn] = useState(false);
  const [rightBtn, setRightBtn] = useState(false);
  const rowRef = useRef();

  useEffect(() => {
    window.addEventListener("resize", toggleButtonOnWindowResize);
    return () =>
      window.removeEventListener("resize", toggleButtonOnWindowResize);
  }, []);

  const scrollLeft = () => {
    rowRef.current.scrollLeft -= 600;
    const hasMoreLeft = rowRef.current.scrollLeft > 600;
    setLeftBtn(hasMoreLeft);
    setRightBtn(true);
  };

  const scrollRight = () => {
    const offsetWidth = rowRef.current.offsetWidth;
    rowRef.current.scrollLeft += 600;
    const hasMoreRight =
      rowRef.current.scrollWidth - (offsetWidth + rowRef.current.scrollLeft) >
      600;
    setRightBtn(hasMoreRight);
    setLeftBtn(true);
  };

  const toggleButtonOnWindowResize = () => {
    if (!rowRef.current) return;
    if (rowRef.current.scrollWidth - rowRef.current.offsetWidth > 0) {
      setRightBtn(true);
    } else {
      setRightBtn(false);
    }

    if (rowRef.current.scrollLeft > 300) {
      setLeftBtn(true);
    } else {
      setLeftBtn(false);
    }
  };

  const lastNodeRef = useCallback(() => {
    toggleButtonOnWindowResize();
  }, []);

  return { leftBtn, rightBtn, scrollLeft, scrollRight, lastNodeRef, rowRef };
}

export default useMoveLeftRight;
