import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../componentsCSS/HeaderCSS.css";
import { Link } from "react-router-dom";

export default function Header() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/records?search=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            navigate('/records');
        }
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link to={"/"}>
                    <h1 className="logo">GameGalaxy</h1>
                </Link>

                <nav className="nav-links">
                    <Link to="/records" className="nav-link">
                        Giochi
                    </Link>
                </nav>

                <form className="search-container" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Cerca giochi..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <button type="submit" className="search-button">
                        Cerca
                    </button>
                </form>
            </div>
        </header>
    );
}
