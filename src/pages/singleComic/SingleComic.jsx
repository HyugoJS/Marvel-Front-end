import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingIcons from "react-loading-icons";
import "../singleChar/SingleChar.css";

const SingleComic = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/comics/" + params.id //remplacer le :id par l'id qu'on choppe en params
        );
        // console.log("ici=>" + response.data);
        setData(response.data);

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
      <h1>{data.title}</h1>
      <img src={data.image} alt="photo du perso" />
    </div>
  ) : (
    "pas encore chargé"
  );
};
export default SingleComic;
