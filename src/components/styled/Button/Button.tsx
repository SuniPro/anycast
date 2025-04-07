import styled from "@emotion/styled";
import { ReactElement } from "react";
import { FuncIconItemProps, FuncItemProps } from "./ButtonPropsType";
import { css, Theme, useTheme } from "@emotion/react";

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
