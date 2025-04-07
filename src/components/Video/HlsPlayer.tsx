import styled from "@emotion/styled";
import { css, Theme, useTheme } from "@emotion/react";
import { useCursor } from "../../Context/CursorContext";
import { HlsPlayerMode, useHlsPlayer } from "../../hooks/useHlsPlayer";
import { useRef } from "react";

export interface HlsPlayerType {
  className?: string;
  hlsPath: string;
  hlsPathSub: string;
  width: number;
  height: number;
  muted: boolean;
  controls: boolean;
  autoPlay?: boolean;
}

export function HlsPlayer(props: HlsPlayerType) {
  const {
    className,
    hlsPath,
    width,
    height,
    muted,
    controls,
    autoPlay = true,
  } = props;
  const { setIsVideo } = useCursor();
  const theme = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mode: HlsPlayerMode = hlsPath.includes("soop")
    ? "lowLatency"
    : "default";
  useHlsPlayer(videoRef, hlsPath, autoPlay, mode);

  return (
    <StyledVideo
      className={className}
      onMouseEnter={() => setIsVideo(true)}
      onMouseLeave={() => setIsVideo(false)}
      ref={videoRef}
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      width={width}
      height={height}
      theme={theme}
    />
  );
}

const StyledVideo = styled.video<{ theme: Theme }>(
  ({ theme }) => css`
    background-color: ${theme.colors.black};
    cursor: default;
  `,
);
