import Hls from "hls.js";
import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { css, Theme, useTheme } from "@emotion/react";

interface HlsPlayerType {
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const theme = useTheme();

  const streamingPath = import.meta.env.VITE_STREAMING_SERVER_PREFIX;

  useEffect(() => {
    const isExternal = hlsPath.includes("soop"); // ✅ 외부 URL인지 확인
    const encodedUrl = encodeURIComponent(hlsPath);
    const sourceUrl = isExternal
      ? `${streamingPath}/broadcast/soop?url=${encodedUrl}`
      : hlsPath;

    if (videoRef.current) {
      if (!autoPlay) return;
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(sourceUrl);
        hls.attachMedia(videoRef.current);
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = sourceUrl;
      }
    }
  }, [autoPlay, hlsPath, streamingPath]);

  return (
    <StyledVideo
      className={className}
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

// noinspection CssInvalidPseudoSelector
const StyledVideo = styled.video<{ theme: Theme }>(
  ({ theme }) => css`
    background-color: ${theme.colors.black};

    cursor: none;

    &::-webkit-media-controls-timeline {
      cursor: none;
    }

    &::-webkit-media-controls-panel {
      cursor: none;
    }

    &::-webkit-media-controls-play-button {
      cursor: none;
    }

    &::-webkit-media-controls-volume-slider-container {
      cursor: none;
    }

    &::-webkit-media-controls-volume-slider {
      cursor: none;
    }

    &::-webkit-media-controls-mute-button {
      cursor: none;
    }

    &::-webkit-media-controls-current-time-display {
      cursor: none;
    }

    &::-webkit-media-controls-fullscreen-button {
      cursor: none;
    }

    &::-webkit-media-controls-rewind-button {
      cursor: none;
    }

    &::-webkit-media-controls-return-to-realtime-button {
      cursor: none;
    }

    &::-webkit-media-controls-toggle-closed-captions-button {
      cursor: none;
    }

    &::-webkit-media-controls-timeline-container {
      cursor: none;
    }

    &::-webkit-media-controls-seek-back-button {
      cursor: none;
    }

    &::-webkit-media-controls-time-remaining-display {
      cursor: none;
    }

    &::-webkit-media-controls-panel {
      cursor: none;
    }
  `,
);
