export const api = {
  generateStrategy(order) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple heuristic: pick plant with lowest cost
        const comparison = [
          { plant: "Bangladesh Garment Complex", cost: 34500, leadTime: 18 },
          { plant: "Vietnam Textile Factory", cost: 41400, leadTime: 16 },
          { plant: "Shanghai Manufacturing Hub", cost: 48875, leadTime: 14 }
        ];
        const recommended = comparison.reduce((a, b) => (a.cost < b.cost ? a : b));
        resolve({ recommendedPlant: recommended.plant, comparison });
      }, 1000);
    });
  }
};