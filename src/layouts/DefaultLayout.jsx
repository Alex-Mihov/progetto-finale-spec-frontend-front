import { Outlet } from "react-router-dom"
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"

export default function DefaultLayout() {
    return (
        <>
            {/* Header fisso presente in tutte le pagine */}
            <Header />

            {/* Contenuto principale che cambia in base alla rotta */}
            <main>
                {/* Outlet renderizza il contenuto della rotta figlia */}
                <Outlet />
            </main>

            {/* Footer fisso presente in tutte le pagine */}
            <Footer />
        </>
    )
}
