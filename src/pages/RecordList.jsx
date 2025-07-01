import { useGlobalContext } from "../context/GlobalContext.jsx";
import RecordCard from "../components/RecordCard.jsx";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../componentsCSS/RecordListCSS.css";

export default function RecordList() {
    // Accesso alle funzioni e dati globali
    const { games, categories, handleSearchFilter, sortGames } = useGlobalContext();

    // Gestione dei parametri URL per filtri persistenti
    const [searchParams, setSearchParams] = useSearchParams();

    // Stati locali per i filtri
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [filteredGames, setFilteredGames] = useState([]);

    // Estrae la query di ricerca dall'URL
    const searchQuery = searchParams.get('search') || '';

    // Inizializza la categoria dai query parameters all'avvio
    useEffect(() => {
        const category = searchParams.get('category') || 'all';
        setSelectedCategory(category);
    }, [searchParams]);

    // Carica e filtra i giochi quando cambiano i parametri
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

    // Gestisce il cambio di categoria e aggiorna l'URL
    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);

        // Aggiorna i query parameters nell'URL
        const newParams = new URLSearchParams(searchParams);
        if (newCategory === 'all') {
            newParams.delete('category');
        } else {
            newParams.set('category', newCategory);
        }
        setSearchParams(newParams);
    };

    // Gestisce il cambio di ordinamento
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <div className="record-list-container">
            {/* Mostra la query di ricerca se presente nell'URL */}
            {searchQuery && (
                <div className="search-info">
                    <p>Risultati per: "<strong>{searchQuery}</strong>"</p>
                </div>
            )}

            {/* Sezione Filtri e Ordinamento */}
            <div className="filters-section">
                <div className="filters-container">
                    {/* Filtro per categoria */}
                    <div className="filter-group">
                        <label htmlFor="category-filter">Categoria:</label>
                        <select
                            id="category-filter"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="filter-select"
                        >
                            <option value="all">Tutte le categorie</option>
                            {/* Genera opzioni dalle categorie disponibili */}
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Filtro per ordinamento */}
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

                    {/* Contatore dei risultati */}
                    <div className="results-count">
                        <span>{filteredGames.length} giochi trovati</span>
                    </div>
                </div>
            </div>

            {/* Griglia dei giochi filtrati */}
            <div className="record-list-grid">
                {filteredGames.map(({ game }) => (
                    <RecordCard key={game.id} game={game} />
                ))}
            </div>

            {/* Messaggio quando non ci sono risultati */}
            {filteredGames.length === 0 && (
                <div className="no-results">
                    <h3>Nessun gioco trovato</h3>
                    <p>Prova a modificare i criteri di ricerca.</p>
                </div>
            )}
        </div>
    );
}
