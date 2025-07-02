import { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import "../componentsCSS/HeaderCSS.css";

export default function Header() {
    // Hook per la navigazione programmatica
    const navigate = useNavigate();

    // Accesso ai dati globali del context
    const { compareGames, favoriteGames } = useGlobalContext();

    // Funzione debounce per ritardare la ricerca
    function debounce(callback, delay) {
        let timer;
        return (value) => {
            clearTimeout(timer);
            timer = setTimeout(() => callback(value), delay);
        };
    }

    // Funzione per eseguire la ricerca
    const performSearch = useCallback((searchValue) => {
        if (searchValue.trim()) {
            // Se c'è del testo, naviga alla pagina giochi con query di ricerca
            navigate(`/records?search=${encodeURIComponent(searchValue.trim())}`);
        } else {
            // Se il campo è vuoto, mostra tutti i giochi senza filtri
            navigate('/records');
        }
    }, [navigate]);

    // Crea la funzione di ricerca con debounce (500ms di ritardo)
    const debounceSearch = useCallback(debounce(performSearch, 500), [performSearch]);

    return (
        <header className="header">
            {/* Container principale con layout flexbox */}
            <div className="header-container">

                {/* Logo - cliccabile per tornare alla home */}
                <Link to="/" className="logo-link">
                    <h1 className="logo">GameGalaxy</h1>
                </Link>

                {/* Menu di navigazione principale */}
                <nav className="nav-links">
                    {/* Link alla pagina di tutti i giochi */}
                    <Link to="/records" className="nav-link">
                        Giochi
                    </Link>

                    {/* Link ai giochi preferiti con contatore */}
                    <Link to="/favorites" className="nav-link favorites-link">
                        ❤️ Preferiti
                        {/* Mostra il numero di giochi nei preferiti se > 0 */}
                        {favoriteGames.length > 0 && (
                            <span className="favorites-count">
                                ({favoriteGames.length})
                            </span>
                        )}
                    </Link>

                    {/* Link al confronto giochi with contatore */}
                    <Link to="/compare" className="nav-link compare-link">
                        🔄 Confronta
                        {/* Mostra il numero di giochi nel confronto se > 0 */}
                        {compareGames.length > 0 && (
                            <span className="compare-count">
                                ({compareGames.length})
                            </span>
                        )}
                    </Link>
                </nav>

                {/* Search bar con debounce */}
                <div className="search-container">
                    {/* Input di ricerca con debounce */}
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Cerca nel sito..."
                        onChange={e => debounceSearch(e.target.value)}
                    />
                    {/* Icona di ricerca decorativa */}
                    <span className="search-icon">🔍</span>
                </div>
            </div>
        </header>
    );
}
