import { PlayfairFont, InterFont } from '../fonts';

export const chakraVMFFConfig = {
  colors: {
    brand: {
      100: '#181818',
      200: '#E21E25',
      300: '#CFCBBF',
      400: '#E6C7B3'
    }
  },
  fonts: {
    body: InterFont.style.fontFamily,
    heading: PlayfairFont.style.fontFamily,
    mono: InterFont.style.fontFamily,
  },
  sizes: {
    container: {
      xl: '1440px'
    }
  }
}