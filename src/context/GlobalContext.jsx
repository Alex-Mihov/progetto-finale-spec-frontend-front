import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
const API_BASE_URL = "http://localhost:3001";

export function GlobalContextProvider({ children }) {
    // Stati principali
    const [games, setGames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [compareGames, setCompareGames] = useState([]);

    // Carica tutti i giochi all'avvio
    useEffect(() => {
        loadAllGames();
    }, []);

    // Funzione per caricare tutti i giochi con i loro dettagli
    async function loadAllGames() {
        try {
            const response = await fetch(`${API_BASE_URL}/games`);
            const gamesList = await response.json();

            // Carica i dettagli per ogni gioco
            const gamesWithDetails = await Promise.all(
                gamesList.map(game => fetchGameDetails(game.id))
            );

            setGames(gamesWithDetails);
            extractCategories(gamesWithDetails);

        } catch (error) {
            console.error("Errore nel caricamento dei giochi:", error);
        }
    }

    // Funzione helper per caricare i dettagli di un singolo gioco
    async function fetchGameDetails(id) {
        const response = await fetch(`${API_BASE_URL}/games/${id}`);
        return await response.json();
    }

    // Estrae le categorie uniche dai giochi
    function extractCategories(gamesList) {
        const uniqueCategories = [...new Set(
            gamesList.map(({ game }) => game.category)
        )];
        setCategories(uniqueCategories);
    }

    // Cerca e filtra i giochi
    async function searchAndFilterGames(searchText, categoryFilter) {
        try {
            // Costruisce l'URL direttamente qui
            let url = `${API_BASE_URL}/games`;
            const params = [];

            if (searchText?.trim()) {
                params.push(`search=${encodeURIComponent(searchText.trim())}`);
            }

            if (categoryFilter && categoryFilter !== 'all') {
                params.push(`category=${encodeURIComponent(categoryFilter)}`);
            }

            // Aggiunge i parametri all'URL se presenti
            if (params.length > 0) {
                url = `${url}?${params.join('&')}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            // Se la risposta è una lista, carica i dettagli
            if (Array.isArray(data)) {
                return await Promise.all(
                    data.map(game => fetchGameDetails(game.id))
                );
            }

            return data;

        } catch (error) {
            console.error("Errore nella ricerca:", error);
            return [];
        }
    }

    // Ordina i giochi alfabeticamente
    function sortGames(gamesList, sortOrder = 'default') {
        const sorted = [...gamesList];

        switch (sortOrder) {
            case 'alphabetical':
                return sorted.sort((a, b) =>
                    a.game.title.localeCompare(b.game.title)
                );
            case 'alphabetical-desc':
                return sorted.sort((a, b) =>
                    b.game.title.localeCompare(a.game.title)
                );
            default:
                return sorted;
        }
    }

    // Funzioni per il confronto dei giochi
    function addToCompare(game) {
        const isAlreadyAdded = compareGames.some(g => g.id === game.id);
        const canAdd = compareGames.length < 2 && !isAlreadyAdded;

        if (canAdd) {
            setCompareGames([...compareGames, game]);
            return true;
        }
        return false;
    }

    function removeFromCompare(gameId) {
        setCompareGames(compareGames.filter(game => game.id !== gameId));
    }

    function clearCompare() {
        setCompareGames([]);
    }

    // Valori esposti dal context
    const contextValue = {
        // Dati
        games,
        categories,
        compareGames,

        // Funzioni
        fetchGameById: fetchGameDetails,
        handleSearchFilter: searchAndFilterGames,
        sortGames,
        addToCompare,
        removeFromCompare,
        clearCompare
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
}

// Hook personalizzato per usare il context
export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext deve essere usato dentro GlobalContextProvider');
    }
    return context;
}

export default GlobalContext;