import FavoritesList from "./FavoritesList";
import "./Favorites.css";

const Favorites = ({ userToken, favorites, setFavorites }) => {
  return (
    <div>
      <FavoritesList
        token={userToken}
        favorites={favorites}
        setFavorites={setFavorites}
      />
    </div>
  );
};

export default Favorites;
