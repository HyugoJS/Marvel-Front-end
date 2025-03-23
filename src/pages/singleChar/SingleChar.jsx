import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingIcons from "react-loading-icons";
import "./SingleChar.css";

const SingleChar = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [linkedComics, setLinkedComics] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/characters/" + params.id //remplacer le :id par l'id qu'on choppe en params
        );
        // console.log("ici=>" + response.data);
        setData(response.data);
        const response2 = await axios.get(
          "http://localhost:3000/character/" + params.id
        );
        // console.log("ici=>", response2.data);
        setLinkedComics(response2.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [params.id]);
  return isLoading ? (
    <div className="loading-icon">
      <LoadingIcons.Puff />
    </div>
  ) : data ? (
    <div className="char-presentation">
      <h1>{data.name}</h1>
      <img src={data.image} alt="photo du perso" />
      <h2>Comics linked with {data.name} :</h2>
      <div className="carrousel-comics">
        {linkedComics.comics.map((comic, index) => {
          return (
            <div key={index} className="test">
              <h3>{comic.title}</h3>
              <img
                src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                alt="photo du comic"
              />
              <p>{comic.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    "pas encore chargé"
  );
};
export default SingleChar;
