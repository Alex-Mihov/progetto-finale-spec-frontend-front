import { createContext, useContext, useEffect, useState } from "react";

// Creazione del Context e URL base dell'API
const GlobalContext = createContext();
const API_BASE_URL = "http://localhost:3001";

export function GlobalContextProvider({ children }) {
    // Stati principali dell'applicazione
    const [games, setGames] = useState([]); // Lista completa dei giochi
    const [categories, setCategories] = useState([]); // Categorie uniche estratte dai giochi
    const [compareGames, setCompareGames] = useState([]); // Giochi nel confronto (max 2)
    const [favoriteGames, setFavoriteGames] = useState([]); // Giochi preferiti salvati

    // Carica tutti i giochi all'avvio del componente
    useEffect(() => {
        loadAllGames();
        loadFavorites();
    }, []);

    // Funzione per caricare tutti i giochi con i loro dettagli completi
    async function loadAllGames() {
        try {
            // Ottiene la lista base dei giochi
            const response = await fetch(`${API_BASE_URL}/games`);
            const gamesList = await response.json();

            // Carica i dettagli completi per ogni gioco
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

    // Estrae le categorie uniche dai giochi per i filtri
    function extractCategories(gamesList) {
        const uniqueCategories = [...new Set(
            gamesList.map(({ game }) => game.category)
        )];
        setCategories(uniqueCategories);
    }

    // Cerca e filtra i giochi in base a testo e categoria
    async function searchAndFilterGames(searchText, categoryFilter) {
        try {
            // Costruisce l'URL con i parametri di ricerca
            let url = `${API_BASE_URL}/games`;
            const params = [];

            // Aggiunge il parametro di ricerca se presente
            if (searchText?.trim()) {
                params.push(`search=${encodeURIComponent(searchText.trim())}`);
            }

            // Aggiunge il filtro categoria se selezionato
            if (categoryFilter && categoryFilter !== 'all') {
                params.push(`category=${encodeURIComponent(categoryFilter)}`);
            }

            // Completa l'URL con i parametri
            if (params.length > 0) {
                url = `${url}?${params.join('&')}`;
            }

            const response = await fetch(url);
            const data = await response.json();

            // Se la risposta è una lista, carica i dettagli completi
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

    // Ordina i giochi alfabeticamente in base all'opzione selezionata
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

    // FUNZIONI PER IL CONFRONTO GIOCHI

    // Aggiunge un gioco al confronto (max 2)
    function addToCompare(game) {
        const isAlreadyAdded = compareGames.some(g => g.id === game.id);
        const canAdd = compareGames.length < 2 && !isAlreadyAdded;

        if (canAdd) {
            setCompareGames([...compareGames, game]);
            return true; // Successo
        }
        return false; // Già presente o limite raggiunto
    }

    // Rimuove un gioco specifico dal confronto
    function removeFromCompare(gameId) {
        setCompareGames(compareGames.filter(game => game.id !== gameId));
    }

    // Svuota completamente la lista di confronto
    function clearCompare() {
        setCompareGames([]);
    }

    // FUNZIONI PER LA PERSISTENZA DEI PREFERITI

    // Carica i preferiti dal localStorage all'avvio
    function loadFavorites() {
        try {
            const savedFavorites = localStorage.getItem('gamegalaxy-favorites');
            if (savedFavorites) {
                setFavoriteGames(JSON.parse(savedFavorites));
            }
        } catch (error) {
            console.error("Errore nel caricamento dei preferiti:", error);
        }
    }

    // Salva i preferiti nel localStorage
    function saveFavorites(favorites) {
        try {
            localStorage.setItem('gamegalaxy-favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error("Errore nel salvataggio dei preferiti:", error);
        }
    }

    // FUNZIONI PER LA GESTIONE DEI PREFERITI

    // Aggiunge un gioco ai preferiti
    function addToFavorites(game) {
        const isAlreadyFavorite = favoriteGames.some(g => g.id === game.id);

        if (!isAlreadyFavorite) {
            const newFavorites = [...favoriteGames, game];
            setFavoriteGames(newFavorites);
            saveFavorites(newFavorites); // Salva nel localStorage
            return true; // Successo
        }
        return false; // Già nei preferiti
    }

    // Rimuove un gioco dai preferiti
    function removeFromFavorites(gameId) {
        const newFavorites = favoriteGames.filter(game => game.id !== gameId);
        setFavoriteGames(newFavorites);
        saveFavorites(newFavorites); // Salva nel localStorage
    }

    // Alterna lo stato di preferito di un gioco
    function toggleFavorite(game) {
        const isAlreadyFavorite = favoriteGames.some(g => g.id === game.id);

        if (isAlreadyFavorite) {
            removeFromFavorites(game.id);
            return false; // Rimosso dai preferiti
        } else {
            addToFavorites(game);
            return true; // Aggiunto ai preferiti
        }
    }

    // Controlla se un gioco è nei preferiti
    function isFavorite(gameId) {
        return favoriteGames.some(game => game.id === gameId);
    }

    // Valori e funzioni esposti dal context a tutti i componenti
    const contextValue = {
        // Dati di stato
        games,
        categories,
        compareGames,
        favoriteGames,

        // Funzioni per i giochi
        fetchGameById: fetchGameDetails,
        handleSearchFilter: searchAndFilterGames,
        sortGames,

        // Funzioni per il confronto
        addToCompare,
        removeFromCompare,
        clearCompare,

        // Funzioni per i preferiti
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
}

// Hook personalizzato per usare il context facilmente
export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext deve essere usato dentro GlobalContextProvider');
    }
    return context;
}

export default GlobalContext;