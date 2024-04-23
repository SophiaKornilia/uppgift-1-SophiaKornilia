import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";


export const Layout = () => {

  return (
    <>
 
        <div>
          <header>
            <Navigation /> 
          </header>
          <main>
            <Outlet />
          </main>
        </div>
    </>
  );
};
