const theme = {
  colors: {
    // Common
    common: {
      orange: '#febb02',
      primaryBlue: '#4388B9',
      darkBlue: '#2b09ff',
      btnBorder: '#d9d9d9',
      gray: '#888',
      green: '#008009',
      blueHover: `#0070cb`,
      blueActive: '#0062b3',
      semitransparentBlack: `rgba(0,0,0, 0.45)`,
    },
  },

  fontSize: {
    large: '48px',
    big: '24px',
    md: '16px',
    def: '14px',
    xs: '13px',
  },

  shadow: {
    button: `0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%),
    0px 1px 18px 0px rgb(0 0 0 / 12%)`,
  },
};

export default theme;

export const LightTheme = {
  text: {
    primary: '#00000',
    secondary: '#7d7f81',
    disabled: 'rgba(#fff, 0.5)',
  },
  background: {
    icon: '#6B7782',
    primary: '',
    secondary: '',
    tertiary: '',
    hover: '',
    myMessage: '',
    receivedMessage: '',
    scrollThumb: '',
    scrollTrack: '',
    active: '',
    border: `rgba(0,0,0, 0.2)`,
  },
};

export const DarkTheme = {
  background: {
    primary: '#0E1621',
    secondary: '#17212B',
    tertiary: '#242F3D',
    hover: '#222E3C',
    myMessage: '#2B5278',
    receivedMessage: '#182633',
    icon: '#778491',
    scrollThumb: '#4b545c',
    scrollTrack: '#26323d',
    active: '#2F3D4B',
    border: `rgba(255,255,255, 0.2)`,
  },
  text: {
    primary: '#fff',
    secondary: '#7e7e7e',
    disabled: '#ffffff66',
  },
};

//
export enum ThemesEnum {
  light = 'light',
  dark = 'dark',
}
