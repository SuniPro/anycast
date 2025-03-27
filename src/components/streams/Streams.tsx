/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { SportsLeagueType, tagSelector } from "../../model/Streams";
import { useWindowContext } from "../../Context/WindowContext";
import { useItemScrollControls } from "../../hooks/useWheel";
import { ComponentContainer } from "../layouts/Frames/FrameLayouts";
import {
  ASPECT_RATIO,
  ControlBox,
  DescriptionLine,
  EllipsisCase,
  ExhibitionContainer,
  Item,
  ItemCase,
  ItemContainer,
  ItemDescription,
  MainTitle,
  MainTitleLine,
} from "../layouts/Layouts";
import { FuncItem } from "../styled/Button/Button";
import { LeftArrowIcon, RightArrowIcon } from "../styled/icons";
import { HlsPlayer } from "../Video/HlsPlayer";
import { useItemResizing } from "../../hooks/useLayouts";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { iso8601ToYYMMDDHHMM } from "../styled/Date/DateFomatter";
import theme from "../../styles/theme";

import { StyledImage } from "../styled/Image/Image";
import { EmptyPage } from "../styled/Empty/Empty";

const MOVE_FACTOR = 2;
const ITEM_GAP = 12;
const ITEM_VIEW_LENGTH = 4; // 보여주고 싶은 아이템의 개수입니다.

export function Streams(props: {
  viewPort?: number;
  titleView?: boolean;
  title: string;
  leagueInfoList: SportsLeagueType[];
  controls?: boolean;
  muted?: boolean;
}) {
  const {
    viewPort,
    leagueInfoList,
    title,
    titleView = true,
    controls = true,
    muted = false,
  } = props;

  const { windowWidth } = useWindowContext();
  const componentContainerRef = useRef<HTMLDivElement>(null);
  const [componentWidth, setComponentWidth] = useState<number>(
    componentContainerRef.current
      ? componentContainerRef.current.clientWidth
      : windowWidth - 100,
  );
  const navigate = useNavigate();

  useEffect(() => {
    setComponentWidth(
      componentContainerRef.current
        ? componentContainerRef.current.clientWidth
        : windowWidth - 100,
    );
  }, [windowWidth]);

  const { itemWidth, isTablet, moveParam } = useItemResizing(
    windowWidth,
    componentWidth,
    ITEM_GAP,
    ITEM_VIEW_LENGTH,
    MOVE_FACTOR,
  );

  const itemHeight =
    (itemWidth / ASPECT_RATIO.standard.w) * ASPECT_RATIO.standard.h;

  const { scrollXValue, leftButton, rightButton } = useItemScrollControls({
    itemList: leagueInfoList,
    itemWidth,
    itemGap: ITEM_GAP,
    moveParam,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    containerRef.current?.scrollTo({
      left: scrollXValue,
      top: 0,
      behavior: "smooth",
    });
  }, [scrollXValue]);

  if (leagueInfoList.length === 0) return <EmptyPage />;

  return (
    <ComponentContainer ref={componentContainerRef}>
      {titleView && (
        <MainTitleLine>
          <MainTitle onClick={() => navigate("/sports")}>{title}</MainTitle>
          {viewPort && leagueInfoList.length > ITEM_VIEW_LENGTH && (
            <ControlBox>
              <FuncItem func={leftButton} label={<LeftArrowIcon />} />
              <FuncItem func={rightButton} label={<RightArrowIcon />} />
            </ControlBox>
          )}
        </MainTitleLine>
      )}
      <ExhibitionContainer
        width={isTablet ? itemWidth : componentWidth}
        ref={containerRef}
        activeScroll={!!viewPort}
      >
        <ItemContainer activeScroll={!!viewPort} gap={ITEM_GAP}>
          {leagueInfoList.map((league, index) => (
            <ItemCase>
              <StyledItem key={index} width={itemWidth} isMain={!!viewPort}>
                <HlsPlayer
                  controls={controls}
                  hlsPath={league.streamUrl}
                  hlsPathSub={league.streamUrlSub}
                  width={itemWidth}
                  height={itemHeight}
                  muted={muted}
                />
              </StyledItem>
              <DescriptionLine>
                <div
                  css={css`
                    width: 10%;
                    margin-right: 10px;
                  `}
                >
                  <StyledImage
                    imageUrl={
                      league.thumbnailUrl
                        ? league.thumbnailUrl
                        : tagSelector(
                            league.streamUrl,
                            league.sportsType,
                            league.sportsTypeSub,
                          )
                    }
                    size={{
                      width: 40,
                      height: 40,
                    }}
                    css={css`
                      background-size: 40px;
                      border-radius: ${theme.borderRadius.roundedBox};
                    `}
                  />
                </div>
                <div
                  css={css`
                    width: 90%;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                  `}
                >
                  <StyledEllipsisCase
                    width={itemWidth - 50}
                    text={league.liveTitle}
                    testAlign="left"
                  />
                  <ItemDescription>{league.channelName}</ItemDescription>
                  <ItemDescription>
                    {iso8601ToYYMMDDHHMM(league.leagueDate)}
                  </ItemDescription>
                </div>
              </DescriptionLine>
            </ItemCase>
          ))}
        </ItemContainer>
      </ExhibitionContainer>
    </ComponentContainer>
  );
}

const StyledEllipsisCase = styled(EllipsisCase)`
  font-family: ${theme.defaultTheme.font.component.itemTitle};
  font-weight: bold;
  font-size: 18px;
`;

const StyledItem = styled(Item)<{ isMain: boolean }>(
  ({}) => css`
    position: relative;

    overflow: hidden;
  `,
);
