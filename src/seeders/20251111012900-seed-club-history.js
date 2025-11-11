'use strict';
module.exports = {
  up: async (q) => {
    await q.bulkInsert('Club_History', [
      { history_id: 1, player_id: 1, club_id: 1, start_date: '2018-01-01', end_date: null },
      { history_id: 2, player_id: 2, club_id: 1, start_date: '2017-06-01', end_date: null },
      { history_id: 3, player_id: 3, club_id: 2, start_date: '2023-02-15', end_date: null },
      { history_id: 4, player_id: 4, club_id: 2, start_date: '2010-09-01', end_date: null },
      { history_id: 5, player_id: 5, club_id: 3, start_date: '2020-05-20', end_date: null },
      { history_id: 6, player_id: 6, club_id: 3, start_date: '2021-08-10', end_date: null },
    ]);
  },
  down: async (q) => {
    await q.bulkDelete('Club_History', { history_id: [1,2,3,4,5,6] });
  },
};
