/** @jsxImportSource @emotion/react */
import { Dispatch, SetStateAction } from "react";
import { SPORTS_TYPE, STREAMING_MENU_LIST } from "../../model/Streams";
import { Navigation } from "../Navigation/Navigation";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useWindowContext } from "../../Context/WindowContext";
import theme, { OPACITY_35 } from "../../styles/theme";
import { useProportionHook } from "../../hooks/useWindowHooks";
import { SCREEN_CONTAINER_PADDING } from "./ScreenArea";
import { ASPECT_RATIO } from "../layouts/Layouts";
import { HlsPlayer } from "../Video/HlsPlayer";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getAllLeagueIsLive,
  getSportsStreamsByType,
} from "../../api/streaming";
import { EmptyPage } from "../styled/Empty/Empty";
import { iso8601ToYYMMDDHHMM } from "../styled/Date/DateFomatter";

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
  const { width, height } = props;
  const { windowWidth } = useWindowContext();
  const navigate = useNavigate();
  const { activeMenu, setActiveMenu } = props.activeMenuState;
  const isTablet = windowWidth < theme.windowSize.HD;

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
    90,
    theme.windowSize.HD,
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
    <RecommendLine width={width} height={height}>
      <div
        css={css`
          height: 48px;
          flex-shrink: 0;
        `}
      >
        <Navigation
          css={css`
            height: 43px;
            padding: 0;

            nav {
              padding: 0;
            }
          `}
          menuList={STREAMING_MENU_LIST}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          navigationItemWidth={navigationItemWidth.size}
          navigationContainerWidth={navigationContainer.size}
        />
      </div>

      <RecommendContentsContainer>
        {leagueListByType ? (
          leagueListByType.length > 0 ? (
            leagueListByType.map((league, index) => (
              <ContentsLine
                key={index}
                onClick={() => navigate(`/auditorium/${league.id}`)}
              >
                <Contents width={contentsWidth} height={contentsHeight}>
                  <HlsPlayer
                    hlsPath={league.streamUrl}
                    hlsPathSub={league.streamUrlSub}
                    width={contentsWidth}
                    height={contentsHeight}
                    muted={true}
                    controls={false}
                    autoPlay={true}
                  />
                </Contents>
                <ContentsDescriptionLine>
                  <ContentsTitle>{league.liveTitle}</ContentsTitle>
                  <ChannelName>{league.channelName}</ChannelName>
                  <ContentsDate>
                    {iso8601ToYYMMDDHHMM(league.leagueDate)}
                  </ContentsDate>
                </ContentsDescriptionLine>
              </ContentsLine>
            ))
          ) : (
            <EmptyPage />
          )
        ) : null}
      </RecommendContentsContainer>
      <div
        css={css`
          border-bottom: 1px solid
            ${theme.defaultTheme.textSecondary + OPACITY_35};
          margin-top: 13px;
          width: 100%;
        `}
      />
    </RecommendLine>
  );
}

const ContentsTitle = styled.h4`
  font-size: 15px;
  font-family: ${theme.defaultTheme.font.component.itemTitle};
  text-align: left;
  margin: 0;
  padding: 0 0 2px 0;
`;

const ChannelName = styled.span`
  font-family: ${theme.fontStyle.appleNeoBold};
  font-size: 14px;
`;
const ContentsDate = styled.span`
  font-family: ${theme.fontStyle.koPubDotumBold};
  font-weight: 500;
  font-size: 12px;
`;

const ContentsDescriptionLine = styled.div`
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  ${theme.flexLayout.column}
`;

const ContentsLine = styled.div`
  width: 100%;
  padding: 4px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: flex-start;

  cursor: pointer;

  gap: 8px;
  ${theme.flexLayout.row}
`;

const Contents = styled.div<{ width: number; height: number }>(
  ({ width, height }) => css`
    border: 1px solid ${theme.defaultTheme.bodyBackground};
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
  ${theme.flexLayout.column}
`;

const RecommendLine = styled.section<{ width: number; height: number }>(
  ({ width, height }) => css`
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
