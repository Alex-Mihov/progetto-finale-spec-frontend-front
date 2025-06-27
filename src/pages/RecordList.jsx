import { useGlobalContext } from "../context/GlobalContext.jsx";
import RecordCard from "../components/RecordCard.jsx";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import "../componentsCSS/RecordListCSS.css";

export default function RecordList() {
    const { games, categories, handleSearchFilter, sortGames } = useGlobalContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [filteredGames, setFilteredGames] = useState([]);

    // Prendi la query di ricerca dall'URL
    const searchQuery = searchParams.get('search') || '';

    // Inizializza la categoria dai query parameters
    useEffect(() => {
        const category = searchParams.get('category') || 'all';
        setSelectedCategory(category);
    }, [searchParams]);

    useEffect(() => {
        async function loadGames() {
            try {
                if (searchQuery || selectedCategory !== 'all') {
                    // Usa la chiamata API per ricerca e/o filtro categoria
                    const apiResults = await handleSearchFilter(searchQuery, selectedCategory);

                    // Applica l'ordinamento locale ai risultati dell'API
                    const sortedResults = sortGames(apiResults, sortBy);
                    setFilteredGames(sortedResults);
                } else {
                    // Se non c'è ricerca o categoria, mostra tutti i giochi con ordinamento
                    const sortedGames = sortGames(games, sortBy);
                    setFilteredGames(sortedGames);
                }
            } catch (error) {
                console.error("Errore durante il caricamento dei giochi:", error);
                setFilteredGames([]);
            }
        }

        loadGames();
    }, [games, searchQuery, selectedCategory, sortBy, handleSearchFilter, sortGames]);

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);

        // Aggiorna i query parameters
        const newParams = new URLSearchParams(searchParams);
        if (newCategory === 'all') {
            newParams.delete('category');
        } else {
            newParams.set('category', newCategory);
        }
        setSearchParams(newParams);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <div className="record-list-container">
            {/* Mostra la query di ricerca se presente */}
            {searchQuery && (
                <div className="search-info">
                    <p>Risultati per: "<strong>{searchQuery}</strong>"</p>
                </div>
            )}

            {/* Sezione Filtri */}
            <div className="filters-section">
                <div className="filters-container">
                    <div className="filter-group">
                        <label htmlFor="category-filter">Categoria:</label>
                        <select
                            id="category-filter"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="filter-select"
                        >
                            <option value="all">Tutte le categorie</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="sort-filter">Ordinamento:</label>
                        <select
                            id="sort-filter"
                            value={sortBy}
                            onChange={handleSortChange}
                            className="filter-select"
                        >
                            <option value="default">Ordine predefinito</option>
                            <option value="alphabetical">A-Z</option>
                            <option value="alphabetical-desc">Z-A</option>
                        </select>
                    </div>

                    <div className="results-count">
                        <span>{filteredGames.length} giochi trovati</span>
                    </div>
                </div>
            </div>

            <div className="record-list-grid">
                {filteredGames.map(({ game }) => (
                    <RecordCard key={game.id} game={game} />
                ))}
            </div>

            {filteredGames.length === 0 && (
                <div className="no-results">
                    <h3>Nessun gioco trovato</h3>
                    <p>Prova a modificare i criteri di ricerca.</p>
                </div>
            )}
        </div>
    );
}
