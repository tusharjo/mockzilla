import { theme } from "@chakra-ui/core";
import customColors from "./colors";

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    ...customColors,
  },
  fonts: {
    ...theme.fonts,
    body: '"Montserrat", sans-serif',
    heading: '"Montserrat", sans-serif',
  },
};

export default customTheme;
