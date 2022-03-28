interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  createAt: number;
  status: string;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Prueba",
      createAt: Date.now(),
      status: "pending",
    },
  ],
};
