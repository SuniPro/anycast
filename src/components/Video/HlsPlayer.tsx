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
        maxBufferLength: 20,
        liveSyncDurationCount: 5, // 여유 있게 10초
        liveMaxLatencyDurationCount: 20, // 최대 20초까지 허용
        autoStartLoad: true,
        lowLatencyMode: true,
      });

      // ✅ 이벤트 로그 추가 부분
      hls.on(Hls.Events.FRAG_LOADED, (_, data) => {
        console.log("📦 TS 로드 완료:", data.frag.url);
      });

      hls.on(Hls.Events.BUFFER_APPENDED, () => {
        console.log("💾 버퍼에 추가됨");
      });

      hls.on(Hls.Events.BUFFER_EOS, () => {
        console.log("🔚 버퍼 끝 도달");
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.warn("⛔ [HLS] Buffer Stalled! 🚨", event);
        console.warn("⛔ [HLS] Buffer Stalled! 🚨", data);
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
