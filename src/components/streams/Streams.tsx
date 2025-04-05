import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { SportsLeagueType, tagSelector } from "../../model/Streams";
import { useWindowContext } from "../../Context/WindowContext";
import { useItemScrollControls } from "../../hooks/useWheel";
import {
  ComponentContainer,
  PageWrapper,
} from "../layouts/Frames/FrameLayouts";
import {
  ASPECT_RATIO,
  ControlBox,
  DescriptionLine,
  ExhibitionContainer,
  InfoLine,
  Item,
  ItemCase,
  ItemContainer,
  ItemDescription,
  ItemTitle,
  MainTitle,
  MainTitleLine,
  Profile,
  ProfileCase,
  SkeletonItemContainer,
} from "../layouts/Layouts";
import { FuncItem } from "../styled/Button/Button";
import { LeftArrowIcon, RightArrowIcon } from "../styled/icons";
import { useItemResizing } from "../../hooks/useLayouts";
import { css, Theme, useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { iso8601ToYYMMDDHHMM } from "../styled/Date/DateFomatter";
import { EmptyPage } from "../styled/Empty/Empty";
import Tooltip from "@mui/material/Tooltip";
import { useSearchContext } from "../../Context/SearchContext";
import { useCursor } from "../../Context/CursorContext";
import { ThumbnailViewer } from "../Video/ThumbnailViewer";

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
  isFetching: boolean;
}) {
  const theme = useTheme();
  const {
    viewPort,
    leagueInfoList,
    title,
    isFetching,
    titleView = true,
  } = props;

  const { windowWidth } = useWindowContext();
  const { searchValue } = useSearchContext();

  const componentContainerRef = useRef<HTMLDivElement>(null);
  const [componentWidth, setComponentWidth] = useState<number>(
    componentContainerRef.current
      ? componentContainerRef.current.clientWidth
      : windowWidth - 100,
  );
  const navigate = useNavigate();
  const isMobile = windowWidth <= theme.windowSize.mobile;

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
    isMobile ? 0 : ITEM_GAP,
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

  if (leagueInfoList.length === 0)
    return (
      <PageWrapper width={windowWidth} theme={theme}>
        <EmptyPage />
      </PageWrapper>
    );

  const filteredLeagueInfoList = leagueInfoList.filter((league) =>
    league.liveTitle.includes(searchValue),
  );

  if (filteredLeagueInfoList.length === 0) {
  }

  return (
    <ComponentContainer ref={componentContainerRef} theme={theme}>
      {titleView && (
        <MainTitleLine theme={theme}>
          <MainTitle onClick={() => navigate("/sports")} theme={theme}>
            {title}
          </MainTitle>
          {viewPort && leagueInfoList.length > ITEM_VIEW_LENGTH && (
            <ControlBox theme={theme}>
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
        {searchValue.length !== 0 && (
          <>
            {filteredLeagueInfoList.length !== 0 ? (
              <ContentsArea
                leagueList={filteredLeagueInfoList}
                isView={true}
                activeScroll={false}
                itemWidth={itemWidth}
                itemHeight={itemHeight}
                theme={theme}
                isFetching={isFetching}
              />
            ) : (
              <EmptyPage
                title="검색결과가 없습니다."
                message="검색어를 정확히 입력해주세요."
              />
            )}
          </>
        )}
        <ContentsArea
          leagueList={leagueInfoList}
          activeScroll={!!viewPort}
          itemWidth={itemWidth}
          itemHeight={itemHeight}
          isView={searchValue.length === 0}
          theme={theme}
          isFetching={isFetching}
        />
      </ExhibitionContainer>
    </ComponentContainer>
  );
}

const StyledItem = styled(Item)<{ isMain: boolean }>(
  ({}) => css`
    position: relative;

    overflow: hidden;
  `,
);

function ContentsArea(props: {
  theme: Theme;
  leagueList: SportsLeagueType[];
  isView: boolean;
  activeScroll: boolean;
  itemWidth: number;
  itemHeight: number;
  isFetching: boolean;
}) {
  const {
    theme,
    leagueList,
    activeScroll,
    itemWidth,
    itemHeight,
    isView,
    isFetching,
  } = props;

  const { windowWidth } = useWindowContext();

  const isMobile = windowWidth <= theme.windowSize.mobile;

  const { setIsPointer } = useCursor();
  const navigate = useNavigate();

  return (
    <VisualItemContainer
      activeScroll={activeScroll}
      gap={ITEM_GAP}
      isView={isView}
      theme={theme}
    >
      {isFetching ? (
        <SkeletonItemContainer width={itemWidth} height={itemHeight} />
      ) : (
        leagueList.map((league, index) => (
          <Tooltip
            title="제목을 누르면 극장모드로 볼 수 있어요 !"
            placement="top"
          >
            <ItemCase theme={theme}>
              <StyledItem
                key={index}
                width={itemWidth}
                isMain={activeScroll}
                theme={theme}
              >
                <ThumbnailViewer
                  hlsPath={league.streamUrl}
                  width={itemWidth + (isMobile ? ITEM_GAP : 0)}
                  height={itemHeight + (isMobile ? ITEM_GAP : 0)}
                  muted={true}
                />
              </StyledItem>
              <DescriptionLine
                onMouseEnter={() => setIsPointer(true)}
                onMouseLeave={() => setIsPointer(false)}
                onClick={() => navigate(`auditorium/${league.id}`)}
                theme={theme}
              >
                <ProfileCase>
                  <Profile
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
                    theme={theme}
                  />
                </ProfileCase>
                <InfoLine>
                  <ItemTitle
                    theme={theme}
                    fontSize={isMobile ? 15 : 18}
                    paddingBottom={0}
                  >
                    {league.liveTitle}
                  </ItemTitle>
                  <ItemDescription theme={theme}>
                    {league.channelName}
                  </ItemDescription>
                  <ItemDescription theme={theme}>
                    {iso8601ToYYMMDDHHMM(league.leagueDate)}
                  </ItemDescription>
                </InfoLine>
              </DescriptionLine>
            </ItemCase>
          </Tooltip>
        ))
      )}
    </VisualItemContainer>
  );
}

const VisualItemContainer = styled(ItemContainer)<{ isView: boolean }>(
  ({ isView }) => css`
    visibility: ${isView ? "visible" : "hidden"};
  `,
);
