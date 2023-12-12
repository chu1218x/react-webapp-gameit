import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as client from './client';
import "../project/stylelist/creators.css";
import axios from 'axios';

function Creators() {
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        const fetchCreators = async () => {
            try {
                // fetch data from RAWG API
                const rawgData = await client.findAllCreators();

                // fetch data from our own API  
                const response = await axios.get('http://localhost:4000/api/creators');
                const ownCreators = response.data;

                // combine the two arrays
                const combinedCreators = [...rawgData, ...ownCreators];
                
                setCreators(combinedCreators);
            } catch (error) {
                console.error("Error fetching creators:", error);
            }
        };

        fetchCreators();
    }, []);


    return (
        <div className="creators-container">
            {creators.map(creator => (
                <div key={creator.id} className="creator-card">
                    <div className="creator-image-container">
                        <img src={creator.image} alt={creator.name} className="creator-image" />
                    </div>
                    <div className="creator-info">
                        <h2 className="creator-name">{creator.name}</h2>
                        <p className="creator-games-count">Games Count: {creator.games_count}</p>
                        <p className="creator-position">Position: {creator.positions.map(position => position.name).join(', ')}</p>
                        <p className="creator-games">
                            Games:{' '}
                            {creator.games.length > 0 ? (
                                creator.games.map(game => (
                                    <Link key={game.id} to={`/project/details/${game.id}`} className="game-link">
                                        {game.name}
                                    </Link>
                                )).reduce((prev, curr) => [prev, ', ', curr])
                            ) : (
                                <span>No games available</span>
                            )}
                        </p>

                    </div>
                </div>
            ))}
        </div>
    );

}


export default Creators;
