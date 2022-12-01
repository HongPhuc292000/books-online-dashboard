import palette from "./theme/palette";

const appbarSmHeight = 8;
const appbarXsHeight = 7;
const mainPadding = 4;
const spacing = 8;

export const appbarHeight = {
  sm: appbarSmHeight,
  xs: appbarXsHeight,
  mainSm: `${appbarSmHeight * spacing + mainPadding * spacing * 2}px`,
  mainXs: `${appbarXsHeight * spacing + mainPadding * spacing * 2}px`,
  mainPadding,
};

export const primaryColor = palette.primary.main;
