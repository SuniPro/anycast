import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useLocation } from "react-router-dom";

// 커서 상태를 관리하는 Context
interface CursorContextType {
  isPointer: boolean;
  setIsPointer: React.Dispatch<React.SetStateAction<boolean>>;
  isGrab: boolean;
  setIsGrab: React.Dispatch<React.SetStateAction<boolean>>;
  isLike: boolean;
  setIsLike: React.Dispatch<React.SetStateAction<boolean>>;
  isVideo: boolean;
  setIsVideo: React.Dispatch<React.SetStateAction<boolean>>;
}

// 초기 값 설정
const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [isPointer, setIsPointer] = useState(false);
  const [isGrab, setIsGrab] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isVideo, setIsVideo] = useState(false);

  useEffect(() => {
    setIsPointer(false);
    setIsPointer(false);
    setIsGrab(false);
    setIsVideo(false);
  }, [location]);

  return (
    <CursorContext.Provider
      value={{
        isPointer,
        setIsPointer,
        isGrab,
        setIsGrab,
        isLike,
        setIsLike,
        isVideo,
        setIsVideo,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

// 커서 상태를 쉽게 사용할 수 있도록 하는 custom hook
export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
