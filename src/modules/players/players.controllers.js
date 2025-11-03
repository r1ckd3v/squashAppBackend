// Player Controllers

exports.postCreatePlayer = (req, res, next) => {
  const name = req.body.name;
  const lastName = req.body.lastName;
  // Create post in DB
  res.status(201).json({
    message: 'Player created successfully!',
    player: { id: new Date().toISOString(), name: name, lastName: lastName },
  });
};

exports.getPlayers = (req, res, next) => {
  //read the DB
  res.status(200).json({
    players: [
      { name: 'Paul', lastName: 'Coll' },
      { name: 'Amehr', lastName: 'Shabanna' },
    ],
  });
};

exports.getPlayer = (req, res, next) => {
  const id = req.params.id;
  //read the DB
  res.status(200).json({
    player: [{ id: id, name: 'Paul', lastName: 'Coll' }],
  });
};

exports.patchPlayer = (req, res, next) => {
  const id = req.params.id;
  // patch in the DB
  res.status(200).json({
    message: `Player ${id} has been PATCH`,
    player: [{ id: id, name: 'Paul', lastName: 'Coll' }],
  });
};

exports.putPlayer = (req, res, next) => {
  const id = req.params.id;
  // put in the DB
  res.status(200).json({
    message: `Player ${id} has been PUT`,
    player: [{ id: id, name: 'Paul', lastName: 'Coll' }],
  });
};

exports.deletePlayer = (req, res, next) => {
  const id = req.params.id;
  //read the DB
  res.status(200).json({
    message: `Player ${id} has been DELETED`,
    player: [{ id: id, name: 'Paul', lastName: 'Coll' }],
  });
};
