import { useGlobalContext } from "../context/GlobalContext.jsx";
import RecordCard from "../components/RecordCard.jsx";
import { Link } from "react-router-dom";
import "../componentsCSS/FavoritesPageCSS.css";

export default function FavoritesPage() {
    const { favoriteGames, removeFromFavorites } = useGlobalContext();

    const handleRemoveFromFavorites = (gameId) => {
        removeFromFavorites(gameId);
    };

    return (
        <div className="favorites-page-container">
            <div className="favorites-header">
                <h1>I tuoi Preferiti</h1>
                <p>Tutti i giochi che hai salvato nei preferiti</p>
            </div>

            {favoriteGames.length === 0 ? (
                <div className="no-favorites">
                    <div className="no-favorites-content">
                        <div className="no-favorites-icon">❤️</div>
                        <h2>Nessun gioco nei preferiti</h2>
                        <p>
                            Non hai ancora aggiunto giochi ai tuoi preferiti.
                            Esplora la nostra collezione e aggiungi i tuoi giochi preferiti!
                        </p>
                        <Link to="/records" className="browse-games-btn">
                            Sfoglia giochi
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    <div className="favorites-info">
                        <p>
                            <strong>{favoriteGames.length}</strong>
                            {favoriteGames.length === 1 ? ' gioco nei preferiti' : ' giochi nei preferiti'}
                        </p>
                    </div>

                    <div className="favorites-grid">
                        {favoriteGames.map((game) => (
                            <div key={game.id} className="favorite-item">
                                <RecordCard game={game} />
                                <div className="favorite-overlay">
                                    <button
                                        onClick={() => handleRemoveFromFavorites(game.id)}
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