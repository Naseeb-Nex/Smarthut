import { Dimensions } from "react-native";


const { width, height } = Dimensions.get("window");

 



export const COLORS = {
    // base colors
    primary: "#6200EE", // vilot 
    secondary: "#CDCDD2",   // gray //#f5f6fb

    // LOGIN
    loginbg: '#3624b8',
    text: '#000000',
    plogin: '#121330',
    slogin: '#414757',
    error: '#f13a59',
    success: '#00B386',

    // colors
    black: "#1E1F20",
    white: "#FFFFFF",

    lightGray: "#F1F1F1",
    lightGray2: "#F6F6F7",
    lightGray3: "#D4D4D4",
    lightGray4: "#F5F6FB",
    transparent: "transparent",
    darkgray: '#898C95',
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};

export const FONTS = {
}


const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;