import m from "mithril";
import { state } from "../state.js";

export default {
  view: () => {
    let order = { customer: "", product: "", qty: "", deadline: "", priority: "medium", location: "", notes: "" };
    return m("div", [
      m("h1.text-2xl.font-bold.mb-4", "Create New Order"),
      m("form.bg-white.shadow.p-4.space-y-4", {
        onsubmit: e => {
          e.preventDefault();
          order.id = `ORD-${Date.now()}`;
          state.orders.push(order);
          m.route.set("/orders");
        }
      }, [
        m("input.border.p-2.w-full", { placeholder: "Customer Name", oninput: e => order.customer = e.target.value }),
        m("input.border.p-2.w-full", { placeholder: "Product Type", oninput: e => order.product = e.target.value }),
        m("input.border.p-2.w-full", { placeholder: "Quantity", type: "number", oninput: e => order.qty = e.target.value }),
        m("input.border.p-2.w-full", { placeholder: "Deadline", type: "date", oninput: e => order.deadline = e.target.value }),
        m("select.border.p-2.w-full", { onchange: e => order.priority = e.target.value }, [
          m("option", "medium"), m("option", "high"), m("option", "low")
        ]),
        m("input.border.p-2.w-full", { placeholder: "Recipient Location", oninput: e => order.location = e.target.value }),
        m("textarea.border.p-2.w-full", { placeholder: "Additional Context", oninput: e => order.notes = e.target.value }),
        m("button.bg-blue-600.text-white.px-4.py-2", "Create & Generate Strategy")
      ])
    ]);
  }
};  