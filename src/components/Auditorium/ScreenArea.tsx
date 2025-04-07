import {
  SPORTS_TYPE,
  SportsLeagueType,
  STREAMING_MENU_LIST,
  tagSelector,
} from "../../model/Streams";
import styled from "@emotion/styled";
import { HlsPlayer } from "../Video/HlsPlayer";
import { ASPECT_RATIO, ItemDescription, ItemTitle } from "../layouts/Layouts";
import { useWindowContext } from "../../Context/WindowContext";
import { css, Theme, useTheme } from "@emotion/react";
import { useState } from "react";
import { RecommendArea } from "./Recommend";
import { StyledImage } from "../styled/Image/Image";
import { iso8601ToYYMMDDHHMM } from "../styled/Date/DateFomatter";
import { LikeButton } from "../comunity/rank/LikeButton";
import { useCursor } from "../../Context/CursorContext";
import { OPACITY_35 } from "../../styles/theme";
import { useDarkMode } from "usehooks-ts";

const SECTION_GAP = 20;
export const SCREEN_CONTAINER_PADDING = 30;

export function ScreenArea(props: { leagueInfo: SportsLeagueType }) {
  const { leagueInfo } = props;
  const theme = useTheme();
  const { windowWidth } = useWindowContext();
  const [activeMenu, setActiveMenu] = useState<SPORTS_TYPE>("ALL");
  const isMobile = windowWidth <= theme.windowSize.mobile;
  const screenW = windowWidth / 1.5;
  const screenH =
    (screenW / ASPECT_RATIO.widesScreen.w) * ASPECT_RATIO.widesScreen.h;

  // Magic Number 2 는 border 에 의한 minus 인수입니다.
  // Magic Number 10 는 내부 gap, padding 에 의한 minus 인수입니다.
  const RecommendLineWidth =
    windowWidth - screenW - SECTION_GAP - SCREEN_CONTAINER_PADDING * 2 - 4 - 10;

  return (
    <ScreenContainer theme={theme} isMobile={isMobile}>
      <ScreenBox theme={theme}>
        <Screen
          streamUrl={leagueInfo.streamUrl}
          screenSize={{
            screenW,
            screenH,
          }}
          theme={theme}
        />
        <ScreenInfo leagueInfo={leagueInfo} />
      </ScreenBox>
      <RecommendArea
        width={RecommendLineWidth}
        height={screenH + 100 + 6}
        activeMenuState={{
          activeMenu,
          setActiveMenu,
        }}
      />
    </ScreenContainer>
  );
}

const ScreenDescriptionLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;

  @media screen and (max-width: 645px) {
    box-sizing: border-box;
    padding: 0 0 0 10px;
  }
`;

const ScreenBox = styled.div<{ theme: Theme }>(
  ({ theme }) => css`
    @media ${theme.deviceSize.tablet} {
      width: 100%;
      height: 100%;
    }

    @media ${theme.deviceSize.phone} {
      width: 100%;
      height: 100%;
    }
    gap: 6px;
    box-sizing: border-box;
    ${theme.flexLayout.center}
    ${theme.flexLayout.column}
  `,
);

const ScreenContainer = styled.section<{ isMobile: boolean }>(
  ({ isMobile }) => css`
    width: 100%;

    gap: ${SECTION_GAP}px;
    padding: 0 ${isMobile ? 0 : SCREEN_CONTAINER_PADDING}px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
  `,
);

function Screen(props: {
  streamUrl: string;
  screenSize: { screenW: number; screenH: number };
  theme: Theme;
}) {
  const { streamUrl, screenSize, theme } = props;
  const { screenW, screenH } = screenSize;

  return (
    <>
      <ScreenBezel width={screenW} height={screenH} theme={theme}>
        <StyledHlsPlayer
          hlsPath={streamUrl}
          hlsPathSub={streamUrl}
          width={screenW}
          height={screenH}
          autoPlay={true}
          muted={false}
          controls={true}
          theme={theme}
        />
      </ScreenBezel>
    </>
  );
}

const StyledHlsPlayer = styled(HlsPlayer)<{ theme: Theme }>(
  ({ theme }) => css`
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

const ScreenBezel = styled.div<{ theme: Theme; width: number; height: number }>(
  ({ theme, width, height }) => css`
    width: ${width}px;
    min-width: ${width}px;
    max-width: ${width}px;
    height: ${height}px;
    border: 1px solid ${theme.mode.bodyBackground};
    overflow: hidden;
    border-radius: 14px;

    @media ${theme.deviceSize.tablet} {
      width: 100%;
      height: 100%;
      max-width: 100%;
    }

    @media ${theme.deviceSize.phone} {
      width: 100%;
      height: 100%;
      max-width: 100%;
      border-radius: 0;
    }
  `,
);

export function ScreenInfo(props: {
  leagueInfo: SportsLeagueType;
  dateSize?: number;
  infoFontSize?: number;
}) {
  const { isDarkMode } = useDarkMode();
  const { leagueInfo, dateSize } = props;
  const { windowWidth } = useWindowContext();
  const theme = useTheme();
  const { setIsLike } = useCursor();

  const type = STREAMING_MENU_LIST.find(
    (type) => type.menu === (leagueInfo.sportsType as SPORTS_TYPE),
  );
  const label = type ? type.label : leagueInfo.sportsType;
  const isMobile = windowWidth <= theme.windowSize.mobile;

  const profileSize = isMobile ? 30 : 50;

  return (
    <ScreenDescriptionLine>
      <ItemTitle theme={theme} fontSize={isMobile ? 18 : 22} paddingBottom={5}>
        {leagueInfo.liveTitle}
      </ItemTitle>
      <InfoContainer theme={theme}>
        <InfoLine>
          <div>
            <Profile
              imageUrl={
                leagueInfo.thumbnailUrl
                  ? leagueInfo.thumbnailUrl
                  : tagSelector(
                      leagueInfo.streamUrl,
                      leagueInfo.sportsType,
                      leagueInfo.sportsTypeSub,
                    )
              }
              size={{
                width: profileSize,
                height: profileSize,
              }}
              profileSize={profileSize}
              theme={theme}
              isDarkMode={isDarkMode}
            />
          </div>
          <DescriptionBox>
            <StyledItemDescription theme={theme} fontSize={dateSize}>
              {leagueInfo.channelName}
            </StyledItemDescription>
            <StyledItemDescription theme={theme} fontSize={dateSize}>
              {iso8601ToYYMMDDHHMM(leagueInfo.leagueDate)}
            </StyledItemDescription>
          </DescriptionBox>
        </InfoLine>
        <TagLine theme={theme}>
          <TagBoxList>
            <TagBox isLive={false} theme={theme}>
              {label}
            </TagBox>
            {leagueInfo.important ? (
              <TagBox isLive={false} theme={theme}>
                주요경기
              </TagBox>
            ) : null}
            {leagueInfo.live ? (
              <TagBox isLive={true} theme={theme}>
                LIVE
              </TagBox>
            ) : null}
            <div
              onMouseEnter={() => setIsLike(true)}
              onMouseLeave={() => setIsLike(false)}
            >
              <LikeButton rate={0} />
            </div>
          </TagBoxList>
        </TagLine>
      </InfoContainer>
    </ScreenDescriptionLine>
  );
}

const StyledItemDescription = styled(ItemDescription)<{ fontSize?: number }>(
  ({ fontSize }) => css`
    font-size: ${fontSize}px !important;
  `,
);

const TagBox = styled.li<{ theme: Theme; isLive: boolean }>(
  ({ theme, isLive }) => css`
    background-color: ${isLive
      ? theme.colors.warningRed
      : theme.colors.lightGray + OPACITY_35};
    color: ${isLive ? theme.colors.white : theme.mode.textPrimary};
    border-radius: ${theme.borderRadius.roundedBox};
    font-family: ${theme.mode.font.button.default};
    white-space: nowrap;
    font-size: 18px;
    padding: 8px 26px; // 위아래 5px = 총 10px 더 크게
    min-width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media ${theme.deviceSize.phone} {
      font-size: 12px;
      padding: 6px 12px; // 위아래 5px = 총 10px 더 크게
      min-width: 50px;
    }
  `,
);

const InfoContainer = styled.div<{ theme: Theme }>(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media ${theme.deviceSize.phone} {
      flex-direction: column;
    }
  `,
);

const InfoLine = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const Profile = styled(StyledImage)<{
  theme: Theme;
  profileSize: number;
  isDarkMode: boolean;
}>(
  ({ theme, profileSize, isDarkMode }) => css`
    background-size: ${profileSize}px;
    background-color: ${isDarkMode ? theme.colors.white : null};
    border-radius: ${theme.borderRadius.roundedBox};
  `,
);

const DescriptionBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 10px;
`;

const TagLine = styled.section<{ theme: Theme }>(
  ({ theme }) => css`
    width: 50%;
    padding: 0 20px;
    box-sizing: border-box;
    height: 60px;
    border-radius: ${theme.borderRadius.softBox};

    ul {
      margin: 0;
      padding: 0;
    }

    li {
      margin: 0;
      list-style: none;
    }

    @media ${theme.deviceSize.phone} {
      width: 100%;
    }
  `,
);

const TagBoxList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;
