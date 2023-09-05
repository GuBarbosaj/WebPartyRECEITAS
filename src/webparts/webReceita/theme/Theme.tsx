import type {BrandVariants, Theme} from '@fluentui/react-components'
import {createLightTheme,createDarkTheme} from '@fluentui/react-components'

const myNewTheme: BrandVariants = { 
        10: "#060200",
        20: "#251206",
        30: "#3F1B0A",
        40: "#54210D",
        50: "#6A270D",
        60: "#812D0D",
        70: "#99330C",
        80: "#B1390A",
        90: "#CA3F07",
        100: "#E34503",
        110: "#F75210",
        120: "#FE6D35",
        130: "#FF8757",
        140: "#FFA079",
        150: "#FFB698",
        160: "#FFCCB7"
    };
    
const lightTheme: Theme = {
    ...createLightTheme(myNewTheme), 
};

    const darkTheme: Theme = {
    ...createDarkTheme(myNewTheme), 
};
    

darkTheme.colorBrandForeground1 = myNewTheme[110];
darkTheme.colorBrandForeground2 = myNewTheme[120];

export {lightTheme, darkTheme}