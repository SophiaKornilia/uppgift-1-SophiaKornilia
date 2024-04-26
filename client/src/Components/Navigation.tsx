import { NavLink } from "react-router-dom";
import "../index.css";

export const Navigation = () => {
 
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              <button>Home</button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin">
              <button>Admin</button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
