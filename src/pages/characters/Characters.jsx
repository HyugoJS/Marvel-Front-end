import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingIcons from "react-loading-icons";
import Cookies from "js-cookie";
import { FaHeart } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";
import "./Characters.css";

const Characters = ({ name, setName, favorites, setFavorites }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1); // Gère la page actuelle
  const [totalPages, setTotalPages] = useState(1); // Nombre total de pages

  const handleFavorites = async (characterId) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        alert("You must be connected to add favorites.");
        return;
      }
      const response = await axios.post(
        `https://site--marvel-back--fc7nwyvb2r4r.code.run/favorite/character/${characterId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log("ici=>", response.data.favorites);
      setFavorites(response.data.favorites);
      alert("Ajouté aux favoris !");
    } catch (error) {}
  };
  const deleteFavorites = async (characterId) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        alert("You must be connected to delete favorites.");
        return;
      }
      const response = await axios.delete(
        `https://site--marvel-back--fc7nwyvb2r4r.code.run/favorite/character/${characterId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log("ici=>", response.data.favorites);
      setFavorites(response.data.favorites);
      alert("Supprimé des favoris !");
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filters = "";
        if (name) {
          filters += "&name=" + name;
        }
        const response = await axios.get(
          `https://site--marvel-back--fc7nwyvb2r4r.code.run/characters?page=${page}${filters}`
        );
        // console.log(response.data);
        setData(response.data.characters);
        setTotalPages(response.data.totalPages);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [page, name]);
  return isLoading ? (
    <div className="loading-icon">
      <LoadingIcons.Puff />
    </div>
  ) : (
    <>
      <div className="searchbar">
        <input
          type="text"
          id={name}
          value={name}
          placeholder="Search your character"
          onChange={(event) => {
            setName(event.target.value);
            setPage(1);
          }}
        />
      </div>
      <div className="char-container">
        {data.map((char, index) => {
          return (
            <Link
              to={`/characters/${char.id}`}
              key={index}
              className="individual-char"
            >
              <div className="title-buttons">
                <h2>{char.name}</h2>
                <div className="buttons-div">
                  <button onClick={() => handleFavorites(char.id)}>
                    <FaHeart />
                  </button>
                  <button onClick={() => deleteFavorites(char.id)}>
                    <FaHeartBroken />
                  </button>
                </div>
              </div>
              <img src={char.image} alt="photo du perso" />
              <p>{char.description}</p>
            </Link>
          );
        })}
      </div>
      {/* Boutons de Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ⬅️ Précédent
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Suivant ➡️
        </button>
      </div>
    </>
  );
};

export default Characters;
