import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@components/shared/Spinner/Spinner";

interface WeatherData {
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: { description: string; icon: string }[];
  wind: { speed: number };
}

const fetchWeather = async (city: string): Promise<WeatherData> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
  );
  if (!res.ok) throw new Error("Qyteti nuk u gjet!");
  return res.json();
};

export const Weather = () => {
  const [city, setCity] = useState("Prishtine");
  const [search, setSearch] = useState("Prishtine");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weather", search],
    queryFn: () => fetchWeather(search),
  });

  return (
    <div className="flex flex-col flex-1 max-h-full px-6 overflow-y-auto gap-4 py-4">
      <h1 className="w-full text-4xl font-bold text-left dark:text-white">Weather</h1>

      <div className="flex gap-2">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setSearch(city)}
          placeholder="Kërko qytetin..."
          className="flex-1 px-4 py-2 rounded-md border border-grey dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none"
        />
        <button
          onClick={() => setSearch(city)}
          className="px-4 py-2 bg-primary rounded-md font-medium hover:opacity-80 transition-opacity"
        >
          Kërko
        </button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center flex-1">
          <Spinner />
        </div>
      )}

      {isError && (
        <div className="flex justify-center items-center flex-1">
          <p className="text-red-500">{(error as Error).message}</p>
        </div>
      )}

      {data && !isLoading && (
        <div className="flex flex-col items-center gap-3 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
          <h2 className="text-2xl font-bold dark:text-white">
            {data.name}, {data.sys.country}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
          />
          <p className="text-6xl font-light dark:text-white">
            {Math.round(data.main.temp)}°C
          </p>
          <p className="text-gray-500 dark:text-gray-300 capitalize">
            {data.weather[0].description}
          </p>
          <div className="flex gap-6 mt-2 text-sm text-gray-600 dark:text-gray-300">
            <span>💧 {data.main.humidity}%</span>
            <span>🌡️ Ndihet {Math.round(data.main.feels_like)}°C</span>
            <span>💨 {data.wind.speed} m/s</span>
          </div>
        </div>
      )}
    </div>
  );
};