import { useNavigate } from "react-router-dom";

export default function Navbar({ isAside }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div onClick={isAside} className="navbarOpenOption">
        <img src="./assets/icons/optionIcon.png" alt="" />
      </div>

      <div className="navLogo">
        <img src="./assets/logo/logo.png" alt="" />
      </div>

      <div className="navSearch" onClick={() => navigate("/search")}>
        <img src="./assets/icons/searchIcon.png" alt="" />
      </div>
    </nav>
  );
}