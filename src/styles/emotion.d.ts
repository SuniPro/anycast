import "@emotion/react";
import {
  defaultModeTypes,
  darkModeTypes,
  BorderRadiusTypes,
  ColorTypes,
  DeviceSizeTypes,
  FlexLayoutTypes,
  FontSizeTypes,
  WindowSizeTypes,
} from "./theme";

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {
    mode: defaultModeTypes | darkModeTypes;
    deviceSize: DeviceSizeTypes;
    windowSize: WindowSizeTypes;
    colors: ColorTypes;
    fontSize: FontSizeTypes;
    borderRadius: BorderRadiusTypes;
    flexLayout: FlexLayoutTypes;
  }
}
