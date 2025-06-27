import { Link } from "react-router-dom";

export default function RecordCard({ game }) {
    const hasDiscount = game.discountPrice && game.discountPrice < game.price;

    return (
        <Link to={`/game/${game.id}`} className="record-card-link">
            <div className="record-card">
                {hasDiscount && (
                    <div className="discount-badge">
                        -{Math.round(((game.price - game.discountPrice) / game.price) * 100)}%
                    </div>
                )}

                <div className="record-card-image-container">
                    <img
                        src={game.image}
                        alt={game.title}
                        className="record-card-image"
                    />
                </div>

                <div className="record-card-content">
                    <h3 className="record-card-title">{game.title}</h3>
                    <p className="record-card-category">{game.category}</p>
                </div>
            </div>
        </Link>
    );
}
