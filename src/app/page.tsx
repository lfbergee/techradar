"use client";

import { useEffect, useRef, useState } from "react";
import rough from "roughjs";
import backend from "./backend.json";
import frontend from "./frontend.json";
import infrastructure from "./infrastructure.json";

export default function Home() {
  const ref = useRef(null);
  const [techs, setTechs] = useState(getTech("all"));

  useEffect(() => {
    if (ref.current === null) return;
    const rc = rough.canvas(ref.current, { options: { roughness: 0.2 } });
    const canvas = ref.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `24px monospace`;
    ctx.fillStyle = "rgba(255,255,255,0.4)";

    rc.circle(600, 500, 300, {
      stroke: "rgba(9, 121, 105,0.4)",
    });
    ctx.fillText("Adopt", 550, 375);
    rc.circle(600, 500, 600, {
      stroke: "rgba(8, 143, 143, 0.4)",
    });
    ctx.fillText("Trial", 550, 225);
    rc.circle(600, 500, 800, {
      stroke: "rgba(255, 191, 0.4)",
    });
    ctx.fillText("Assess", 550, 125);
    rc.circle(600, 500, 1000, {
      stroke: "rgba(250,128,114,0.4)",
    });
    ctx.fillText("Hold", 550, 25);
    ctx.fillText("Avoid", 25, 25);

    ctx.font = "12px monospace";
    ctx.fillStyle = "rgb(255,255,255)";

    techs.forEach((tech) => {
      const x = getXY(tech.state, 600);
      const y = getXY(tech.state, 500);

      rc.circle(x, y, 20, {
        fill: getColor(tech.state),
        fillWeight: 3,
      });
      ctx.fillText(tech.name, x + 10, y + 10);
    });
  }, [techs]);

  return (
    <>
      <canvas ref={ref} height="1000" width="1200" className="m-auto" />
      <select
        className="m-4 text-white bg-gray-900 p-2"
        onChange={(e) => setTechs(getTech(e.target.value))}
      >
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="infrastructure">Infra</option>
        <option value="all">All</option>
      </select>
      <ul className="p-4">
        {techs.map((tech) => (
          <li key={tech.name} className="flex gap-2 pb-2 max-w-prose">
            <TrafficLight state={tech.state} />
            <div className="flex flex-col gap-2">
              <span className="font-bold">{tech.name}</span>
              <span>{tech.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function TrafficLight({ state }: { state: string }) {
  return (
    <div className="flex flex-col rounded bg-gray-800 h-fit w-fit p-2 gap-1">
      <div
        className={`rounded-full w-4 h-4 ${
          state === "hold"
            ? "bg-red-500 shadow-red-500 shadow-[0_0_2px_1px]"
            : "bg-red-500/30"
        }`}
      ></div>
      <div
        className={`rounded-full w-4 h-4 ${
          state === "assess" || state === "trial"
            ? "bg-yellow-500 shadow-yellow-500 shadow-[0_0_2px_1px]"
            : "bg-yellow-500/30"
        }`}
      ></div>
      <div
        className={`rounded-full w-4 h-4 ${
          state === "adopt"
            ? "bg-green-500 shadow-green-500 shadow-[0_0_2px_1px]"
            : "bg-green-500/30"
        }`}
      ></div>
    </div>
  );
}

function getColor(state: string) {
  switch (state) {
    case "adopt":
      return "rgba(9, 121, 105,0.4)";
    case "trial":
      return "rgba(8, 143, 143, 0.4)";
    case "assess":
      return "rgba(255, 191, 0.4)";
    case "hold":
      return "rgba(250,128,114,0.4)";
    case "avoid":
      return "rgba(255, 0, 0,0.4)";
    case "none":
      return "rgba(0, 0, 0,0.4)";
  }
}

function getXY(state: string, center: number): number {
  const positiveOrNegative = Math.random() > 0.5 ? 1 : -1;
  const random = Math.random() * 100;
  switch (state) {
    case "adopt":
      return center + random * positiveOrNegative;
    case "trial":
      return center + (random + 125) * positiveOrNegative;
    case "assess":
      return center + (random + 200) * positiveOrNegative;
    case "hold":
      return center + (random + 275) * positiveOrNegative;
    case "avoid":
      return center + (random + 350) * positiveOrNegative;
    default:
      return center;
  }
}

function getTech(selected: string) {
  switch (selected) {
    case "frontend":
      return frontend;
    case "backend":
      return backend;
    case "infrastructure":
      return infrastructure;
    case "all":
      return [...frontend, ...backend, ...infrastructure];
  }
  return frontend;
}
