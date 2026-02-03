// import { useEffect, useState } from "react";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
// import { toast } from "sonner";
// import Loader from "../reuseable/loader";

// export default function SSOCallback() {
//   const [timedOut, setTimedOut] = useState(false);

//   useEffect(() => {
 
//     const timer = setTimeout(() => {
//       setTimedOut(true);
//       toast.error("Login failed. Please try again.");
//     }, 10000); 

//     return () => clearTimeout(timer);
//   }, []);

//   if (timedOut) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-black text-white">
//         Login failed. Please go back and try again.
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex items-center justify-center bg-black">
//       <Loader />
//       <AuthenticateWithRedirectCallback />
//     </div>
//   );
// }




export default function SSOCallback() {
  return <AuthenticateWithRedirectCallback />;
}
