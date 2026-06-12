import { useThemeContext } from "@context/ThemeContext/ThemeContext";

export const Preferences = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="flex flex-col flex-1 max-h-full px-6 overflow-y-auto gap-4 py-4">
      <h1 className="w-full text-4xl font-bold text-left dark:text-white">
        Preferences
      </h1>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold dark:text-gray-200">Appearance</h2>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2 w-fit rounded-md bg-grey dark:bg-gray-600 dark:text-white hover:opacity-80 transition-opacity text-sm font-medium"
        >
          {theme === "light" ? "🌙 Switch to Dark Mode" : "☀️ Switch to Light Mode"}
        </button>
      </div>
    </div>
  );
};