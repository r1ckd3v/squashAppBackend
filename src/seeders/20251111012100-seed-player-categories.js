'use strict';
module.exports = {
  up: async (q) => {
    await q.bulkInsert('Player_Categories', [
      { category_id: 1, name: 'Senior', description: 'Standard adult division' },
      { category_id: 2, name: 'Junior', description: 'Under-18 division' },
      { category_id: 3, name: 'Veteran', description: 'Over-40 division' },
    ]);
  },
  down: async (q) => {
    await q.bulkDelete('Player_Categories', { category_id: [1,2,3] });
  },
};
