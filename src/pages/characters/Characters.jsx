import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Characters.css";

const Characters = ({ name, setName }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1); // Gère la page actuelle
  const [totalPages, setTotalPages] = useState(1); // Nombre total de pages

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filters = "";
        if (name) {
          filters += "&name=" + name;
        }
        const response = await axios.get(
          `http://localhost:3000/characters?page=${page}${filters}`
        );
        console.log(response.data);
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
    <p>En chargement</p>
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
            <>
              <Link
                to={`/characters/${char.id}`}
                key={char.id}
                className="individual-char"
              >
                <h2>{char.name}</h2>
                <img src={char.image} alt="photo du perso" />
                <p>{char.description}</p>
              </Link>
            </>
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
