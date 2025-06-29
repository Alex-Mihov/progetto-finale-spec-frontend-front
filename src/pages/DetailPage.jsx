import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import "../componentsCSS/DetailPageCSS.css";

export default function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchGameById, compareGames, addToCompare, toggleFavorite, isFavorite } = useGlobalContext();
    const [game, setGame] = useState({});

    // Carica i dati del gioco quando cambia l'ID
    useEffect(() => {
        async function loadGame() {
            const gameData = await fetchGameById(id);
            setGame(gameData.game);
        }
        loadGame();
    }, [id, fetchGameById]);

    // Gestisce l'aggiunta al confronto
    const handleAddToCompare = () => {
        const success = addToCompare(game);

        if (success) {
            // Se ora abbiamo 2 giochi, vai direttamente al confronto
            if (compareGames.length === 1) {
                navigate('/compare');
            }
        } else {
            alert('Puoi confrontare massimo 2 giochi alla volta!');
        }
    };

    // Gestisce l'aggiunta/rimozione dai preferiti
    const handleToggleFavorite = () => {
        toggleFavorite(game);
    };

    // Controlla se il gioco è già nel confronto
    const isGameInCompare = compareGames.some(g => g.id === game.id);
    const canAddToCompare = compareGames.length < 2 && !isGameInCompare;

    // Controlla se il gioco è nei preferiti
    const isGameFavorite = isFavorite(game.id);

    // Formatta la data di rilascio
    const formatReleaseDate = (date) => {
        return new Date(date).toLocaleDateString('it-IT');
    };

    // Determina il testo del pulsante di confronto
    const getCompareButtonText = () => {
        if (isGameInCompare) return 'Già nel confronto';
        if (compareGames.length === 2) return 'Confronto pieno';
        return 'Confronta';
    };

    return (
        <div className="detail-page-container">
            <div className="detail-content">

                {/* Sezione immagine */}
                <div className="game-image-section">
                    <img src={game.image} alt={game.title} className="game-detail-image" />
                    {/* Pulsante preferiti sull'immagine */}
                    <button
                        onClick={handleToggleFavorite}
                        className={`favorite-btn ${isGameFavorite ? 'favorite-active' : ''}`}
                        title={isGameFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
                    >
                        {isGameFavorite ? '❤️' : '🤍'}
                    </button>
                </div>

                {/* Sezione informazioni */}
                <div className="game-info-section">

                    {/* Header del gioco */}
                    <div className="game-header">
                        <h1 className="game-detail-title">{game.title}</h1>
                        <p className="game-detail-category">{game.category}</p>
                        <div className="game-rating">
                            <span className="rating-label">Valutazione:</span>
                            <span className="rating-value">⭐ {game.userRating}/10</span>
                        </div>
                    </div>

                    {/* Descrizione */}
                    <div className="game-description">
                        <h3>Descrizione</h3>
                        <p>{game.description}</p>
                    </div>

                    {/* Dettagli del gioco */}
                    <div className="game-details">
                        <div className="detail-item">
                            <span className="detail-label">Editore:</span>
                            <span className="detail-value">{game.publisher}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Data di rilascio:</span>
                            <span className="detail-value">{formatReleaseDate(game.releaseDate)}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Classificazione:</span>
                            <span className="detail-value">{game.ageRating}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Multiplayer:</span>
                            <span className="detail-value">{game.multiplayer ? 'Sì' : 'No'}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Disponibilità:</span>
                            <span className={`detail-value ${game.availability ? 'available' : 'unavailable'}`}>
                                {game.availability ? 'Disponibile' : 'Non disponibile'}
                            </span>
                        </div>
                    </div>

                    {/* Piattaforme */}
                    <div className="game-platforms">
                        <h3>Piattaforme</h3>
                        <div className="platforms-list">
                            {game.platforms?.map((platform, index) => (
                                <span key={index} className="platform-badge">
                                    {platform}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Lingue */}
                    <div className="game-languages">
                        <h3>Lingue supportate</h3>
                        <div className="languages-list">
                            {game.languages?.map((language, index) => (
                                <span key={index} className="language-badge">
                                    {language}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Sezione prezzo e azioni */}
                    <div className="game-price-section">

                        {/* Prezzo */}
                        <div className="price-display">
                            <span className="current-price">€{game.price}</span>
                        </div>

                        {/* Pulsanti azione */}
                        <div className="action-buttons">
                            <button
                                className="purchase-button"
                                disabled={!game.availability}
                            >
                                {game.availability ? 'Aggiungi al carrello' : 'Non disponibile'}
                            </button>

                            <button
                                className="compare-button"
                                onClick={handleAddToCompare}
                                disabled={!canAddToCompare}
                            >
                                {getCompareButtonText()}
                            </button>
                        </div>

                        {/* Info confronto */}
                        {compareGames.length > 0 && (
                            <div className="compare-info">
                                <p>Giochi nel confronto: {compareGames.length}/2</p>
                                {compareGames.length === 2 && (
                                    <button
                                        className="view-compare-button"
                                        onClick={() => navigate('/compare')}
                                    >
                                        Visualizza confronto
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
