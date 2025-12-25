import { useEffect, useState } from "react";

const NetworkStatus = () => {
  const [online, setOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    window.addEventListener("online", () => setOnline(true));
    window.addEventListener("offline", () => setOnline(false));
  }, []);

  return online;
};

export default NetworkStatus