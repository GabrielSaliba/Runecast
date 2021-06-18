import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @media screen and (max-width: 1080px) {
    html {
      font-size: 93.75%; // 15px
    }
  }

  @media screen and (max-width: 720px) {
    html {
      font-size: 87.5%; // 14px
    }
  }

  :root {
    --white: ${props => props.theme.colors.panel_color};

    --primary-50:${props => props.theme.colors.primary_50};
    --primary-100: ${props => props.theme.colors.primary_100};
    --primary-200: ${props => props.theme.colors.primary_200};
    --primary-500: ${props => props.theme.colors.primary_500};
    --primary-800: ${props => props.theme.colors.primary_800};

    --green-500: ${props => props.theme.colors.green_500};

    --secondary-500:  ${props => props.theme.colors.secondary_500}; 
    --secondary-800: ${props => props.theme.colors.secondary_800};  

    --black-100: ${props => props.theme.colors.black_100};
    --black-800: ${props => props.theme.colors.black_800};

    --player-text: ${props => props.theme.colors.player_text};
    --gradient: ${props => props.theme.colors.gradient};
  }

  body {
    background: var(--primary-50)
  }

  body, input, textarea, button {
    font: 500 1rem Inter, sans-serif;
    color: var(--primary-500);
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    font-family: Lexend, sans-serif;
    color: var(--primary-800);
  }
  /*
  Utilizando rem permite a interface ser 
  redimensionada de acordo com o tamanho da fonte selecionada pelo usuário.
  */
  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  button {
    cursor: pointer;
  }
`