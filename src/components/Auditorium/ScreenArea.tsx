/** @jsxImportSource @emotion/react */
import {
  SPORTS_TYPE,
  SportsLeagueType,
  STREAMING_MENU_LIST,
  tagSelector,
} from "../../model/Streams";
import styled from "@emotion/styled";
import theme, { OPACITY_35 } from "../../styles/theme";
import { HlsPlayer } from "../Video/HlsPlayer";
import { ASPECT_RATIO } from "../layouts/Layouts";
import { useWindowContext } from "../../Context/WindowContext";
import { css } from "@emotion/react";
import { useState } from "react";
import { RecommendArea } from "./Recommend";
import { StyledImage } from "../styled/Image/Image";
import { iso8601ToYYMMDDHHMM } from "../styled/Date/DateFomatter";
import { LikeButton } from "../comunity/rank/LikeButton";

const SECTION_GAP = 20;
export const SCREEN_CONTAINER_PADDING = 30;

export function ScreenArea(props: { leagueInfo: SportsLeagueType }) {
  const { leagueInfo } = props;
  const { windowWidth } = useWindowContext();
  const [activeMenu, setActiveMenu] = useState<SPORTS_TYPE>("ALL");

  const screenW = windowWidth / 1.5;
  const screenH =
    (screenW / ASPECT_RATIO.widesScreen.w) * ASPECT_RATIO.widesScreen.h;

  // Magic Number 2 는 border 에 의한 minus 인수입니다.
  // Magic Number 10 는 내부 gap, padding 에 의한 minus 인수입니다.
  const RecommendLineWidth =
    windowWidth - screenW - SECTION_GAP - SCREEN_CONTAINER_PADDING * 2 - 4 - 10;

  return (
    <ScreenContainer>
      <ScreenBox>
        <Screen
          streamUrl={leagueInfo.streamUrl}
          screenSize={{
            screenW,
            screenH,
          }}
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
`;

const ScreenBox = styled.div`
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
`;

const ScreenContainer = styled.section`
  width: 100%;

  gap: ${SECTION_GAP}px;
  padding: 0 ${SCREEN_CONTAINER_PADDING}px;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  ${theme.flexLayout.row}
`;

function Screen(props: {
  streamUrl: string;
  screenSize: { screenW: number; screenH: number };
}) {
  const { streamUrl, screenSize } = props;
  const { screenW, screenH } = screenSize;

  return (
    <>
      <ScreenBezel width={screenW} height={screenH}>
        <StyledHlsPlayer
          hlsPath={streamUrl}
          hlsPathSub={streamUrl}
          width={screenW}
          height={screenH}
          autoPlay={true}
          muted={false}
          controls={true}
        />
      </ScreenBezel>
    </>
  );
}

const StyledHlsPlayer = styled(HlsPlayer)`
  @media ${theme.deviceSize.tablet} {
    width: 100%;
    height: 100%;
  }

  @media ${theme.deviceSize.phone} {
    width: 100%;
    height: 100%;
  }
`;

const ScreenBezel = styled.div<{ width: number; height: number }>(
  ({ width, height }) => css`
    width: ${width}px;
    min-width: ${width}px;
    max-width: ${width}px;
    height: ${height}px;
    border: 1px solid ${theme.defaultTheme.bodyBackground};
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
    }
  `,
);

export function ScreenInfo(props: {
  leagueInfo: SportsLeagueType;
  dateSize?: number;
}) {
  const { leagueInfo, dateSize } = props;

  const type = STREAMING_MENU_LIST.find(
    (type) => type.menu === (leagueInfo.sportsType as SPORTS_TYPE),
  );
  const label = type ? type.label : leagueInfo.sportsType;

  return (
    <ScreenDescriptionLine>
      <h3
        css={css`
          font-size: 22px;
          font-family: ${theme.fontStyle.nanumGothic};
          font-weight: 800;
          margin: 0;
          padding: 0 0 5px 0;
        `}
      >
        {leagueInfo.liveTitle}
      </h3>
      <div
        css={css`
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        `}
      >
        <div>
          <StyledImage
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
              width: 50,
              height: 50,
            }}
            css={css`
              background-size: 50px;
              border-radius: ${theme.borderRadius.roundedBox};
            `}
          />
        </div>
        <div
          css={css`
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            margin-left: 10px;
          `}
        >
          <span
            css={css`
              font-family: ${theme.fontStyle.appleNeoBold};
              padding: 0;
              margin: 0;
              font-size: 20px;
              text-align: left;
            `}
          >
            {leagueInfo.channelName}
          </span>
          <span
            css={css`
              font-family: ${theme.fontStyle.koPubDotumMedium};
              padding: 0;
              margin: 0;
              font-size: ${dateSize}px;
              text-align: left;
            `}
          >
            {iso8601ToYYMMDDHHMM(leagueInfo.leagueDate)}
          </span>
        </div>
        <div
          css={css`
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
          `}
        >
          <ul
            css={css`
              display: flex;
              flex-direction: row;
              flex-wrap: nowrap;
              justify-content: flex-end;
              align-items: center;
              gap: 20px;
            `}
          >
            <TagBox isLive={false}>{label}</TagBox>
            {leagueInfo.important ? (
              <TagBox isLive={false}>주요경기</TagBox>
            ) : null}
            {leagueInfo.live ? <TagBox isLive={true}>LIVE</TagBox> : null}
            <LikeButton rate={0} />
          </ul>
        </div>
      </div>
    </ScreenDescriptionLine>
  );
}

const TagBox = styled.li<{ isLive: boolean }>(
  ({ isLive }) => css`
    background-color: ${isLive
      ? theme.colors.warningRed
      : theme.colors.lightGray + OPACITY_35};
    color: ${isLive ? theme.colors.white : theme.defaultTheme.textPrimary};
    border-radius: ${theme.borderRadius.roundedBox};
    font-family: ${theme.fontStyle.appleNeoBold};
    font-size: 18px;
    line-height: 26px;
    padding: 5px 22px; // 위아래 5px = 총 10px 더 크게
    min-width: 50px;
    ${theme.flexLayout.column}
    ${theme.flexLayout.center}
  `,
);
