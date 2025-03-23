import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingIcons from "react-loading-icons";
import Cookies from "js-cookie";
import { FaHeart } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";
import "./Comics.css";

const Comics = ({ title, setTitle, favorites, setFavorites }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1); // Gère la page actuelle
  const [totalPages, setTotalPages] = useState(1); // Nombre total de pages

  const handleFavorites = async (comicId) => {
    // console.log("Ajout aux favoris :", comicId);

    try {
      const token = Cookies.get("token");
      if (!token) {
        alert("You must be connected to add favorites.");
        return;
      }
      const response = await axios.post(
        `https://site--marvel-back--fc7nwyvb2r4r.code.run/favorite/comics/${comicId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log("ici=>", response.data.favorites);
      // console.log("Réponse de l'API :", response.data);
      setFavorites(response.data.favorites);
      alert("Ajouté aux favoris !");
    } catch (error) {}
  };
  const deleteFavorites = async (comicId) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        alert("You must be connected to delete favorites.");
        return;
      }
      const response = await axios.delete(
        `https://site--marvel-back--fc7nwyvb2r4r.code.run/favorite/comics/${comicId}`,
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
        if (title) {
          filters += "&title=" + title;
        }
        const response = await axios.get(
          `https://site--marvel-back--fc7nwyvb2r4r.code.run/comics?page=${page}${filters}`
        );
        // console.log(response.data);
        setData(response.data.comics);
        setTotalPages(response.data.totalPages);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [page, title]);
  return isLoading ? (
    <div className="loading-icon">
      <LoadingIcons.Puff />
    </div>
  ) : (
    <>
      <div className="searchbar">
        <input
          type="text"
          id={title}
          value={title}
          placeholder="Search your character"
          onChange={(event) => {
            setTitle(event.target.value);
            setPage(1);
          }}
        />
      </div>
      <div className="comic-container">
        {data.map((comic, index) => {
          return (
            <Link
              to={`/comics/${comic.id}`}
              key={index}
              className="individual-comic"
            >
              <div className="title-buttons">
                <h2>{comic.title}</h2>
                <div className="buttons-div">
                  <button onClick={() => handleFavorites(comic.id)}>
                    <FaHeart />
                  </button>
                  <button onClick={() => deleteFavorites(comic.id)}>
                    <FaHeartBroken />
                  </button>
                </div>
              </div>

              <img src={comic.image} alt="photo du comic" />
              <p>{comic.description}</p>
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

export default Comics;
