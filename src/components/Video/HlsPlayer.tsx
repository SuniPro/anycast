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
        maxBufferLength: 10,
        maxMaxBufferLength: 30,
        liveSyncDurationCount: 8, // TS 조각의 평균 크기인 8초
        liveMaxLatencyDurationCount: 20, // 지연도 20초 까지 허용해서 넉넉히 TS 세그먼트 두개 분량을 계산합니다.
        autoStartLoad: true,
        lowLatencyMode: true,
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

    // HLS.js 지원 안될 때만 native HLS 사용 (예: Safari)
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
