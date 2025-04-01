import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

export const ComponentContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PageWrapper = styled.div<{
  width: number;
  marginTop?: number;
  gap?: number;
  theme: Theme;
}>(
  ({ width, marginTop = 5, gap = 40, theme }) => css`
    width: ${width}px;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${gap}px;
    box-sizing: border-box;
    margin-top: ${marginTop}rem;
    background-color: ${theme.mode.bodyBackground};
  `,
);
