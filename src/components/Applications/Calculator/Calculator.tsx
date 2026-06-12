import { useState } from "react";

const buttons = [
  ["C", "+/-", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

export const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNext, setWaitingForNext] = useState(false);

  const handleNumber = (num: string) => {
    if (waitingForNext) {
      setDisplay(num);
      setWaitingForNext(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperator = (op: string) => {
    setPrevious(display);
    setOperator(op);
    setWaitingForNext(true);
  };

  const calculate = () => {
    if (!previous || !operator) return;
    const a = parseFloat(previous);
    const b = parseFloat(display);
    let result = 0;
    if (operator === "+") result = a + b;
    if (operator === "-") result = a - b;
    if (operator === "×") result = a * b;
    if (operator === "÷") result = b !== 0 ? a / b : 0;
    setDisplay(String(result));
    setPrevious(null);
    setOperator(null);
    setWaitingForNext(false);
  };

  const handleClick = (btn: string) => {
    if (btn === "C") { setDisplay("0"); setPrevious(null); setOperator(null); }
    else if (btn === "+/-") setDisplay(String(parseFloat(display) * -1));
    else if (btn === "%") setDisplay(String(parseFloat(display) / 100));
    else if (btn === "=") calculate();
    else if (["+", "-", "×", "÷"].includes(btn)) handleOperator(btn);
    else if (btn === ".") { if (!display.includes(".")) setDisplay(display + "."); }
    else handleNumber(btn);
  };

  const isOperator = (btn: string) => ["+", "-", "×", "÷"].includes(btn);

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-6 py-4">
      <div className="w-full max-w-[280px] bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-4 py-6 text-right">
          <p className="text-gray-400 text-sm h-5">
            {previous && operator ? `${previous} ${operator}` : ""}
          </p>
          <p className="text-white text-5xl font-light truncate">{display}</p>
        </div>
        <div className="grid grid-cols-4 gap-[1px] bg-gray-700">
          {buttons.map((row) =>
            row.map((btn) => (
              <button
                key={btn}
                onClick={() => handleClick(btn)}
                className={`
                  py-5 text-xl font-medium transition-opacity active:opacity-70
                  ${btn === "0" ? "col-span-2" : ""}
                  ${btn === "=" ? "bg-orange-500 text-white" : ""}
                  ${isOperator(btn) ? "bg-orange-400 text-white" : ""}
                  ${["C", "+/-", "%"].includes(btn) ? "bg-gray-400 text-black" : ""}
                  ${!isOperator(btn) && !["C", "+/-", "%", "="].includes(btn) ? "bg-gray-800 text-white" : ""}
                `}
              >
                {btn}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};