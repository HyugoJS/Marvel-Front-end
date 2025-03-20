import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Comics.css";

const Comics = ({ title, setTitle }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1); // Gère la page actuelle
  const [totalPages, setTotalPages] = useState(1); // Nombre total de pages

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filters = "";
        if (title) {
          filters += "&title=" + title;
        }
        const response = await axios.get(
          `http://localhost:3000/comics?page=${page}${filters}`
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
    <p>En chargement</p>
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
            <>
              <Link
                to={`/comics/${comic.id}`}
                key={comic.id}
                className="individual-comic"
              >
                <h2>{comic.title}</h2>
                <img src={comic.image} alt="photo du comic" />
                <p>{comic.description}</p>
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

export default Comics;
