/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#33F2D8',
        'primary2': '#1DE9B6',
        'background': '#303030',
        'background-light': '#424242',
        'background-lighter': '#505050',
        'background-lightest': '#616161',
      },
    },
  },
  plugins: [],
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