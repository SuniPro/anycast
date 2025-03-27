import styled from "@emotion/styled";
import { css } from "@mui/material";
import theme from "../../../styles/theme";
import { ReactNode } from "react";

export function WordBox(props: {
  className?: string;
  size?: { width: number; height: number };
  color?: string;
  icon?: ReactNode;
  isActive?: boolean;
  activeColor?: string;
  fontWeight?: number;
  fontSize?: number;
  fontStyle?: string;
  label: ReactNode;
}) {
  const { className, icon, label, ...other } = props;
  return (
    <WordContainer className={className}>
      <i>{icon}</i>
      <Word {...other}>{label}</Word>
    </WordContainer>
  );
}

const WordContainer = styled.div`
  ${theme.flexLayout.row}
  ${theme.flexLayout.center}
`;

const Word = styled.span<{
  size?: {
    width: number;
    height: number;
  };
  isActive?: boolean;
  color?: string;
  activeColor?: string;
  fontWeight?: number;
  fontSize?: number;
  fontStyle?: string;
}>(
  ({
    size,
    isActive,
    color,
    activeColor = theme.defaultTheme.textAccent,
    fontSize,
    fontWeight,
    fontStyle = "sans-serif",
  }) => css`
    ${size && "width: ${size.width}px; height: ${size.height}px;"}
    margin: 0;
    padding: 0;

    color: ${isActive ? activeColor : color};
    font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    font-family: ${fontStyle};

    &:hover {
      color: ${activeColor};
    }

    ${theme.flexLayout}
    ${theme.flexLayout.center}
  `,
);
