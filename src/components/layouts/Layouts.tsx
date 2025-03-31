import styled from "@emotion/styled";
import { css } from "@emotion/react";
import theme, { OPACITY_35 } from "../../styles/theme";
import { Container } from "./Frames/FrameLayouts";
import _ from "lodash";
import { ReactNode } from "react";

export const ASPECT_RATIO = {
  widesScreen: { w: 16, h: 9 },
  ultraWideScreen: { w: 21, h: 9 },
  standard: { w: 4, h: 3 },
  surfaceRatio: { w: 3, h: 2 },
  WXGA: { w: 16, h: 10 },
};

export const Unshackled = styled.div<{ coordinate?: { x: number; y: number } }>(
  ({ coordinate }) => css`
    z-index: 1;
    position: absolute;
    right: 0;
    top: ${coordinate ? coordinate.y + 300 : 0}px;

    @media ${theme.deviceSize.phone} {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  `,
);

/* LIST CONTAINER LAYOUTS -- START */
export function viewSelector<T>(
  windowWidth: number,
  itemWidthList: T[],
  viewLength: number,
  viewPort?: number,
) {
  let width: number;

  if (windowWidth <= theme.windowSize.HD) {
    width = windowWidth - 100;
  } else if (itemWidthList.length > viewLength) {
    width = _.sum(itemWidthList.slice(0, viewLength));
  } else {
    width = viewPort ?? theme.windowSize.HD + 300;
  }
  return width;
}

export const ExhibitionContainer = styled.div<{
  width: number;
  activeScroll: boolean;
}>(
  ({ width, activeScroll }) => css`
    width: ${width}px;
    overflow-x: ${activeScroll ? "scroll" : "hidden"};
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
  `,
);

export const MainTitleLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  font-family: ${theme.fontStyle.montserrat};
  }
`;

export const MainTitle = styled.h2`
  font-family: ${theme.defaultTheme.font.component.mainTitle};
  color: ${theme.defaultTheme.textPrimary};
`;

export const ControlBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;

  button {
    margin: 0;
    padding: 0;
    width: 45px;
    height: 35px;
    background-position: center;
    transition: background 0.8s;
    ${theme.flexLayout.column}
    ${theme.flexLayout.center}
    

    &:active {
      background-color: ${theme.defaultTheme.buttonHoverBackground};
      background-size: 100%;
      transition: background 0s;
    }
  }
  svg {
    width: 20px;
  }
`;

export const ItemContainer = styled(Container)<{
  activeScroll?: boolean;
  gap: number;
  height?: number;
}>(
  ({ activeScroll, gap, height }) => css`
    width: 100%;
    height: ${height ? `${height}px` : "100%"};
    overflow: hidden;
    flex-direction: row;
    flex-wrap: ${activeScroll ? "nowrap" : "wrap"};
    justify-content: flex-start;
    align-items: center;

    box-sizing: border-box;
    position: relative;
    gap: ${gap}px;

    @media ${theme.deviceSize.phone} {
      justify-content: ${activeScroll ? "flex-start" : "center"};
    }

    @media ${theme.deviceSize.tablet} {
      justify-content: ${activeScroll ? "flex-start" : "center"};
    }
  `,
);

export const ItemCase = styled.div`
  ${theme.flexLayout.column}
  ${theme.flexLayout.center}
  
  gap : 8px;
`;

export const Item = styled.div<{ width: number; height?: number }>(
  ({ width, height }) => css`
    max-width: ${width}px;
    min-width: ${width}px;
    height: ${height ? `${height}px` : "100%"};
    border-radius: ${theme.borderRadius.roundedBox};
    background-color: ${theme.defaultTheme.cardBackground};
    ${theme.flexLayout.column};
    align-items: center;
    transition: all 0.3s ease-in-out;
    scroll-snap-align: start;
    overflow: hidden;

    &:hover {
      //box-shadow: 2px 4px 16px ${theme.defaultTheme.contentBackground};
      transform: scale3d(1.01, 1.01, 1.01);
      //animation: tilt-shaking 80ms 10ms;
    }

    @keyframes tilt-shaking {
      0% {
        transform: rotate(0deg);
      }
      25% {
        transform: rotate(0.5deg);
      }
      50% {
        transform: rotate(0deg);
      }
      75% {
        transform: rotate(-0.5deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }
  `,
);

export const DescriptionLine = styled.div`
  width: 100%;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  ${theme.flexLayout.row};
`;

export const ItemTitle = styled.span`
  width: 100%;
  ${theme.flexLayout.column};
  justify-content: center;
  align-items: flex-start;
  color: ${theme.defaultTheme.textPrimary};
  text-transform: uppercase;
  font-family: ${theme.defaultTheme.font.component.itemTitle};
  font-weight: 600;
  font-size: 16px;
  margin: 0;
  text-align: left;
`;

export const ItemDescription = styled.span`
  width: 100%;
  height: 18px;
  ${theme.flexLayout.column};
  justify-content: center;
  align-items: flex-start;
  color: ${theme.defaultTheme.textSecondary};
  text-transform: uppercase;
  font-family: ${theme.defaultTheme.font.component.itemTitle};
  font-weight: 600;
  font-size: 14px;
  margin: 0;
  text-align: left;
`;

export const IFrameCase = styled.iframe<{ width: number; height: number }>(
  ({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;
    border: none;
  `,
);

/* LIST CONTAINER LAYOUTS -- END */

/* PAGE COMPONENT LAYOUTS -- START */
export const BasicScreen = styled.iframe<{
  size: { width: number; height: number };
}>(
  ({ size }) => css`
    width: ${size.width}px;
    height: ${size.height}px;
    border: none;
  `,
);

/* PAGE COMPONENT LAYOUTS -- END */

// export const SummaryTab = styled.div`
//   background: ${theme.defaultTheme.cardBackground};
//   color: ${theme.defaultTheme.textAccent};
//   width: ${NAVIGATION_SUMMARY_WIDTH}px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   flex-shrink: 0;
//   padding: 0 ${SUMMARY_PADDING_LEFT}px 0 ${SUMMARY_PADDING_RIGHT}px;
//   height: 60px;
// `;

export const SummaryTitle = styled.div`
  color: ${theme.defaultTheme.textPrimary};
  text-align: center;
  font-style: normal;
  font-weight: 700;
  line-height: 16px; /* 114.286% */
  white-space: nowrap;
`;

export const Divider = styled.div`
  width: 1px;
  height: 24px;
  background: ${theme.defaultTheme.textSecondary};
`;

export function EllipsisCase(props: {
  text: ReactNode;
  testAlign: "center" | "left" | "right";
  className?: string;
  width: number;
  func?: () => void;
}) {
  const { text, className, width, testAlign, func } = props;

  return (
    <TextCase className={className} onClick={func}>
      <Text textAlign={testAlign} width={width}>
        {text}
      </Text>
    </TextCase>
  );
}

export const TextCase = styled.div`
  width: 100%;
  height: 100%;
  ${theme.flexLayout.column}
  ${theme.flexLayout.center}
`;

export const Text = styled.span<{ width?: number; textAlign: string }>(
  ({ width, textAlign }) => css`
    text-align: ${textAlign};
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    overflow: hidden;
    width: ${width}px;
  `,
);

export function SkeletonItemContainer(props: {
  width: number;
  height: number;
}) {
  const { width, height } = props;
  return (
    <ItemCase>
      <SkeletonItem
        width={width}
        itemWidth={width}
        itemHeight={height}
      ></SkeletonItem>
      <SkeletonPlaceholder width={300}></SkeletonPlaceholder>
    </ItemCase>
  );
}

const SkeletonItem = styled(Item)<{ itemWidth: number; itemHeight: number }>(
  ({ itemWidth, itemHeight }) => css`
    background: linear-gradient(90deg, #e8e8e8 0px, #f8f8f8 40px, #e8e8e8 80px);
    background-size: ${itemWidth}px ${itemHeight}px;
    width: ${itemWidth}px;
    height: ${itemHeight}px;
    border-radius: ${theme.borderRadius.roundedBox};
    margin-top: 1.5rem;
    animation: animation 1.5s infinite;

    @keyframes animation {
      0% {
        background-position: -100px;
      }
      40%,
      100% {
        background-position: 270px;
      }
    }
  `,
);

const SkeletonPlaceholder = styled.span<{ width: number }>(
  ({ width }) => css`
    background: linear-gradient(90deg, #e8e8e8 0px, #f8f8f8 40px, #e8e8e8 80px);
    background-size: 350px;
    width: ${width}px;
    height: 1.45rem;
    border-radius: 3px;
    margin-top: 1.5rem;
    animation: animation 1.5s infinite;

    @keyframes animation {
      0% {
        background-position: -100px;
      }
      40%,
      100% {
        background-position: 270px;
      }
    }
  `,
);

export const HorizontalDivider = styled.div`
  border-bottom: 1px solid ${theme.defaultTheme.textSecondary + OPACITY_35};
  margin-top: 13px;
  width: 100%;
`;
