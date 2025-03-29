import { useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";

interface YouTubeOptionsType {
  width: number;
  height: number;
  playerVars: {
    autoplay: number;
    controls: number;
    rel: number;
    showinfo: number;
    mute: number;
    loop: number;
  };
}

export function YoutubePlayer(props: {
  videoId: string;
  opts?: YouTubeOptionsType;
}) {
  const { videoId, opts } = props;
  const [videoKey, setVideoKey] = useState(0);

  const handleStateChange = (event: YouTubeEvent<number>) => {
    // `event.data === 0` : 영상 종료됨
    // `event.data === 2` : 영상 일시정지됨
    if (event.data === 0 || event.data === 2) {
      setVideoKey((prev) => prev + 1);
    }
  };

  return (
    <YouTube
      key={videoKey} // ✅ `key`가 변경되면 React가 컴포넌트를 다시 렌더링함
      videoId={videoId}
      opts={opts}
      onStateChange={handleStateChange} // ✅ 재생 상태 감지
    />
  );
}
