import { useEffect, useRef } from "react";
import Hls from "hls.js";
/**
 * hls Player에 세그먼트를 직접 관리하여, thumbnail을 생성해주는 컴포넌트입니다.
 * url을 입력하면 첫번째 세그먼트만 요청하고 추가 세그먼트 요청을 중지하여, 영상의 첫 프레임만 가져온 상태에서
 * autoPlay와 control을 false 로 첫 프레임을 썸네일로 만들어주는 원리입니다.
 * */
export function ThumbnailViewer(props: {
  sourceUrl: string;
  muted: boolean;
  width: number;
  height: number;
  className?: string;
}) {
  const { className, sourceUrl, muted, width, height } = props;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // HLS.js 지원 여부 확인
      if (Hls.isSupported()) {
        const hls = new Hls({
          autoStartLoad: true, // 자동 로드를 활성화하여 첫 번째 세그먼트만 요청
          startLevel: -1, // 첫 번째 품질 레벨을 자동 선택하도록 설정
        });

        let firstFragmentLoaded = false;

        // 첫 번째 세그먼트 로드 후 추가 요청을 방지
        hls.on(Hls.Events.FRAG_LOADING, () => {
          if (!firstFragmentLoaded) {
            firstFragmentLoaded = true;
          } else {
            hls.stopLoad(); // 첫 번째 세그먼트 로드 후 추가 세그먼트 로드를 멈춤
          }
        });

        hls.loadSource(sourceUrl); // 비디오 소스 로드
        hls.attachMedia(videoRef.current); // 비디오 요소에 연결
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        // Safari에서 기본적으로 HLS 지원
        videoRef.current.src = sourceUrl;
      }
    }
  }, [sourceUrl]);

  return (
    <video
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
