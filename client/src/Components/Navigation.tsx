import { NavLink } from "react-router-dom";


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
        </ul>
      </nav>
    </>
  );
};
