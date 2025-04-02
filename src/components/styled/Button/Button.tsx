import styled from "@emotion/styled";
import { ReactElement } from "react";
import { AppProps, FuncIconItemProps, FuncItemProps } from "./ButtonPropsType";
import { EllipsisCase } from "../../layouts/Layouts";
import { css, Theme, useTheme } from "@emotion/react";

export function AppItem(props: AppProps) {
  const { className, icon, label, caseWidth, func, ...other } = props;
  const theme = useTheme();

  return (
    <AppCase caseWidth={caseWidth} onClick={func} theme={theme}>
      <IconBox theme={theme} className={className} {...other}>
        {icon}
      </IconBox>
      <AppName text={label} testAlign="center" width={60} theme={theme} />
    </AppCase>
  );
}

const AppCase = styled.div<{ caseWidth?: string; theme: Theme }>(
  ({ caseWidth = "100%", theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: ${caseWidth};
    height: 100%;

    color: ${theme.mode.textPrimary};
  `,
);

const IconBox = styled.div<{ width?: number; height?: number; theme: Theme }>(
  ({ width = 50, height = 50, theme }) => css`
    width: ${width}px;
    height: ${height}px;
    flex-shrink: 0;
    margin-bottom: 10px;
    border-radius: 14px;

    svg {
      width: ${width}px;
      height: ${width}px;
      fill: ${theme.mode.textPrimary};
      transition: fill 0.2s;

      &:hover {
        fill: ${theme.mode.textAccent};
      }
    }
  `,
);

const AppName = styled(EllipsisCase)<{ theme: Theme }>(
  ({ theme }) => css`
    font-family: ${theme.fontStyle.yesGothicLight};
    font-size: 15px;
  `,
);

export function FuncItem(props: FuncItemProps): ReactElement {
  const { className, label, func, isActive, ...other } = props;
  const theme = useTheme();

  return (
    <StyledFuncButton
      theme={theme}
      className={className}
      onClick={func}
      {...other}
      isActive={isActive}
    >
      {label}
    </StyledFuncButton>
  );
}

export function FuncIconItem(props: FuncIconItemProps) {
  const { className, icon, label, func, ...other } = props;
  const theme = useTheme();
  return (
    <StyledFuncButton
      theme={theme}
      className={className}
      onClick={func}
      {...other}
    >
      <IconCase theme={theme}>{icon}</IconCase>
      {label}
    </StyledFuncButton>
  );
}

// export const ButtonWrapper = styled.div`
//   width: 100%;
//   height: 100%;
//
//   ${theme.flexLayout.row}
//   ${theme.flexLayout.center}
// `;
export const StyledFuncButton = styled.button<{
  isActive?: boolean;
  inActiveBackgroundColor?: string;
  activeBackgroundColor?: string;
  theme: Theme;
}>(
  ({
    isActive,
    theme,
    activeBackgroundColor = theme.mode.buttonHoverBackground,
    inActiveBackgroundColor = theme.mode.buttonBackground,
  }) => css`
    background-color: ${isActive
      ? activeBackgroundColor
      : inActiveBackgroundColor};

    color: ${theme.mode.buttonText};

    margin: 0;
    padding: 0.6em 1.2em;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${activeBackgroundColor
        ? activeBackgroundColor
        : theme.mode.buttonHoverBackground};
    }
    &:active {
      background-color: ${theme.mode.menuActive};
      background-size: 100%;
      transition: background 0s;
    }
    transition: background 0.8s;

    &:focus {
      outline: none;
    }
  `,
);

const IconCase = styled.i<{ theme: Theme }>(
  ({ theme }) => css`
    ${theme.flexLayout.column}
    ${theme.flexLayout.center}
  height: auto;
  `,
);
