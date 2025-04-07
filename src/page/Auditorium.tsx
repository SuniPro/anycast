import { ScreenArea } from "../components/Auditorium/ScreenArea";
import { PageWrapper } from "../components/layouts/Frames/FrameLayouts";
import { useWindowContext } from "../Context/WindowContext";
import { getSportsStreamById } from "../api/streaming";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SportsLeagueType } from "../model/Streams";
import { useEffect, useState } from "react";
import { ErrorAlert, SuccessAlert } from "../components/Alert/Alerts";
import { useTheme } from "@emotion/react";

export function Auditorium() {
  const { windowWidth } = useWindowContext();
  const theme = useTheme();
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
    if (leagueInfo?.streamUrl.includes("soop")) {
      SuccessAlert(
        `SOOP은 현재 서버가 불안정하여 약 1분간 잦은 버퍼링이 발생할 수 있습니다. \n 1분 후 정상 재생되니 이점 참고 바랍니다.`,
      );
    }
  }, [id, leagueInfo?.streamUrl, location, navigate]);

  if (!leagueInfo) return;

  return (
    <PageWrapper width={windowWidth} marginTop={5} gap={0} theme={theme}>
      <ScreenArea leagueInfo={leagueInfo} />
    </PageWrapper>
  );
}
