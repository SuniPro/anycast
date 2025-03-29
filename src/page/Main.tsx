/** @jsxImportSource @emotion/react */
import "rsuite/Sidenav/styles/index.css";
import "rsuite/Nav/styles/index.css";
import { useState } from "react";
import { Navigation } from "../components/Navigation/Navigation";
import { Streams } from "../components/streams/Streams";
import { useWindowContext } from "../Context/WindowContext";
import {
  getAllImportantSportsStreams,
  getAllLeagueIsLive,
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
import { SPORTS_TYPE, STREAMING_MENU_LIST } from "../model/Streams";
import { useProportionHook } from "../hooks/useWindowHooks";

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
        ? getAllLeagueIsLive()
        : getSportsStreamsByType(activeMenu as SPORTS_TYPE, 0, 20),
    refetchInterval: 10000,
    enabled: !!activeMenu, // 또는 필요 조건
  });

  const navigationItemWidth = useProportionHook(
    windowWidth,
    140,
    theme.windowSize.HD,
  );

  const navigationContainer = useProportionHook(
    windowWidth,
    windowWidth - 50,
    windowWidth - 50,
  );

  if (!leagueList) return;

  return (
    <Wrapper>
      <PageWrapper width={windowWidth - 100} gap={0}>
        <Navigation
          menuList={STREAMING_MENU_LIST}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          navigationItemWidth={navigationItemWidth.size}
          navigationContainerWidth={navigationContainer.size}
          justifyContent="center"
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
