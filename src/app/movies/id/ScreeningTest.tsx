"use client";

import { useEffect } from "react";

const LogScreenings = () => {
  useEffect(() => {
    const fetchScreenings = async () => {
      try {
        const res = await fetch("/api/screenings");
        const data = await res.json();
        console.log("Alla screenings:", data);
      } catch (err) {
        console.error("Fel vid hämtning:", err);
      }
    };

    fetchScreenings();
  }, []);

  return null;
};

export default LogScreenings;
