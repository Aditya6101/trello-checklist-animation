import { stagger, useAnimate } from "framer-motion";
import { useState } from "react";

function App() {
  let [items, setItems] = useState([
    { id: "1", text: "One", checked: true },
    { id: "2", text: "Two", checked: true },
    { id: "3", text: "Three", checked: true },
    { id: "4", text: "Four", checked: false },
    { id: "5", text: "Five", checked: true },
    { id: "6", text: "Six", checked: true },
    { id: "7", text: "Seven", checked: true },
  ]);

  const [ref, animate] = useAnimate();

  function handleChange(id: string) {
    const newItems = items.map((item) => ({
      ...item,
      checked: item.id === id ? !item.checked : item.checked,
    }));
    const lastCompletedItem = items.findIndex((item) => !item.checked);
    const random = Math.random();

    setItems(newItems);

    if (newItems.every((item) => item.checked)) {
      if (random < 1 / 4) {
        animate(
          "input",
          { scale: [1, 1.2, 1] },
          {
            duration: 0.35,
            delay: stagger(0.075, { from: lastCompletedItem }),
          }
        );
      } else if (random < 1 / 2) {
        animate(
          "input",
          { rotate: [0, 10, -10, 0] },
          {
            duration: 0.35,
            delay: stagger(0.075, { from: lastCompletedItem }),
          }
        );
      } else if (random < 3 / 4) {
        animate(
          "input",
          { x: [0, 2, -2, 0] },
          {
            duration: 0.35,
            delay: stagger(0.075, { from: lastCompletedItem }),
          }
        );
      } else {
        animate(
          "input",
          { y: [0, 2, -2, 0] },
          {
            duration: 0.35,
            delay: stagger(0.075, { from: lastCompletedItem }),
          }
        );
      }
    }
  }

  return (
    <div className="grid place-content-center h-screen bg-slate-900 w-screen">
      <div ref={ref} className="bg-white w-96 p-2 rounded-sm w-">
        {items.map((item) => (
          <label
            key={item.id}
            className={`group flex w-full cursor-pointer select-none items-center rounded p-2 text-sm font-medium transition-colors duration-300 checked:text-gray-300 hover:bg-gray-200 ${
              item.checked ? "text-gray-400 line-through" : "text-gray-800"
            }`}
          >
            <input
              onChange={() => handleChange(item.id)}
              checked={item.checked}
              type="checkbox"
              className="mr-4 h-4 w-4 rounded-sm border-2 border-gray-300 text-sky-600 transition-colors duration-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-sky-600/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 group-active:border-sky-600 group-active:checked:text-sky-600/25"
            />
            {item.text}
          </label>
        ))}
      </div>
    </div>
  );
}

export default App;
