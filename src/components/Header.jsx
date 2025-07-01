import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import "../componentsCSS/HeaderCSS.css";

export default function Header() {
    // Stato locale per il testo di ricerca
    const [searchQuery, setSearchQuery] = useState("");

    // Hook per la navigazione programmatica
    const navigate = useNavigate();

    // Accesso ai dati globali del context
    const { compareGames, favoriteGames } = useGlobalContext();

    // Gestisce la ricerca quando l'utente invia il form
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Previene il refresh della pagina

        if (searchQuery.trim()) {
            // Se c'è del testo, naviga alla pagina giochi con query di ricerca
            navigate(`/records?search=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            // Se il campo è vuoto, mostra tutti i giochi senza filtri
            navigate('/records');
        }
    };

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

                {/* Form di ricerca */}
                <form className="search-container" onSubmit={handleSearchSubmit}>
                    {/* Input di ricerca controllato */}
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Cerca giochi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* Pulsante per inviare la ricerca */}
                    <button type="submit" className="search-button">
                        🔍
                    </button>
                </form>
            </div>
        </header>
    );
}
