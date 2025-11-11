'use strict';
module.exports = {
  up: async (q) => {
    await q.bulkInsert('Matches', [
      { match_id: 1, tournament_id: 1, player1_id: 1, player2_id: 2, round: 'Final',     match_date: '2025-03-12', winner_id: 1 },
      { match_id: 2, tournament_id: 1, player1_id: 5, player2_id: 4, round: 'Semifinal', match_date: '2025-03-11', winner_id: 5 },
      { match_id: 3, tournament_id: 1, player1_id: 1, player2_id: 5, round: 'Semifinal', match_date: '2025-03-11', winner_id: 1 },
      { match_id: 4, tournament_id: 2, player1_id: 3, player2_id: 6, round: 'Final',     match_date: '2025-04-06', winner_id: 3 },
    ]);
  },
  down: async (q) => {
    await q.bulkDelete('Matches', { match_id: [1,2,3,4] });
  },
};
