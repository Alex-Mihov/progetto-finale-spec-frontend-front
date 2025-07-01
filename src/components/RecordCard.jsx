import { Link } from "react-router-dom";
import React from "react";

function RecordCard({ game }) {
    return (
        // Link cliccabile che porta alla pagina di dettaglio del gioco
        <Link to={`/game/${game.id}`} className="record-card-link">
            {/* Container principale della card */}
            <div className="record-card">

                {/* Container per l'immagine di copertina */}
                <div className="record-card-image-container">
                    <img
                        src={game.image}
                        alt={game.title}
                        className="record-card-image"
                    />
                </div>

                {/* Contenuto testuale della card */}
                <div className="record-card-content">
                    {/* Titolo del gioco */}
                    <h3 className="record-card-title">{game.title}</h3>
                    {/* Categoria del gioco */}
                    <p className="record-card-category">{game.category}</p>
                </div>
            </div>
        </Link>
    );
}

export default React.memo(RecordCard);
