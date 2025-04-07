import { useEffect, useRef } from "react";
import { LogoIcon } from "../../components/Logo/LogoIcon";
import defaultCursor from "./defaultCursor.png"; // 기본 커서 이미지
import { useCursor } from "../../Context/CursorContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "@emotion/styled";

export function Cursor() {
  const { isPointer, isLike, isVideo } = useCursor();
  const cursorRef = useRef<HTMLDivElement>(null);
  const isPhone = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    const animateCursor = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.left = `${e.pageX}px`;
      cursorRef.current.style.top = `${e.pageY}px`;
    };

    window.addEventListener("mousemove", animateCursor);

    return () => {
      window.removeEventListener("mousemove", animateCursor);
    };
  }, []);

  const CursorSelector = () => {
    if (isVideo) {
      return <></>;
    } else if (isPointer && !isPhone) {
      return <PointerCursor />;
    } else if (isLike) {
      return <FavoriteCursor />;
    } else {
      return <DefaultCursor />;
    }
  };

  return (
    <>
      {!isPhone && (
        <StyledCursor ref={cursorRef}>{CursorSelector()}</StyledCursor>
      )}
    </>
  );
}

const StyledCursor = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
`;

function PointerCursor() {
  return <LogoIcon width={20 * 1.3} height={20} />;
}

function FavoriteCursor() {
  return <FavoriteIcon color="error" fontSize="small" />;
}

function DefaultCursor() {
  return <img src={defaultCursor} alt="defaultCursor" />;
}
