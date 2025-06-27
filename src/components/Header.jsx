import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import "../componentsCSS/HeaderCSS.css";

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const { compareGames } = useGlobalContext();

    // Gestisce la ricerca quando l'utente invia il form
    const handleSearchSubmit = (e) => {
        e.preventDefault();

        if (searchQuery.trim()) {
            // Se c'è del testo, cerca i giochi
            navigate(`/records?search=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            // Se il campo è vuoto, mostra tutti i giochi
            navigate('/records');
        }
    };

    return (
        <header className="header">
            <div className="header-container">

                {/* Logo - cliccabile per tornare alla home */}
                <Link to="/" className="logo-link">
                    <h1 className="logo">GameGalaxy</h1>
                </Link>

                {/* Menu di navigazione */}
                <nav className="nav-links">
                    <Link to="/records" className="nav-link">
                        Giochi
                    </Link>
                    <Link to="/compare" className="nav-link compare-link">
                        Confronta
                        {/* Mostra il numero di giochi nel confronto */}
                        {compareGames.length > 0 && (
                            <span className="compare-count">
                                ({compareGames.length})
                            </span>
                        )}
                    </Link>
                </nav>

                {/* Barra di ricerca */}
                <form className="search-container" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Cerca giochi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                        🔍
                    </button>
                </form>
            </div>
        </header>
    );
}
