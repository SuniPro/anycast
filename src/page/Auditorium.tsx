import { ScreenArea } from "../components/Auditorium/ScreenArea.tsx";
import { PageWrapper } from "../components/layouts/Frames/FrameLayouts";
import { useWindowContext } from "../Context/WindowContext";
import { getSportsStreamById } from "../api/streaming.tsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SportsLeagueType } from "../model/Streams.tsx";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../components/Alert/Alerts";

export function Auditorium() {
  const { windowWidth } = useWindowContext();
  const { id } = useParams();
  const [leagueInfo, setLeagueInfo] = useState<SportsLeagueType>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getSportsStreamById(parseInt(id!)).then((r) => {
      if (r.id == null) {
        navigate("/");
        ErrorAlert("영상이 라이브가 아니거나, 오류가 발생했습니다.");
      } else {
        setLeagueInfo(r);
      }
    });
  }, [location]);

  if (!leagueInfo) return;

  return (
    <PageWrapper width={windowWidth} marginTop={5} gap={0}>
      <ScreenArea leagueInfo={leagueInfo} />
    </PageWrapper>
  );
}
