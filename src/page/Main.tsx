/** @jsxImportSource @emotion/react */
import "rsuite/Sidenav/styles/index.css";
import "rsuite/Nav/styles/index.css";
import { useState } from "react";
import { Navigation } from "../components/Navigation/Navigation";
import { Streams } from "../components/streams/Streams";
import { useWindowContext } from "../Context/WindowContext";
import {
  getAllImportantSportsStreams,
  getAllLeague,
  getSportsStreamsByType,
} from "../api/streaming";
import { useQuery } from "@tanstack/react-query";
import {
  ComponentContainer,
  PageWrapper,
} from "../components/layouts/Frames/FrameLayouts";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import theme from "../styles/theme";
import { SPORTS_TYPE } from "../model/Streams";

const MENU_LIST = [
  { menu: "ALL", label: "ALL" },
  { menu: "SOCCER", label: "축구" },
  { menu: "BASKETBALL", label: "농구" },
  { menu: "VOLLEYBALL", label: "배구" },
  { menu: "BASEBALL", label: "야구" },
  { menu: "HOCKEY", label: "하키" },
  { menu: "FOOTBALL", label: "미식축구" },
  { menu: "ESPORTS", label: "이스포츠" },
  { menu: "UFC", label: "UFC" },
  { menu: "TENNIS", label: "테니스" },
];

export function Main() {
  const { windowWidth } = useWindowContext();
  const [activeMenu, setActiveMenu] = useState<SPORTS_TYPE>("ALL");

  const { data: allImportantLeague } = useQuery({
    queryKey: ["getAllImportantSportsStreams"],
    queryFn: () => getAllImportantSportsStreams(),
    refetchInterval: 100000,
  });

  const isAllType = activeMenu === "ALL";

  const { data: leagueList } = useQuery({
    queryKey: isAllType
      ? ["getAllLeague", activeMenu]
      : ["getSportsStreamsByType", activeMenu],
    queryFn: () =>
      isAllType
        ? getAllLeague()
        : getSportsStreamsByType(activeMenu as SPORTS_TYPE, 0, 20),
    refetchInterval: 10000,
    enabled: !!activeMenu, // 또는 필요 조건
  });

  if (!leagueList) return;

  return (
    <Wrapper>
      <PageWrapper width={windowWidth} gap={0}>
        <Navigation
          menuList={MENU_LIST}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
        <ComponentContainer
          css={css`
            gap: 40px;
          `}
        >
          {allImportantLeague && allImportantLeague.length > 0 && (
            <Streams
              viewPort={windowWidth}
              title="STREAMS"
              leagueInfoList={allImportantLeague}
              controls={true}
              muted={true}
            />
          )}
          <Streams
            title={activeMenu}
            leagueInfoList={leagueList}
            controls={true}
            muted={true}
          />
        </ComponentContainer>
      </PageWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;

  ${theme.flexLayout.row}
  ${theme.flexLayout.center}
`;
