import { Outlet } from "react-router"
import Footer from "../footer"
import Header from "../header"
import { customTheme } from "../theme/theme";
import { ThemeProvider } from "@mui/material";

export default function Layout() {
    return (
      <ThemeProvider theme={customTheme}>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </ThemeProvider>
    );
}