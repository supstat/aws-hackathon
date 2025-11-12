export const state = {
  plants: [
    { name: "Shanghai Manufacturing Hub", utilization: 75, leadTime: 14, cost: 8.5, quality: 4.5, specialties: ["T-shirts", "Hoodies", "Activewear"] },
    { name: "Vietnam Textile Factory", utilization: 60, leadTime: 16, cost: 7.2, quality: 4.2, specialties: ["Denim", "Casual wear", "Pants"] },
    { name: "Bangladesh Garment Complex", utilization: 85, leadTime: 18, cost: 6, quality: 3.8, specialties: ["Basic apparel", "T-shirts", "Budget lines"] }
  ],
  orders: [
    { id: "ORD-2024-001", customer: "Urban Threads Co.", product: "Hoodies", qty: 5000, deadline: "2024-02-15", priority: "high", status: "in-production", notes: "Need eco-friendly materials" },
    { id: "ORD-2024-002", customer: "SportFit Inc.", product: "Activewear", qty: 8000, deadline: "2024-03-01", priority: "medium", status: "pending", notes: "Rush delivery if possible" }
  ]
};