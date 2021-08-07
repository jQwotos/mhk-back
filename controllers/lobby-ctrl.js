
const HttpError = require('../models/HttpError');
const { uniqUserID } = require('../utils/uniqUserID');
const { uniqLobbyID } = require('../utils/uniqLobbyID');
const { makeLobby, makeUser } = require('../data');
const { getLobbyById, getRoleById, omit } = require('../utils/utils');
const { LOBBIES } = require('../utils/constants');

const getLobby = async (req, res, next) => {

  let lobby;
  try {
    lobby = await getLobbyById(req.params.lobbyUrlRoute);
  } catch (err) {
    console.log(err);
    const error = new HttpError('Could not find lobby.', 500);
    return next(error);
  };

  const user = lobby.users.find(u => u.id === req.body.userId);

  res.status(200).json({ lobby: resData(user, lobby) });
};

function resData(user, lobby) {
  if (!lobby.game) return lobby;
  if (!isPlayer(user, lobby)) {
    assignSpectator(user, lobby);
    return lobby;
  }
  return redactGame(user.id, lobby);
};

function isPlayer(user, lobby) {
  return lobby.game.players.some(p => p.id === user.id);
}

function assignSpectator(user, lobby) {
  lobby.game.spectators.push(user);
  lobby.game.rolesRef.push({role: 'spectator', user: user});
};

function redactGame(userId, lobby) {
  const role = getRoleById(userId, lobby);

  const lobbyWithGame = omit(lobby, ['game']);
  lobbyWithGame.game = lobby.game.viewAs(role);
  return lobbyWithGame;
};

const createLobby = async (req, res) => {
  // console.log('createLobby');

  const userId = uniqUserID(req.body.userName);
  const lobbyId = uniqLobbyID();

  const newUser = makeUser({
    id: userId,
    myLobby: lobbyId,
    lobbyCreator: true
  });

  const newLobby = makeLobby(newUser);

  LOBBIES[newLobby.id] = newLobby;

  req.session.userIdCookie = userId;
  req.session.userLobbyCookie = lobbyId;

  res.status(201).json({
    user: newUser,
    lobby: newLobby
  });
};

exports.getLobby = getLobby;
exports.createLobby = createLobby;