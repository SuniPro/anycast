import styled from "@emotion/styled";
import theme from "../../../styles/theme";
import { css } from "@emotion/react";

export const MainFrameWrapper = styled.article<{ coordinateY?: number }>(
  ({ coordinateY = 5 }) => css`
    ${theme.flexLayout.column}
    width: 100%;
    align-items: center;
    transform: translateY(${coordinateY}%);
  `,
);

export const ResourcePageContainer = styled.section`
  width: 100%;
  ${theme.flexLayout.column}
  ${theme.flexLayout.center}
`;

export const ComponentContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  ${theme.flexLayout.column}
  ${theme.flexLayout.center}
`;

export const Container = styled.div`
  width: 100%;
  ${theme.flexLayout.column}
`;

export const StreamsContainer = styled.div<{ gap: number }>(
  ({ gap }) => css`
    width: 100%;
    gap: ${gap}px;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    ${theme.flexLayout.row}
  `,
);

export const PageWrapper = styled.div<{
  width: number;
  marginTop?: number;
  gap?: number;
}>(
  ({ width, marginTop = 5, gap = 40 }) => css`
    width: ${width}px;
    top: 0;
    ${theme.flexLayout.column}
    align-items: center;
    justify-content: center;
    gap: ${gap}px;
    box-sizing: border-box;
    margin-top: ${marginTop}rem;
  `,
);
