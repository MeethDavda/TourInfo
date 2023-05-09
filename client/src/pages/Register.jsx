import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/features/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  password: "",
  email: "",
  fname: "",
  lname: "",
};
function Register() {
  const [form, setForm] = useState(initialState);
  const { email, password, fname, lname } = form;
  const data = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data.error) {
      toast.error(data.error);
    }
  }, [data.error]);

  function handleClick(e) {
    e.preventDefault();
    console.log(form);
    dispatch(register({ form, navigate, toast }));
  }
  return (
    <div className="mt-[50%] md:mt-[20%] ">
      <div className="flex flex-col border-2 border-x drop-shadow-md p-4 sm:w-40 md:w-[30em] justify-center items-center">
        <div className="flex flex-col justify-center items-center mt-5 gap-2">
          <PersonIcon className="scale-150" />
          <span>Register</span>
        </div>

        <div className="flex flex-row gap-1 w-[95%] justify-between">
          <input
            type="text"
            required={true}
            value={fname}
            onChange={(e) => setForm({ ...form, fname: e.target.value })}
            placeholder="First name"
            className="border-2 p-2 mt-8 rounded-lg drop-shadow-sm "
          />

          <input
            type="text"
            required={true}
            value={lname}
            onChange={(e) => setForm({ ...form, lname: e.target.value })}
            placeholder="Last name"
            className="border-2 p-2 mt-8 rounded-lg drop-shadow-sm "
          />
        </div>

        <input
          type="text"
          required={true}
          value={email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="border-2 p-2 mt-8 rounded-lg drop-shadow-sm w-[95%]"
        />

        <input
          type="text"
          required={true}
          value={password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          className="border-2 p-2 mt-8 rounded-lg drop-shadow-sm w-[95%]"
        />
        <div className="flex justify-center content-center mt-8 w-[95%]">
          <button
            className="bg-blue-500 p-2 rounded-md drop-shadow-md w-full text-white"
            onClick={handleClick}
          >
            REGISTER
          </button>
        </div>

        <Link to={"/login"}>
          <button className="mt-8 rounded-md drop-shadow-md p-3 text-blue-600 ">
            Already have an account? Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Register;
