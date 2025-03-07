import React from "react";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import router from "./Routing/router";
import { setCredentials } from "./store/authSlice";
import { useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "./store/apiSlice";

const InitAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setCredentials({ token, user: null }));
    }
  }, []);

  const token = useSelector((state) => state.auth.token);
  const { data } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (data && data.user) {
      dispatch(setCredentials({ token, user: data.user }));
    }
  }, [data]);

  return null;
};

function App() {
  return (
    <>
      <InitAuth />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
