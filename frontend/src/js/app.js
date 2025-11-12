import m from "mithril";
import Dashboard from "./components/Dashboard.js";
import OrdersList from "./components/OrdersList.js";
import OrderDetails from "./components/OrderDetails.js";
import NewOrder from "./components/NewOrder.js";

m.route(document.getElementById("app"), "/dashboard", {
  "/dashboard": Dashboard,
  "/orders": OrdersList,
  "/orders/new": NewOrder,
  "/orders/:id": OrderDetails
});