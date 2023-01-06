import 'styled-components';

declare module 'styled-components' {
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
        blueActive: string;
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
        active: string;
        activeDialog: string;
        border: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
      };
    };
    fontSize: {
      large: string;
      big: string;
      def: string;
      xs: string;
      md: string;
    };
    shadow: {
      button: string;
    };
  }
}
