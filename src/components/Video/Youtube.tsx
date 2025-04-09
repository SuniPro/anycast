import YouTube, { YouTubeEvent } from "react-youtube";
import { useCursor } from "../../Context/CursorContext";

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
  className?: string;
  opts?: YouTubeOptionsType;
  path: string;
  width: number;
  height: number;
  muted: boolean;
  controls: boolean;
  autoPlay?: boolean;
}) {
  const {
    className,
    path,
    width,
    height,
    muted,
    controls,
    autoPlay = false,
  } = props;
  const { setIsVideo } = useCursor();
  const mute = muted ? 1 : 0;

  const settingOption: YouTubeOptionsType = {
    width,
    height,
    playerVars: {
      rel: 0,
      showinfo: 0,
      mute,
      autoplay: autoPlay ? 1 : 0,
      loop: 1,
      controls: controls ? 1 : 0,
    },
  };

  const handleStateChange = (event: YouTubeEvent<number>) => {
    if (autoPlay) {
      event.data = 1;
    } else {
      event.data = 0;
    }
  };

  let urlParams;
  urlParams = new URLSearchParams(new URL(path).search);
  const videoId = urlParams.get("v");

  if (!videoId) return;

  return (
    <div
      className={className}
      onMouseEnter={() => setIsVideo(true)}
      onMouseLeave={() => setIsVideo(false)}
    >
      <YouTube
        videoId={videoId}
        opts={settingOption}
        onStateChange={handleStateChange} // ✅ 재생 상태 감지
      />
    </div>
  );
}
