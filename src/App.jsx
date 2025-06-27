import { BrowserRouter, Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout.jsx"
import HomePage from "./pages/HomePage.jsx"
import RecordList from "./pages/RecordList.jsx"
import DetailPage from "./pages/DetailPage.jsx"
import ComparePage from "./pages/ComparePage.jsx"
import { GlobalContextProvider } from "./context/GlobalContext.jsx"

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/records" element={<RecordList />} />
            <Route path="/game/:id" element={<DetailPage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  )
}

export default App
