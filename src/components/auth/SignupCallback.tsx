import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Loader from "../reuseable/loader";

export default function SignUpCallback() {
  const { user, isLoaded } = useUser(); 
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!isLoaded || !user) return; // wait for Clerk to load user

    const saveUser = async () => {
      try {
        const res = await fetch(`${API_URL}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: user.fullName,
            email: user.emailAddresses[0]?.emailAddress,
            clerkId: user.id,
          }),
        });

        if (!res.ok) {
          console.error("Failed to save user to backend");
        }
      } catch (error) {
        console.error("Error saving user:", error);
      } finally {
        // ensure navigation only happens if user exists
        navigate("/profile");
      }
    };

    saveUser();
  }, [isLoaded, user, navigate, API_URL]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  );
}
