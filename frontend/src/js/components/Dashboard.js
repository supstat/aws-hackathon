import m from "mithril";
import { state } from "../state.js";

export default {
  view: () =>
    m("div", [
      m("h1.text-2xl.font-bold.mb-4", "Production Dashboard"),
      m("div.grid.grid-cols-3.gap-4.mb-6", [
        m("div.bg-white.shadow.p-4", `Total Capacity: 200,000 units`),
        m("div.bg-white.shadow.p-4", `Avg Utilization: 67%`),
        m("div.bg-white.shadow.p-4", `Active Orders: ${state.orders.length}`)
      ]),
      m("h2.text-xl.font-semibold.mb-2", "Production Facilities"),
      m("div.grid.grid-cols-3.gap-4", state.plants.map(p =>
        m("div.bg-white.shadow.p-4", [
          m("h3.font-bold", p.name),
          m("p", `Utilization: ${p.utilization}%`),
          m("p", `Lead Time: ${p.leadTime}d`),
          m("p", `Cost/Unit: $${p.cost}`),
          m("p", `Quality: ${p.quality}/5`),
          m("p.text-sm.text-gray-500", `Specialties: ${p.specialties.join(", ")}`)
        ])
      ))
    ])
};