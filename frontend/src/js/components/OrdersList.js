import m from "mithril";
import { state } from "../state.js";

export default {
  view: () =>
    m("div", [
      m("h1.text-2xl.font-bold.mb-4", "Production Orders"),
      m("div.grid.grid-cols-3.gap-4", state.orders.map(o =>
        m("div.bg-white.shadow.p-4", [
          m("h3.font-bold", o.id),
          m("p", `Customer: ${o.customer}`),
          m("p", `Product: ${o.product}`),
          m("p", `Qty: ${o.qty}`),
          m("p", `Deadline: ${o.deadline}`),
          m("p", `Priority: ${o.priority}`),
          m("p", `Status: ${o.status}`),
          m("button.bg-blue-600.text-white.px-4.py-2.mt-2", {
            onclick: () => m.route.set(`/orders/${o.id}`)
          }, "View Details")
        ])
      ))
    ])
};