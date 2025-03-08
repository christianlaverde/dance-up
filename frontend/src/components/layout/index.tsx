import { Outlet } from "react-router"
import Footer from "../footer"
import Header from "../header"

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Layout() {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}