import { useGlobalContext } from "../context/GlobalContext.jsx";
import RecordCard from "../components/RecordCard.jsx";
import { Link } from "react-router-dom";
import "../componentsCSS/FavoritesPageCSS.css";

export default function FavoritesPage() {
    // Accesso ai giochi preferiti e funzione di rimozione dal context globale
    const { favoriteGames, removeFromFavorites } = useGlobalContext();

    return (
        <div className="favorites-page-container">
            {/* Header della pagina con titolo e descrizione */}
            <div className="favorites-header">
                <h1>I tuoi Preferiti</h1>
                <p>Tutti i giochi che hai salvato nei preferiti</p>
            </div>

            {/* Rendering condizionale: mostra messaggio se non ci sono preferiti */}
            {favoriteGames.length === 0 ? (
                <div className="no-favorites">
                    <div className="no-favorites-content">
                        {/* Icona decorativa */}
                        <div className="no-favorites-icon">❤️</div>
                        <h2>Nessun gioco nei preferiti</h2>
                        <p>
                            Non hai ancora aggiunto giochi ai tuoi preferiti.
                            Esplora la nostra collezione e aggiungi i tuoi giochi preferiti!
                        </p>
                        {/* Link per navigare alla pagina dei giochi */}
                        <Link to="/records" className="browse-games-btn">
                            Sfoglia giochi
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    {/* Informazioni sui preferiti: contatore con testo dinamico */}
                    <div className="favorites-info">
                        <p>
                            <strong>{favoriteGames.length}</strong>
                            {/* Testo singolare/plurale basato sul numero */}
                            {favoriteGames.length === 1 ? ' gioco nei preferiti' : ' giochi nei preferiti'}
                        </p>
                    </div>

                    {/* Griglia dei giochi preferiti */}
                    <div className="favorites-grid">
                        {favoriteGames.map((game) => (
                            <div key={game.id} className="favorite-item">
                                {/* Card del gioco riutilizzabile */}
                                <RecordCard game={game} />
                                {/* Overlay con pulsante di rimozione in sovraimpressione */}
                                <div className="favorite-overlay">
                                    <button
                                        onClick={() => removeFromFavorites(game.id)}
                                        className="remove-favorite-btn"
                                        title="Rimuovi dai preferiti"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}