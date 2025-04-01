import styled from "@emotion/styled";
import { css, Global, Theme, useTheme } from "@emotion/react";
import { OPACITY_35 } from "../../styles/theme";
import { Container } from "./Frames/FrameLayouts";
import { ReactNode } from "react";
import { StyledImage } from "../styled/Image/Image";
import AnyCastLogo from "../../assets/image/anyCast-logo.png";

export const ASPECT_RATIO = {
  widesScreen: { w: 16, h: 9 },
  ultraWideScreen: { w: 21, h: 9 },
  standard: { w: 4, h: 3 },
  surfaceRatio: { w: 3, h: 2 },
  WXGA: { w: 16, h: 10 },
};

/* LIST CONTAINER LAYOUTS -- START */

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

export const MainTitleLine = styled.div<{ theme: Theme }>(
  ({ theme }) => css`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        font-family: ${theme.fontStyle.montserrat};
    }
    `,
);

export const MainTitle = styled.h2<{ theme: Theme }>(
  ({ theme }) => css`
    font-family: ${theme.mode.font.component.mainTitle};
    color: ${theme.mode.textPrimary};
  `,
);

export const ControlBox = styled.div<{ theme: Theme }>(
  ({ theme }) => css`
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
        background-color: ${theme.mode.buttonHoverBackground};
        background-size: 100%;
        transition: background 0s;
      }
    }

    svg {
      width: 20px;
    }
  `,
);

export const ItemContainer = styled(Container)<{
  activeScroll?: boolean;
  gap: number;
  height?: number;
  theme: Theme;
}>(
  ({ activeScroll, gap, height, theme }) => css`
    width: 100%;
    height: ${height ? `${height}px` : "100%"};
    overflow: hidden;
    flex-direction: row;
    flex-wrap: ${activeScroll ? "nowrap" : "wrap"};
    justify-content: flex-start;
    align-items: flex-start;

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
  display: flex;
  flex-direction: column;

  gap: 8px;
`;

export const Item = styled.div<{
  width: number;
  height?: number;
  theme: Theme;
}>(
  ({ width, height, theme }) => css`
    max-width: ${width}px;
    min-width: ${width}px;
    height: ${height ? `${height}px` : "100%"};
    border-radius: ${theme.borderRadius.roundedBox};
    background-color: ${theme.mode.cardBackground};
    ${theme.flexLayout.column};
    align-items: center;
    transition: all 0.3s ease-in-out;
    scroll-snap-align: start;
    overflow: hidden;

    &:hover {
      //box-shadow: 2px 4px 16px ${theme.mode.contentBackground};
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
  display: flex;
  flex-direction: row;
`;

export const ItemDescription = styled.span<{ theme: Theme }>(
  ({ theme }) => css`
    width: 100%;
    height: 18px;
    ${theme.flexLayout.column};
    justify-content: center;
    align-items: flex-start;
    color: ${theme.mode.textSecondary};
    text-transform: uppercase;
    font-family: ${theme.mode.font.component.itemTitle};
    font-weight: 600;
    font-size: 14px;
    margin: 0;
    text-align: left;
  `,
);

/* LIST CONTAINER LAYOUTS -- END */

export function EllipsisCase(props: {
  text: ReactNode;
  testAlign: "center" | "left" | "right";
  className?: string;
  width: number;
  func?: () => void;
}) {
  const theme = useTheme();
  const { text, className, width, testAlign, func } = props;

  return (
    <TextCase className={className} onClick={func} theme={theme}>
      <Text textAlign={testAlign} width={width}>
        {text}
      </Text>
    </TextCase>
  );
}

export const TextCase = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

export const ProfileCase = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

export const Profile = styled(StyledImage)<{ theme: Theme }>(
  ({ theme }) => css`
    background-color: ${theme.colors.white};
    background-size: 40px;
    border-radius: ${theme.borderRadius.roundedBox};
  `,
);

export const InfoLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export function SkeletonItemContainer(props: {
  width: number;
  height: number;
}) {
  const { width, height } = props;
  const theme = useTheme();
  return (
    <ItemCase theme={theme}>
      <SkeletonItem
        width={width}
        itemWidth={width}
        itemHeight={height}
        theme={theme}
      />
      <DescriptionLine theme={theme}>
        <ProfileCase>
          <Profile
            imageUrl={AnyCastLogo}
            size={{
              width: 40,
              height: 40,
            }}
            theme={theme}
          />
        </ProfileCase>
        <InfoLine>
          <SkeletonPlaceholder width={300}></SkeletonPlaceholder>
        </InfoLine>
      </DescriptionLine>
    </ItemCase>
  );
}

const SkeletonItem = styled(Item)<{
  itemWidth: number;
  itemHeight: number;
  theme: Theme;
}>(
  ({ itemWidth, itemHeight, theme }) => css`
    background: linear-gradient(90deg, #e8e8e8 0px, #f8f8f8 40px, #e8e8e8 80px);
    background-size: ${itemWidth}px ${itemHeight}px;
    width: ${itemWidth}px;
    height: ${itemHeight}px;
    border-radius: ${theme.borderRadius.roundedBox};
    animation: animation 1s infinite;

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
    margin-top: 10px;
    animation: animation 1s infinite;

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

export const HorizontalDivider = styled.div<{ theme: Theme }>(
  ({ theme }) => css`
    border-bottom: 1px solid ${theme.mode.textSecondary + OPACITY_35};
    margin-top: 13px;
    width: 100%;
  `,
);

export function GlobalStyled() {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        width: 100%;
        position: relative;

        z-index: -1;
        background-color: ${theme.mode.bodyBackground};

        :root {
          font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
          line-height: 1.5;
          font-weight: 400;

          color-scheme: light dark;

          color: ${theme.mode.textPrimary};
          background-color: ${theme.mode.bodyBackground};

          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          margin: 0;
          display: flex;
          place-items: center;
          min-width: 320px;
          min-height: 100vh;
          color: ${theme.mode.textPrimary};
          background-color: ${theme.mode.bodyBackground};
          cursor: none;
        }

        button {
          border-radius: 8px;
          border: 1px solid transparent;
          padding: 0.6em 1.2em;
          font-size: 1em;
          font-weight: 500;
          font-family: inherit;
          background-color: #1a1a1a;
          transition: border-color 0.25s;
        }
      `}
    />
  );
}
