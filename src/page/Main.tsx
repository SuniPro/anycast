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
import { css, Theme, useTheme } from "@emotion/react";
import { SPORTS_TYPE, STREAMING_MENU_LIST } from "../model/Streams";
import { useProportionHook } from "../hooks/useWindowHooks";

export function Main() {
  const theme = useTheme();
  const { windowWidth } = useWindowContext();
  const [activeMenu, setActiveMenu] = useState<SPORTS_TYPE>("ALL");

  const isAllType = activeMenu === "ALL";
  const isMobile = windowWidth <= theme.windowSize.mobile;

  const { data: allImportantLeague } = useQuery({
    queryKey: ["getAllImportantSportsStreams"],
    queryFn: () => getAllImportantSportsStreams(),
    refetchInterval: 100000,
  });

  const { data: leagueList } = useQuery({
    queryKey: isAllType
      ? ["getAllLeague", activeMenu]
      : ["getSportsStreamsByType", activeMenu],
    queryFn: () =>
      isAllType
        ? getAllLeagueIsLive()
        : getSportsStreamsByType(activeMenu as SPORTS_TYPE, 0, 20),
    refetchInterval: 100000,
    enabled: !!activeMenu, // 또는 필요 조건
  });

  const navigationItemWidth = useProportionHook(
    windowWidth,
    140,
    theme.windowSize.mobile,
  );

  const navigationContainer = useProportionHook(
    windowWidth,
    // 모바일 환경에서는 여백이 없으므로 0을 반영합니다.
    windowWidth - (isMobile ? 0 : 100),
    windowWidth - (isMobile ? 0 : 100),
  );

  if (!leagueList) return;

  return (
    <Wrapper theme={theme}>
      <PageWrapper
        width={isMobile ? windowWidth : windowWidth - 100}
        gap={0}
        theme={theme}
      >
        <Navigation
          menuList={STREAMING_MENU_LIST}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          navigationItemWidth={navigationItemWidth.size}
          navigationContainerWidth={navigationContainer.size}
          justifyContent="flex-start"
        />
        <StyledComponentContainer>
          {allImportantLeague && allImportantLeague.length > 0 && (
            <Streams
              viewPort={windowWidth}
              title="STREAMS"
              leagueInfoList={allImportantLeague}
              controls={true}
              muted={true}
              isFetching={false}
            />
          )}
          <Streams
            title={activeMenu}
            leagueInfoList={leagueList}
            controls={true}
            muted={true}
            isFetching={false}
          />
        </StyledComponentContainer>
      </PageWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.section<{ theme: Theme }>(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: ${theme.mode.textPrimary};

    background-color: ${theme.mode.bodyBackground};
  `,
);

const StyledComponentContainer = styled(ComponentContainer)`
  gap: 40px;
`;
