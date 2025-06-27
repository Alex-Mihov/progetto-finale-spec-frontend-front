import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import "../componentsCSS/DetailPageCSS.css";

export default function DetailPage() {
    const { id } = useParams();
    const { fetchGameById } = useGlobalContext();
    const [game, setGame] = useState({});

    useEffect(() => {
        async function loadGame() {
            const gameData = await fetchGameById(id);

            setGame(gameData.game);
        }
        loadGame();
    }, [id, fetchGameById]);

    if (!game || Object.keys(game).length === 0) {
        return (
            <div className="detail-page-container">
                <div className="game-not-found">
                    <h2>Gioco non trovato</h2>
                    <p>Il gioco che stai cercando non è disponibile.</p>
                </div>
            </div>
        );
    }

    const hasDiscount = game.discountPrice && game.discountPrice < game.price;
    const discountPercentage = hasDiscount ? Math.round(((game.price - game.discountPrice) / game.price) * 100) : 0;

    return (
        <div className="detail-page-container">
            <div className="detail-content">
                <div className="game-image-section">
                    <img src={game.image} alt={game.title} className="game-detail-image" />
                    {hasDiscount && (
                        <div className="detail-discount-badge">
                            -{discountPercentage}%
                        </div>
                    )}
                </div>

                <div className="game-info-section">
                    <h1 className="game-detail-title">{game.title}</h1>
                    <p className="game-detail-category">{game.category}</p>

                    <div className="game-rating">
                        <span className="rating-label">Valutazione:</span>
                        <span className="rating-value">⭐ {game.userRating}/10</span>
                    </div>

                    <div className="game-description">
                        <h3>Descrizione</h3>
                        <p>{game.description}</p>
                    </div>

                    <div className="game-details">
                        <div className="detail-item">
                            <span className="detail-label">Editore:</span>
                            <span className="detail-value">{game.publisher}</span>
                        </div>

                        <div className="detail-item">
                            <span className="detail-label">Data di rilascio:</span>
                            <span className="detail-value">{new Date(game.releaseDate).toLocaleDateString('it-IT')}</span>
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

                    <div className="game-price-section">
                        {hasDiscount ? (
                            <div className="price-with-discount">
                                <span className="original-price">€{game.price}</span>
                                <span className="discounted-price">€{game.discountPrice}</span>
                            </div>
                        ) : (
                            <span className="current-price">€{game.price}</span>
                        )}
                        <button className="purchase-button" disabled={!game.availability}>
                            {game.availability ? 'Aggiungi al carrello' : 'Non disponibile'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
