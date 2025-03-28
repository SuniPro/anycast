import styled from "@emotion/styled";
import { css } from "@mui/material";
import { ReactElement } from "react";
import { AppProps, FuncIconItemProps, FuncItemProps } from "./ButtonPropsType";
import theme from "../../../styles/theme";
import { EllipsisCase } from "../../layouts/Layouts";

export function AppItem(props: AppProps) {
  const { className, icon, label, caseWidth, func, ...other } = props;

  return (
    <AppCase caseWidth={caseWidth} onClick={func}>
      <IconBox className={className} {...other}>
        {icon}
      </IconBox>
      <AppName text={label} testAlign="center" width={60} />
    </AppCase>
  );
}

const AppCase = styled.div<{ caseWidth?: string }>(
  ({ caseWidth = "100%" }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: ${caseWidth};
    height: 100%;

    color: ${theme.defaultTheme.textPrimary};
  `,
);

const IconBox = styled.div<{ width?: number; height?: number }>(
  ({ width = 50, height = 50 }) => css`
    width: ${width}px;
    height: ${height}px;
    flex-shrink: 0;
    margin-bottom: 10px;
    border-radius: 14px;

    svg {
      width: ${width}px;
      height: ${width}px;
      fill: ${theme.defaultTheme.textPrimary};
      transition: fill 0.2s;

      &:hover {
        fill: ${theme.defaultTheme.textAccent};
      }
    }
  `,
);

const AppName = styled(EllipsisCase)`
  font-family: ${theme.fontStyle.yesGothicLight};
  font-size: 15px;
`;

export function FuncItem(props: FuncItemProps): ReactElement {
  const { className, label, func, isActive, ...other } = props;

  return (
    <StyledFuncButton
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
  return (
    <StyledFuncButton className={className} onClick={func} {...other}>
      <IconCase>{icon}</IconCase>
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
}>(
  ({
    isActive,
    activeBackgroundColor = theme.defaultTheme.buttonHoverBackground,
    inActiveBackgroundColor = theme.defaultTheme.buttonBackground,
  }) => css`
    background-color: ${isActive
      ? activeBackgroundColor
      : inActiveBackgroundColor};

    color: ${theme.defaultTheme.textPrimary};

    &:hover {
      background: ${activeBackgroundColor
        ? activeBackgroundColor
        : theme.defaultTheme.buttonHoverBackground};
    }
    &:active {
      background-color: ${theme.defaultTheme.menuActive};
      background-size: 100%;
      transition: background 0s;
    }
    transition: background 0.8s;
  `,
);

const IconCase = styled.i`
  ${theme.flexLayout.column}
  ${theme.flexLayout.center}
  height: auto;
`;
