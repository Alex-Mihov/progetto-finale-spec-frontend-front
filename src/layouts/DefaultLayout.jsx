import { Outlet } from "react-router-dom"
import Header from "../components/Header.jsx"

export default function DefaultLayout() {
    return (
        <>
            {/* Renderizza il componente Header */}
            <Header />
            <main>
                {/* Outlet renderizza il contenuto della rotta figlia */}
                <Outlet />
            </main>
        </>
    )
}
