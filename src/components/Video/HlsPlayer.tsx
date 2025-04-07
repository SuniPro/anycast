import Hls from "hls.js";
import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { css, Theme, useTheme } from "@emotion/react";
import { useCursor } from "../../Context/CursorContext";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setIsVideo } = useCursor();
  const theme = useTheme();
  const streamingPath = import.meta.env.VITE_STREAMING_SERVER_PREFIX;

  useEffect(() => {
    if (!videoRef.current || !autoPlay) return;

    const video = videoRef.current;
    const isExternal = hlsPath.includes("soop");
    const encodedUrl = encodeURIComponent(hlsPath);
    const sourceUrl = isExternal
      ? `${streamingPath}/broadcast/soop?url=${encodedUrl}`
      : hlsPath;

    if (Hls.isSupported()) {
      const hls = new Hls({
        maxBufferLength: 30, // 너무 작으면 버퍼링, 너무 크면 느려질 수 있음
        liveSyncDurationCount: 5, // 10초 지연
        liveMaxLatencyDurationCount: 15, // 최대 30초까지 허용
        autoStartLoad: true,
        lowLatencyMode: true, // 라이브 스트리밍에는 보통 이걸 켜요
      });

      hls.loadSource(sourceUrl);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
        video.pause();
        video.removeAttribute("src");
        video.load();
      };
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = sourceUrl;
    }

    return () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [autoPlay, hlsPath, streamingPath]);

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
