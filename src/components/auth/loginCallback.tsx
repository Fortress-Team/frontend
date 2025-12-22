import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Loader from "../reuseable/loader";

const LoginCallback = () => {
  const navigate = useNavigate();
  const { isLoaded, user } = useUser();

  console.log('User details:', user)

  useEffect(() => {
    if (!isLoaded) return;

    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  }, [isLoaded, user, navigate]);

  return <Loader />;
};

export default LoginCallback;
