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
    ctx.font = "12px sans-serif ";
    ctx.fillStyle = "white";

    rc.circle(600, 500, 300, {
      stroke: "rgba(9, 121, 105,0.4)",
    });
    rc.circle(600, 500, 600, {
      stroke: "rgba(8, 143, 143, 0.4)",
    });
    rc.circle(600, 500, 800, {
      stroke: "rgba(255, 191, 0.4)",
    });
    rc.circle(600, 500, 1000, {
      stroke: "rgba(250,128,114,0.4)",
    });

    techs.forEach((tech) => {
      const x = 600 - tech.x;
      const y = 500 - tech.y;
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
          <li key={tech.name} className="flex flex-col pb-2 max-w-prose">
            <span>{tech.name}</span>
            <span>{tech.description}</span>
            <span>{tech.state}</span>
          </li>
        ))}
      </ul>
    </>
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
