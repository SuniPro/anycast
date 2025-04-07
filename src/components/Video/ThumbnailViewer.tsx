import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { useCursor } from "../../Context/CursorContext";
import { HlsPlayerType } from "./HlsPlayer";

/**
 * hls Player에 세그먼트를 직접 관리하여, thumbnail을 생성해주는 컴포넌트입니다.
 * url을 입력하면 첫번째 세그먼트만 요청하고 추가 세그먼트 요청을 중지하여, 영상의 첫 프레임만 가져온 상태에서
 * autoPlay와 control을 false 로 첫 프레임을 썸네일로 만들어주는 원리입니다.
 * */
export function ThumbnailViewer(props: HlsPlayerType) {
  const { className, hlsPath, muted, width, height } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const firstSegmentLoadedRef = useRef<boolean>(false);
  const { setIsVideo } = useCursor();

  useEffect(() => {
    if (!videoRef.current) return;
    firstSegmentLoadedRef.current = false;
    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls({
        autoStartLoad: true,
        startLevel: -1,
      });

      const handleFragLoaded = () => {
        if (!firstSegmentLoadedRef.current) {
          firstSegmentLoadedRef.current = true;
        } else {
          hls.stopLoad(); // 더 확실히 끊어줌
          hls.off(Hls.Events.FRAG_LOADED, handleFragLoaded); // 🧼 이벤트도 해제
        }
      };

      hls.on(Hls.Events.FRAG_LOADED, handleFragLoaded);
      hls.loadSource(hlsPath);
      hls.attachMedia(video);

      return () => {
        hls.off(Hls.Events.FRAG_LOADED, handleFragLoaded);
        hls.destroy();
        video.pause();
        video.src = "";
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsPath;
    }
  }, [hlsPath]);

  return (
    <video
      onMouseEnter={() => setIsVideo(true)}
      onMouseLeave={() => setIsVideo(false)}
      className={className}
      ref={videoRef}
      controls={false}
      autoPlay={false}
      muted={muted}
      width={width}
      height={height}
      style={{ backgroundColor: "black" }}
      loop={true}
    />
  );
}
