import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      common: {
        orange: string;
        primaryBlue: string;
        btnBorder: string;
        gray: string;
        darkBlue: string;
        green: string;
        blueHover: string;
        semitransparentBlack: string;
      };
    };
    currentTheme: {
      background: {
        icon: string;
        primary: string;
        secondary: string;
        tertiary: string;
        hover: string;
        myMessage: string;
        receivedMessage: string;
        scrollThumb: string;
        scrollTrack: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
    };
    fontSize: {
      large: string;
      big: string;
      def: string;
      xs: string;
      md: string;
    };
    shadow: {};
  }
}

export type ThemeTypes = "light" | "dark";
