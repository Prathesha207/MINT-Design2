import { useState } from "react";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import BentoGrid from "./components/BentoGrid";
import ColorBento from "./components/ColorBento";
import { User } from "./types";

export default function App() {
  // Default logged-in user state, deriving information from the user's email metadata
  const [user, setUser] = useState<User>({
    username: "Prathesh",
    email: "prathesha13@gmail.com",
    initials: "P",
    isLoggedIn: true,
  });

  const handleToggleUser = () => {
    setUser((prev) => {
      if (prev.isLoggedIn) {
        return {
          username: "Guest",
          email: "guest@emagegroup.com",
          initials: "G",
          isLoggedIn: false,
        };
      } else {
        return {
          username: "Prathesh",
          email: "prathesha13@gmail.com",
          initials: "P",
          isLoggedIn: true,
        };
      }
    });
  };

  return (
    <Layout user={user} onToggleUser={handleToggleUser}>
      <Hero />
      <BentoGrid />
      {/* <ColorBento /> */}
    </Layout>
  );
}
