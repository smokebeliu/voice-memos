import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const styles = {
  global: {
    body: {
      bg: 'custom.white',
      color: 'custom.black'
    }
  }
}

const colors = {
  custom: {
    accent: '#00CD90',
    'accent-0': '#00CD9000',
    'accent-50': '#00CD9080',
    danger: '#EF5350',
    white: '#fff',
    black: '#01220B',
    gray: '#5B5B5B',
    lightGray: '#A4A4A4',
    lightestGray: '#F5F5F5',
  }
}

const fonts = {
  body: '"DM Sans", sans-serif',
  heading: '"DM Sans", sans-serif',
  mono: 'Menlo, monospace'
}

const textStyles = {
  lg: {
    fontSize: '20px',
    fontWeight: '600'
  },
  md: {
    fontSize: '16px',
    fontWeight: '400'
  },
  sm: {
    fontSize: '12px',
    fontWeight: '400'
  }
}

const components = {
  Textarea: {
    baseStyle: {
      _hover: {
        outline: 'none'
      },
      _focus: {
        outline: 'none'
      }
    },
  },
  Button: {
    baseStyle: {
      height: '40px',
      borderRadius: '40px',
      padding: '0 16px',
      fontWeight: 500,
      fontSize: 16,
      color: 'custom.white',
      _hover: {
        opacity: 0.8
      }
    },
    variants: {
      outline: () => ({
        bg: 'transparent',
        borderColor: 'custom.accent',
        color: 'custom.accent',
        _hover: {
          bg: 'custom.accent',
          color: 'custom.white',
        }
      }),
      accent: () => ({
        bg: 'custom.accent',
      }),
      danger: () => ({
        bg: 'transparent',
        borderWidth: '1px',
        borderColor: 'custom.danger',
        color: 'custom.danger',
        _hover: {
          bg: 'custom.danger',
          color: 'custom.white',
        }
      }),
    },
  }
}

export const theme = extendTheme({
  fonts,
  colors,
  config,
  styles,
  textStyles,
  components,
})