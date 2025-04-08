/** @jsxImportSource @emotion/react */
import { Dispatch, SetStateAction } from "react";
import { SPORTS_TYPE, STREAMING_MENU_LIST } from "../../model/Streams";
import { Navigation } from "../Navigation/Navigation";
import styled from "@emotion/styled";
import { css, Theme, useTheme } from "@emotion/react";
import { useWindowContext } from "../../Context/WindowContext";
import { defaultTheme } from "../../styles/theme";
import { useProportionHook } from "../../hooks/useWindowHooks";
import { SCREEN_CONTAINER_PADDING } from "./ScreenArea";
import {
  ASPECT_RATIO,
  HorizontalDivider,
  ItemDescription,
  ItemTitle,
} from "../layouts/Layouts";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getAllLeagueIsLive,
  getSportsStreamsByType,
} from "../../api/streaming";
import { EmptyPage } from "../styled/Empty/Empty";
import { iso8601ToYYMMDDHHMM } from "../styled/Date/DateFomatter";
import { ThumbnailViewer } from "../Video/ThumbnailViewer";
import { useCursor } from "../../Context/CursorContext";

const NAVIGATION_PADDING = 10;

interface ActiveMenuStateType {
  width: number;
  height: number;
  activeMenuState: {
    activeMenu: SPORTS_TYPE;
    setActiveMenu: Dispatch<SetStateAction<SPORTS_TYPE>>;
  };
}

export function RecommendArea(props: ActiveMenuStateType) {
  const theme = useTheme();
  const { width, height } = props;
  const { windowWidth } = useWindowContext();
  const { setIsPointer } = useCursor();
  const navigate = useNavigate();
  const { activeMenu, setActiveMenu } = props.activeMenuState;
  const isTablet = windowWidth < theme.windowSize.tablet;

  const isAllType = activeMenu === "ALL";

  const { data: leagueListByType } = useQuery({
    queryKey: isAllType
      ? ["getAllLeagueIsLive", activeMenu]
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
    110,
    defaultTheme.windowSize.tablet,
  );

  const navigationContainer = useProportionHook(
    windowWidth,
    isTablet
      ? windowWidth - SCREEN_CONTAINER_PADDING * 2
      : width - NAVIGATION_PADDING * 2,
    isTablet
      ? windowWidth - SCREEN_CONTAINER_PADDING * 2
      : width - NAVIGATION_PADDING * 2,
  );

  const contentsWidth = 156;
  const contentsHeight =
    (contentsWidth / ASPECT_RATIO.widesScreen.w) * ASPECT_RATIO.widesScreen.h;

  return (
    <RecommendLine width={width} height={height} theme={theme}>
      <NavigationLine>
        <StyledNavigation
          menuList={STREAMING_MENU_LIST}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          navigationItemWidth={navigationItemWidth.size}
          navigationContainerWidth={navigationContainer.size}
        />
      </NavigationLine>
      <RecommendContentsContainer theme={theme}>
        {leagueListByType ? (
          leagueListByType.length > 0 ? (
            leagueListByType.map((league) => (
              <ContentsLine
                key={league.id}
                onMouseEnter={() => setIsPointer(true)}
                onMouseLeave={() => setIsPointer(false)}
                onClick={() => navigate(`/auditorium/${league.id}`)}
                theme={theme}
              >
                <Contents
                  width={contentsWidth}
                  height={contentsHeight}
                  theme={theme}
                >
                  <ThumbnailViewer
                    hlsPath={league.streamUrl}
                    width={contentsWidth}
                    height={contentsHeight}
                    muted={true}
                    controls={false}
                    hlsPathSub={league.streamUrl}
                  />
                </Contents>
                <ContentsDescriptionLine theme={theme}>
                  <ItemTitle theme={theme} fontSize={16} paddingBottom={0}>
                    {league.liveTitle}
                  </ItemTitle>
                  <StyledItemDescription theme={theme}>
                    {league.channelName}
                  </StyledItemDescription>
                  <StyledItemDescription theme={theme}>
                    {iso8601ToYYMMDDHHMM(league.leagueDate)}
                  </StyledItemDescription>
                </ContentsDescriptionLine>
              </ContentsLine>
            ))
          ) : (
            <EmptyPage />
          )
        ) : null}
      </RecommendContentsContainer>
      <HorizontalDivider theme={theme} />
    </RecommendLine>
  );
}

const StyledNavigation = styled(Navigation)`
  height: 43px;
  padding: 0;

  nav {
    padding: 0;
  }
`;

const ContentsDescriptionLine = styled.div`
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const StyledItemDescription = styled(ItemDescription)`
  font-size: 13px;
`;

const ContentsLine = styled.div`
  width: 100%;
  padding: 4px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: flex-start;

  gap: 8px;
  display: flex;
  flex-direction: row;
`;

const Contents = styled.div<{ theme: Theme; width: number; height: number }>(
  ({ theme, width, height }) => css`
    border: 1px solid ${theme.mode.bodyBackground};
    border-radius: 14px;
    box-sizing: border-box;
    overflow: hidden;
    max-width: ${width}px;
    min-width: ${width}px;
    width: ${width}px;
    height: ${height}px;
    max-height: ${height}px;
    min-height: ${height}px;
  `,
);

const RecommendContentsContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;

  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  padding-top: 20px;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
`;

const NavigationLine = styled.section`
  height: 48px;
  flex-shrink: 0;
`;

const RecommendLine = styled.section<{
  width: number;
  height: number;
  theme: Theme;
}>(
  ({ width, height, theme }) => css`
    width: ${width}px;
    height: ${height}px;

    display: flex;
    flex-direction: column;
    overflow: hidden;

    @media ${theme.deviceSize.tablet} {
      width: 100%;
      height: 100%;
    }

    @media ${theme.deviceSize.phone} {
      width: 100%;
      height: 100%;
    }
  `,
);
