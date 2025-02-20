import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import useStore from "./useStore"

// eslint-disable-next-line react/prop-types
export default function ThemeWrapper ({children}){
    const {mode} = useStore()
    const theme = createTheme({
        palette: {
            mode: mode,
            
        }
    })
    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
    </ThemeProvider>
}