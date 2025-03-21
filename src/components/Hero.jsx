import miles from "../assets/miles.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-div">
      <div className="hero-text">
        <h1>Swing into the Marvel Verse like Miles Morales !</h1>
        <p>
          Dive into the adventures of your favorites Marvel characters, find
          them in the characters section up top ! You will find all the comics
          linked to your character by clicking him. You will either find all the
          comics in the comics section. Explore the vast Marvel Universe, where
          heroes, villains, and cosmic beings collide in epic battles and
          legendary stories. From the streets of New York with Spider-Man to the
          far reaches of space with the Guardians of the Galaxy, each character
          has a rich history waiting to be discovered. Uncover their origins,
          powers, and greatest moments as you navigate through their stories and
          adventures!
        </p>
        <div className="header-links">
          <Link to={"/characters"}>Find a character</Link>
          <Link to={"/comics"}>Find a comic</Link>
        </div>
      </div>
      <img src={miles} alt="photo de miles morales tombant" />
    </div>
  );
};
export default Hero;
