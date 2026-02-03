import { useEffect, useState } from "react";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import Loader from "../reuseable/loader";
import { Link } from "react-router-dom";

export default function SSOCallback() {
  const [timedOut, setTimedOut] = useState(false);
  

  useEffect(() => {
 
    const timer = setTimeout(() => {
      setTimedOut(true);

    }, 12000); 

    return () => clearTimeout(timer);
  }, []);

  if (timedOut) {
    return (
      <div className="h-screen flex  flex-col gap-2 items-center justify-center text-black bg-white">
        Login failed. Please go back and try again.

        <Link to={'/login'}
            className="px-7d py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm
          cursor-pointer font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 flex
           items-center gap-2">
        Back
        </Link>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <Loader />
      <AuthenticateWithRedirectCallback />
    </div>
  );
}




// export default function SSOCallback() {
//   return <AuthenticateWithRedirectCallback />;
// }
