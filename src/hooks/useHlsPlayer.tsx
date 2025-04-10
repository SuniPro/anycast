import Hls from "hls.js";
import { RefObject, useEffect, useRef } from "react";

export type HlsPlayerMode = "default" | "thumbnail" | "lowLatency";

export function useHlsPlayer(
  videoRef: RefObject<HTMLVideoElement | null>,
  hlsPath: string,
  autoPlay: boolean,
  mode: HlsPlayerMode,
) {
  const streamingPath = import.meta.env.VITE_STREAMING_SERVER_PREFIX;
  const firstSegmentLoadedRef = useRef(false);

  useEffect(() => {
    if (!videoRef.current) return;
    const videoEl = videoRef.current;
    const isLowLatency = mode === "lowLatency";
    const isThumbnail = mode === "thumbnail";
    const encodedUrl = encodeURIComponent(hlsPath);
    const sourceUrl = isLowLatency
      ? `${streamingPath}/broadcast/soop?url=${encodedUrl}`
      : hlsPath;

    /* 썸네일만 보여주는 설명입니다.
     * 세그먼트를 한번만 요청하고 끊어주기 때문에
     * 브라우저의 네트워크 부담을 줄여줍니다.
     *  */
    if (isThumbnail) {
      firstSegmentLoadedRef.current = false;

      if (Hls.isSupported()) {
        const hls = new Hls({
          autoStartLoad: true,
          startLevel: -1,
        });

        const handleFragLoaded = () => {
          if (!firstSegmentLoadedRef.current) {
            firstSegmentLoadedRef.current = true;
          } else {
            hls.stopLoad();
            hls.off(Hls.Events.FRAG_LOADED, handleFragLoaded);
          }
        };

        hls.on(Hls.Events.FRAG_LOADED, handleFragLoaded);
        setTimeout(() => {
          hls.loadSource(sourceUrl);
          hls.attachMedia(videoEl);
        }, 0);

        return () => {
          hls.off(Hls.Events.FRAG_LOADED, handleFragLoaded);
          hls.destroy();
          videoEl.pause();
          videoEl.src = "";
        };
      } else if (videoEl.canPlayType("application/vnd.apple.mpegurl")) {
        videoEl.src = hlsPath;
      }
    } else {
      const hls = new Hls({
        lowLatencyMode: mode === "default", // ❗ lowLatencyMode는 false여야 함 (soop에서)
        backBufferLength: 60, // 뒤로 1분까지 캐시
        maxBufferLength: 45, // 최대 버퍼 확보량 45초
        liveSyncDurationCount: 5, // 엣지에서 10초(2s segment 기준) 뒤에서 재생
        liveMaxLatencyDurationCount: 12, // 최대 허용 지연 24초
        autoStartLoad: true,
      });

      /* SOOP 영상 등 TS 세그먼트 로딩이 불안정한 영상을 위한 설정입니다.
       * 12 초정도 뒤에서 영상을 시작하기 때문에 네트워크의 불안정으로부터 다소 안전합니다.
       * */
      if (isLowLatency) {
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const liveEdge =
            hls.liveSyncPosition || videoEl.duration - videoEl.currentTime || 0;
          hls.startLoad(Math.max(0, liveEdge - 20));
        });
      }

      setTimeout(() => {
        hls.loadSource(sourceUrl);
        hls.attachMedia(videoEl);
      }, 0);

      return () => {
        hls.destroy();
        videoEl.pause();
        videoEl.removeAttribute("src");
        videoEl.load();
      };
    }
  }, [videoRef, hlsPath, mode, autoPlay, streamingPath]);
}
