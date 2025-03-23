import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FavoritesList = ({ token, favorites, setFavorites }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const fetchFavorites = async () => {
        try {
          const response = await axios.get(
            "https://site--marvel-back--fc7nwyvb2r4r.code.run/favorites",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          // console.log("ixi=>", response.data);

          setFavorites(response.data.favorites);
          setIsLoading(false);
        } catch (error) {
          console.error("Erreur lors de la récupération des favoris", error);
        }
      };

      fetchFavorites();
    }
  }, [token]);

  if (isLoading) {
    return <p>Chargement des favoris...</p>;
  }

  return (
    <div className="favorites-container">
      <h1>Vos Favoris ⭐</h1>
      {favorites.length === 0 ? (
        <p>Aucun favori pour le moment.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((char) => (
            <Link
              to={`/characters/${char.id}`}
              key={char.id}
              className="individual-char"
            >
              <h2>{char.name}</h2>
              <img src={char.image} alt={char.name} />
              <p>{char.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
