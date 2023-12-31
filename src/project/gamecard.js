// GameCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
    const formatGenres = (genres) => {
        return genres.join(', ');
    };
    
    return (
        <div className="game-card">
            <Link to={`/project/details/${game.id}`}>
                <img src={game.background_image || "path_to_default_image.png"} alt={game.name} />
            </Link>

            <div className="game-card-title">
                <h2>{game.name}</h2>
            </div>
            <div className="game-card-info">
                <p>Released: {game.released}</p>
                <p>Genres: {formatGenres(game.genres)}</p>
            </div>
        </div>
    );
};

export default GameCard;
