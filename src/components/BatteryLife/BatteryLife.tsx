import { useState, useEffect } from "react";
import { Icon } from "@components/shared/Icon/Icon";

export const BatteryLife = () => {
  const [level, setLevel] = useState<number | null>(null);

  useEffect(() => {
    const nav = navigator as any;

    if (!nav.getBattery) return;

    nav.getBattery().then((battery: any) => {
      setLevel(Math.round(battery.level * 100));

      battery.addEventListener("levelchange", () => {
        setLevel(Math.round(battery.level * 100));
      });
    });
  }, []);

  return (
    <div className="flex items-center mr-4 gap-x-1">
      <span className="text-xs font-bold cursor-pointer">
        {level !== null ? `${level}%` : "--"}
      </span>
      <Icon icon="battery-life" className="w-[20px]" />
    </div>
  );
};