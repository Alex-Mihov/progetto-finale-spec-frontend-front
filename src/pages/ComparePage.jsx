import { useGlobalContext } from "../context/GlobalContext.jsx";
import { Link } from "react-router-dom";
import "../componentsCSS/ComparePageCSS.css";

export default function ComparePage() {
    // Accesso alle funzioni e dati globali per il confronto
    const { compareGames, removeFromCompare, clearCompare } = useGlobalContext();

    // Funzione helper per formattare le date in formato italiano
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('it-IT');
    };

    return (
        <div className="compare-page-container">

            {/* Header con titolo e pulsanti di controllo */}
            <div className="compare-header">
                <h1>Confronto Giochi</h1>
                <div className="compare-actions">
                    {/* Pulsante per pulire tutto il confronto (visibile solo se ci sono giochi) */}
                    {compareGames.length > 0 && (
                        <button onClick={clearCompare} className="clear-compare-btn">
                            Pulisci confronto
                        </button>
                    )}
                    {/* Link per tornare alla pagina dei giochi */}
                    <Link to="/records" className="back-to-games-btn">
                        Torna ai giochi
                    </Link>
                </div>
            </div>

            <div className="compare-content">

                {/* Messaggio quando non ci sono giochi da confrontare */}
                {compareGames.length === 0 && (
                    <div className="no-games-to-compare">
                        <h2>Nessun gioco da confrontare</h2>
                        <p>Aggiungi dei giochi al confronto per visualizzarli qui.</p>
                        <Link to="/records" className="back-to-games">
                            Sfoglia giochi
                        </Link>
                    </div>
                )}

                {/* Griglia di confronto quando ci sono giochi */}
                {compareGames.length > 0 && (
                    <div className="compare-grid">

                        {/* Renderizza ogni gioco nel confronto */}
                        {compareGames.map((game) => {
                            return (
                                <div key={game.id} className="compare-card">

                                    {/* Header della card con pulsante rimozione */}
                                    <div className="compare-card-header">
                                        <button
                                            onClick={() => removeFromCompare(game.id)}
                                            className="remove-game-btn"
                                            title="Rimuovi dal confronto"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {/* Sezione immagine del gioco */}
                                    <div className="game-image-section">
                                        <img
                                            src={game.image}
                                            alt={game.title}
                                            className="compare-game-image"
                                        />
                                    </div>

                                    {/* Tutte le informazioni dettagliate del gioco */}
                                    <div className="compare-game-info">

                                        {/* Titolo e categoria */}
                                        <h2 className="compare-game-title">{game.title}</h2>
                                        <p className="compare-game-category">{game.category}</p>

                                        {/* Sezione valutazione degli utenti */}
                                        <div className="compare-section">
                                            <h3>Valutazione</h3>
                                            <div className="rating-display">⭐ {game.userRating}/10</div>
                                        </div>

                                        {/* Sezione prezzo */}
                                        <div className="compare-section">
                                            <h3>Prezzo</h3>
                                            <div className="price-display">
                                                <span className="current-price">€{game.price}</span>
                                            </div>
                                        </div>

                                        {/* Dettagli tecnici e informazioni generali */}
                                        <div className="compare-section">
                                            <h3>Dettagli</h3>
                                            <div className="details-list">
                                                <div className="detail-row">
                                                    <span className="detail-label">Editore:</span>
                                                    <span className="detail-value">{game.publisher}</span>
                                                </div>
                                                <div className="detail-row">
                                                    <span className="detail-label">Data rilascio:</span>
                                                    <span className="detail-value">{formatDate(game.releaseDate)}</span>
                                                </div>
                                                <div className="detail-row">
                                                    <span className="detail-label">Classificazione:</span>
                                                    <span className="detail-value">{game.ageRating}</span>
                                                </div>
                                                <div className="detail-row">
                                                    <span className="detail-label">Multiplayer:</span>
                                                    <span className="detail-value">{game.multiplayer ? 'Sì' : 'No'}</span>
                                                </div>
                                                <div className="detail-row">
                                                    <span className="detail-label">Disponibilità:</span>
                                                    <span className={`detail-value ${game.availability ? 'available' : 'unavailable'}`}>
                                                        {game.availability ? 'Disponibile' : 'Non disponibile'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Piattaforme supportate */}
                                        <div className="compare-section">
                                            <h3>Piattaforme</h3>
                                            <div className="platforms-grid">
                                                {game.platforms?.map((platform, idx) => (
                                                    <span key={idx} className="platform-tag">
                                                        {platform}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Lingue supportate dal gioco */}
                                        <div className="compare-section">
                                            <h3>Lingue</h3>
                                            <div className="languages-grid">
                                                {game.languages?.map((language, idx) => (
                                                    <span key={idx} className="language-tag">
                                                        {language}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Descrizione completa del gioco */}
                                        <div className="compare-section">
                                            <h3>Descrizione</h3>
                                            <p className="game-description">{game.description}</p>
                                        </div>

                                        {/* Pulsanti di azione per ogni gioco */}
                                        <div className="compare-actions-section">
                                            {/* Link per vedere i dettagli completi */}
                                            <Link to={`/game/${game.id}`} className="view-details-btn">
                                                Vedi dettagli
                                            </Link>
                                            {/* Pulsante carrello (disabilitato se non disponibile) */}
                                            <button
                                                className="add-to-cart-btn"
                                                disabled={!game.availability}
                                            >
                                                {game.availability ? 'Aggiungi al carrello' : 'Non disponibile'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Placeholder quando c'è solo un gioco nel confronto */}
                        {compareGames.length === 1 && (
                            <div className="compare-card placeholder">
                                <div className="placeholder-content">
                                    <div className="placeholder-icon">+</div>
                                    <h3>Aggiungi un secondo gioco</h3>
                                    <p>
                                        Vai alla pagina dei giochi e clicca "Confronta" su un altro gioco
                                        per confrontarlo con "{compareGames[0].title}"
                                    </p>
                                    <Link to="/records" className="add-game-btn">
                                        Sfoglia giochi
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}