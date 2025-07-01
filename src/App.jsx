// Import delle librerie e componenti necessari
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout.jsx"
import HomePage from "./pages/HomePage.jsx"
import RecordList from "./pages/RecordList.jsx"
import DetailPage from "./pages/DetailPage.jsx"
import ComparePage from "./pages/ComparePage.jsx"
import FavoritesPage from "./pages/FavoritesPage.jsx"
import { GlobalContextProvider } from "./context/GlobalContext.jsx"

function App() {
  return (
    // Provider per lo stato globale dell'applicazione
    <GlobalContextProvider>
      {/* Router principale per la navigazione */}
      <BrowserRouter>
        <Routes>
          {/* Layout comune per tutte le pagine (Header + Footer) */}
          <Route element={<DefaultLayout />}>
            {/* Pagina principale */}
            <Route path="/" element={<HomePage />} />

            {/* Lista di tutti i giochi */}
            <Route path="/records" element={<RecordList />} />

            {/* Dettagli di un singolo gioco - parametro dinamico :id */}
            <Route path="/game/:id" element={<DetailPage />} />

            {/* Pagina di confronto tra giochi */}
            <Route path="/compare" element={<ComparePage />} />

            {/* Pagina dei giochi preferiti */}
            <Route path="/favorites" element={<FavoritesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  )
}

export default App
