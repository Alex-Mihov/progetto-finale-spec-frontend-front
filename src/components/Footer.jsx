import "../componentsCSS/FooterCSS.css";

export default function Footer() {
    return (
        <>
            <footer>
                <div className="footer-container">
                    <div className="footer-section">
                        <h3>Informazioni su GameGalaxy</h3>
                        <ul>
                            <li><a href="#">Di noi</a></li>
                            <li><a href="#">Contattaci</a></li>
                            <li><a href="#">Carriere</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Acquista</h3>
                        <ul>
                            <li><a href="#">Raccolte</a></li>
                            <li><a href="#">Programma fedeltà</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Aiuto</h3>
                        <ul>
                            <li><a href="#">Domande frequenti</a></li>
                            <li><a href="#">Come attivare un gioco</a></li>
                            <li><a href="#">Crea un ticket</a></li>
                            <li><a href="#">Politica di reso</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Comunità</h3>
                        <ul>
                            <li><a href="#">Notizie sui videogiochi</a></li>
                            <li><a href="#">Prezzi speciali</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Business</h3>
                        <ul>
                            <li><a href="#">Vendi su GameGalaxy</a></li>
                            <li><a href="#">Diventa affiliato</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}
