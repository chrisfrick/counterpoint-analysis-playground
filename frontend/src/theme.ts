import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          '50': '#e8f5fd',
          '100': '#b9e1f9',
          '200': '#8acdf4',
          '300': '#5bb9f0',
          '400': '#2ca5ec',
          '500': '#138cd3',
          '600': '#0f6da4',
          '700': '#0b4e75',
          '800': '#062f46',
          '900': '#021017',
        },
        neutral: {
          '50': '#eef2f7',
          '100': '#cbd7e7',
          '200': '#a8bdd7',
          '300': '#85a2c7',
          '400': '#6288b6',
          '500': '#496e9d',
          '600': '#38567a',
          '700': '#283d57',
          '800': '#182534',
          '900': '#080c11',
        },
        success: {
          '50': '#ebf9f7',
          '100': '#c3eee8',
          '200': '#9ce3d8',
          '300': '#74d7c9',
          '400': '#4cccb9',
          '500': '#33b3a0',
          '600': '#288b7c',
          '700': '#1c6359',
          '800': '#113c35',
          '900': '#061412',
        },
      },
    },
    dark: {
      palette: {},
    },
  },
});

export default theme;
