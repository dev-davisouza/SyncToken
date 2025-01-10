import { Links } from "@/context/Links";
import useAuthContext from "@/hooks/useAuthContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function PrivateRoute() {
  const { isAuth, access } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth == false) {
      navigate(Links.AUTH);
    }
  }, [access]);
  return <Outlet />;
}
