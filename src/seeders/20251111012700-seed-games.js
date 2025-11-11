'use strict';
module.exports = {
  up: async (q) => {
    await q.bulkInsert('Games', [
      { game_id: 1, match_id: 1, game_number: 1, player1_points: 11, player2_points: 7 },
      { game_id: 2, match_id: 1, game_number: 2, player1_points: 9,  player2_points: 11 },
      { game_id: 3, match_id: 1, game_number: 3, player1_points: 11, player2_points: 8 },
      { game_id: 4, match_id: 2, game_number: 1, player1_points: 11, player2_points: 6 },
      { game_id: 5, match_id: 2, game_number: 2, player1_points: 11, player2_points: 9 },
      { game_id: 6, match_id: 3, game_number: 1, player1_points: 11, player2_points: 5 },
      { game_id: 7, match_id: 3, game_number: 2, player1_points: 11, player2_points: 7 },
      { game_id: 8, match_id: 4, game_number: 1, player1_points: 11, player2_points: 9 },
      { game_id: 9, match_id: 4, game_number: 2, player1_points: 6,  player2_points: 11 },
      { game_id:10, match_id: 4, game_number: 3, player1_points: 11, player2_points: 8 },
    ]);
  },
  down: async (q) => {
    await q.bulkDelete('Games', { game_id: [1,2,3,4,5,6,7,8,9,10] });
  },
};
