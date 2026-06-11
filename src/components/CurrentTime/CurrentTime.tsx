import { useState, useEffect } from "react";

const formatTime = (date: Date): string => {
  const month = date.getMonth() + 1;   // getMonth() fillon nga 0
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${month}/${day}/${year} - ${hours}:${minutes}:${seconds}`;
};

export const CurrentTime = () => {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(interval);  // cleanup kur komponenti shkatërrohet
  }, []);

  return <span className="text-xs font-bold cursor-pointer">{time}</span>;
};