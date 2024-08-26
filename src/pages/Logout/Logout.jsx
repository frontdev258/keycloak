import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    debugger;
    sessionStorage.clear();
    localStorage.clear();
    navigate("/login");
  }, []);

  return <></>;
};

export default Logout;
