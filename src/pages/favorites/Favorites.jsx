import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingIcons from "react-loading-icons";
import Cookies from "js-cookie";

const Favorites = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/favorites`);

        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <div className="loading-icon">
      <LoadingIcons.Puff />
    </div>
  ) : (
    <>
      <div>
        <p>Favoris</p>
      </div>
    </>
  );
};
export default Favorites;
