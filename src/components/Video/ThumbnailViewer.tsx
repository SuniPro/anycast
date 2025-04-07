import { useRef } from "react";
import { useCursor } from "../../Context/CursorContext";
import { HlsPlayerType } from "./HlsPlayer";
import { useHlsPlayer } from "../../hooks/useHlsPlayer";

/**
 * hls Player에 세그먼트를 직접 관리하여, thumbnail을 생성해주는 컴포넌트입니다.
 * url을 입력하면 첫번째 세그먼트만 요청하고 추가 세그먼트 요청을 중지하여, 영상의 첫 프레임만 가져온 상태에서
 * autoPlay와 control을 false 로 첫 프레임을 썸네일로 만들어주는 원리입니다.
 * */
export function ThumbnailViewer(props: HlsPlayerType) {
  const { className, hlsPath, muted, width, height } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setIsVideo } = useCursor();
  useHlsPlayer(videoRef, hlsPath, false, "thumbnail");

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
