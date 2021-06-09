import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string,

    colors: {
  
      primary_50: string,
      primary_100:string,
      primary_200:string,
      primary_500:string,
      primary_800:string,
  
      green_500: string,
  
      secondary_500: string,
      secondary_800: string,
  
      white: string,
      player_text: string,
  
      black_100: string,
      black_800: string,

      gradient: string,
    }
  }
}