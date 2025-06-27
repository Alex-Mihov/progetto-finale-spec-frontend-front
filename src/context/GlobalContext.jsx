import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

// Provider component
export function GlobalContextProvider({ children }) {
    const [games, setGames] = useState([]);
    const [categories, setCategories] = useState([]);
    const api = "http://localhost:3001";

    useEffect(() => {
        async function fetchAllGames() {
            try {
                // Recupera tutti i giochi
                const response = await fetch(`${api}/games`);
                if (!response.ok) {
                    throw new Error("Errore rete");
                }
                const data = await response.json();

                // Fetch dettagli per ogni id di tutti i giochi
                const details = await Promise.all(
                    data.map(game =>
                        fetch(`${api}/games/${game.id}`)
                            .then(res => res.json())
                    )
                );

                setGames(details);

                // Estrai le categorie uniche
                const uniqueCategories = [...new Set(details.map(({ game }) => game.category))];
                setCategories(uniqueCategories);

            } catch (error) {
                console.error("Errore fetch giochi:", error);
            }
        }
        fetchAllGames();
    }, []);

    // Funzione per recuperare un singolo gioco per id
    async function fetchGameById(id) {
        try {
            const response = await fetch(`${api}/games/${id}`);
            if (!response.ok) {
                throw new Error("Errore rete");
            }
            const game = await response.json();
            console.log("Gioco singolo:", game);
            return game;
        } catch (error) {
            console.error("Errore fetch gioco singolo:", error);
            return null;
        }
    }

    // Funzione per la gestione della chiamata API per il filtro e ricerca
    const handleSearchFilter = async (searchQuery, optionValue) => {
        try {
            // Imposto l'URL di default
            let url = `${api}/games`;

            // Array per i parametri della query
            const params = [];

            // Aggiungo la ricerca se presente
            if (searchQuery && searchQuery.trim() !== '') {
                params.push(`search=${encodeURIComponent(searchQuery.trim())}`);
            }

            // Aggiungo la categoria se presente e diversa da 'all'
            if (optionValue && optionValue !== 'all') {
                params.push(`category=${encodeURIComponent(optionValue)}`);
            }

            // Se ci sono parametri, li aggiungo all'URL
            if (params.length > 0) {
                url += `?${params.join('&')}`;
            }

            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Errore durante il fetch dei dati: ' + res.statusText);
            }
            const data = await res.json();

            // Se la risposta è un array di giochi, fetch dettagli per ogni gioco
            if (Array.isArray(data)) {
                const details = await Promise.all(
                    data.map(game =>
                        fetch(`${api}/games/${game.id}`)
                            .then(res => res.json())
                    )
                );
                return details;
            }

            return data;

        } catch (err) {
            console.error(err);
            return [];
        }
    };

    // Funzione per filtrare i giochi localmente (solo per ordinamento)
    function sortGames(gamesToSort, sortBy = 'default') {
        let sortedGames = [...gamesToSort];

        switch (sortBy) {
            case 'alphabetical':
                sortedGames.sort((a, b) => a.game.title.localeCompare(b.game.title));
                break;
            case 'alphabetical-desc':
                sortedGames.sort((a, b) => b.game.title.localeCompare(a.game.title));
                break;
            default:
                break;
        }

        return sortedGames;
    }

    const value = {
        games,
        categories,
        fetchGameById,
        handleSearchFilter,
        sortGames
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
}

// Custom hook per usare il context
export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext deve essere usato all\'interno di GlobalContextProvider');
    }
    return context;
}

export default GlobalContext;