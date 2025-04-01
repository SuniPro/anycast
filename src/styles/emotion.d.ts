import "@emotion/react";
import {
  defaultModeTypes,
  darkModeTypes,
  BorderRadiusTypes,
  ColorTypes,
  DeviceSizeTypes,
  FlexLayoutTypes,
  FontSizeTypes,
  FontTypes,
  WindowSizeTypes,
} from "./theme";

declare module "@emotion/react" {
  export interface Theme extends MuiTheme {
    mode: defaultModeTypes | darkModeTypes;
    deviceSize: DeviceSizeTypes;
    windowSize: WindowSizeTypes;
    colors: ColorTypes;
    fontStyle: FontTypes;
    fontSize: FontSizeTypes;
    borderRadius: BorderRadiusTypes;
    flexLayout: FlexLayoutTypes;
  }
}
