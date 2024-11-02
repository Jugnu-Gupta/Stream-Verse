/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': { 'min': '0px', 'max': '500px' },
      'sm': '500px',
      '2sm': '575px',
      'md': '640px',
      'lg': '766px',
      '2lg': '900px',
      'xl': '1024px',
      '2xl': '1280px',
    },
    extend: {
      colors: {
        // 'primary': '#33F2D8',
        // 'primary2': '#1DE9B6',
        'background2': '#020617', // main bg color
        'background3': '#020617', // main bg 2 color
        'border': '#374151',
        'background': '#303030',
        'background-light': '#424242',
        'background-lighter': '#505050',
        'background-lightest': '#616161',
        'primary-text': '#ffffffcc',
        'primary-text2': '#ffffffa6',

        'primary': '#0078e1',
        'primaryBg': '#030014',
        'secondaryBg': '#0f172a',
        'secondaryDarkBg': '#020617',
        'secondary': '#fff',
        'dark': '#000',
        'dark-light': '#6a7280',
        'dark-lighter': '#D1D5DB',

      },
      keyframes: {
        right: {
          '0%': { transform: 'translateX(-140%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        right2: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        left: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        right: 'right .5s linear forwards',
        right2: 'right2 .5s ease-in-out forwards',
        left: 'left 0.3s linear forwards',
      },
    },
    plugins: [],
  }
}

// ## Themes ##
// teal:
//   # Main Stuff #
//   primary-color: "#1DE9B6" # Primary (most of the UI)
//   primary-background-color: "#303030" # Primary background colour (dialogs, e.t.c)
//   secondary-background-color: "#303030" # Secondary background colour (main UI background)
//   paper-card-background-color: "#424242" # Card background colour
//   paper-item-icon-color: "#1DE9B6" # Icon colour
//   primary-text-color: "#FFFFFF" # Primary text colour
//   secondary-text-color: "rgba(255, 255, 255, 0.7)" # Secondary text colour
//   disabled-text-color: "rgba(255, 255, 255, 0.5)" # Disabled text colour
//   divider-color: "rgba(255, 255, 255, 0.12)" # Divider colour
//   paper-card-header-color: "#FFFFFF" # Card header text colour

//   # Nav Menu #
//   paper-listbox-background-color: "#424242" # Listbox background colour
//   paper-listbox-color: "#FFFFFF" # Listbox text colour
//   paper-grey-200: "#616161" # Listbox selected item background colour

//   # Switches #
//   paper-toggle-button-checked-ink-color: "#1DE9B6"
//   paper-toggle-button-checked-button-color: "#1DE9B6"
//   paper-toggle-button-checked-bar-color: "#1DE9B6"

//   # Sliders #
//   paper-slider-knob-color: "#1DE9B6"
//   paper-slider-knob-start-color: "#1DE9B6"
//   paper-slider-pin-color: "#1DE9B6"
//   paper-slider-active-color: "#1DE9B6"
//   paper-slider-secondary-color: "#33F2D8"

//   table-row-alternative-background-color: "#303030"
//   paper-toggle-button-unchecked-bar-color: "#505050"