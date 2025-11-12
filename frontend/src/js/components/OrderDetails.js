import m from "mithril";
import { state } from "../state.js";
import { api } from "../services/api.js";

export default {
  oninit: vnode => {
    const id = vnode.attrs.id;
    vnode.state.order = state.orders.find(o => o.id === id);
    vnode.state.strategy = null;
    api.generateStrategy(vnode.state.order).then(res => vnode.state.strategy = res);
  },
  view: vnode => {
    const o = vnode.state.order;
    return m("div", [
      m("h1.text-2xl.font-bold.mb-4", `Order Details: ${o.id}`),
      m("p", `Customer: ${o.customer}`),
      m("p", `Product: ${o.product}`),
      m("p", `Quantity: ${o.qty}`),
      m("p", `Deadline: ${o.deadline}`),
      m("hr.my-4"),
      vnode.state.strategy
        ? m("div.bg-white.shadow.p-4", [
            m("h2.font-bold.mb-2", "AI-Generated Strategy"),
            m("p", `Recommended Plant: ${vnode.state.strategy.recommendedPlant}`),
            m("h3.font-semibold.mt-2", "Cost Comparison"),
            m("ul", vnode.state.strategy.comparison.map(c =>
              m("li", `${c.plant}: $${c.cost}, Lead Time: ${c.leadTime}d`)
            ))
          ])
        : m("p", "Generating strategy...")
    ]);
  }
};