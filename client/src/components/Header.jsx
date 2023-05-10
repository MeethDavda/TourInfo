import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLogout } from "../redux/features/authSlice";

function Header() {
  const data = useSelector((state) => ({ ...state.auth }));
  const { user } = data;
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.clear();
    dispatch(setLogout());
  }
  return (
    <div className="mt-5 max-w-[1400px] ">
      <div className="flex flex-row justify-between p-4 bg-blue-200 w-[95%] mx-auto rounded-xl ">
        <div className="ml-[8%] font-medium text-3xl">TourInfo</div>
        <div className="mr-[8%]">
          <ul className="flex flex-row gap-5 mt-2 font-normal">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/addTour"}>Add Tour</Link>
            </li>
            <li>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            {user ? (
              <li onClick={handleLogout}>
                <Link to={"/login"}>Logout</Link>
              </li>
            ) : (
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
