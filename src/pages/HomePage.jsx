import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext.jsx";
import "../componentsCSS/HomePageCSS.css";

export default function HomePage() {
    const { games } = useGlobalContext();

    // Mostra solo i primi 6 giochi in evidenza
    const featuredGames = games.slice(0, 6);

    return (
        <div className="homepage-container">

            {/* Sezione Hero - Messaggio di benvenuto */}
            <div className="hero-section">
                <p className="hero-tagline">
                    Scopri i migliori giochi per PS5, Xbox, Switch e PC.
                    Offerte esclusive e novità imperdibili: tutto il gaming che cerchi, in un solo posto.
                </p>
            </div>

            {/* Griglia dei giochi in evidenza */}
            <div className="game-grid">
                {featuredGames.map(({ game }) => (
                    <Link key={game.id} to={`/game/${game.id}`} className="game-link">
                        <div className="game-card">
                            <div className="game-cover-container">
                                <img
                                    className="game-cover"
                                    src={game.image}
                                    alt={game.title}
                                />
                            </div>
                            <div className="game-info-overlay">
                                <h3 className="game-title">{game.title}</h3>
                                <p className="game-category">{game.category}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pulsante per vedere tutti i giochi */}
            <div className="discover-more-section">
                <Link to="/records" className="discover-more-btn">
                    Scopri di più
                </Link>
            </div>
        </div>
    );
}
