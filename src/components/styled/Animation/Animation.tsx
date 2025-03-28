import { keyframes } from "@emotion/react";

export const scaleIn = keyframes`
  0% {
      visibility: hidden;
    scale: 0.7;
    opacity: 0;
  }
  100% {
      visibility: visible;
    scale: 1;
    opacity: 1;
  }
`;

export const scaleOut = keyframes`
  0% {
    visibility: visible;
    scale: 1;
    opacity: 1;
  }
  100% {
    visibility: hidden;
    scale: 0.7;
    opacity: 0;
  }
`;
