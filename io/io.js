const intersection = require('lodash.intersection');
const { getLobbyById } = require('../utils/utils');
const { announce } = require('../utils/chat-utils');

module.exports = (io) => {

  io.on('connection', (socket) => {
    // console.log(`Socket: ${socket.id} connected`);

    function getUserBySID(SID) {
      return lobby.users.find(u => u.socketId === SID);
    };

    let lobby;

    socket.on('connectToLobby', ({ userId, lobbyId }) => {
      // console.log(`Connecting: ${userId} to: ${lobbyId} on: ${socket.id}`);

      lobby = getLobbyById(lobbyId);
      const user = lobby.users.find(u => u.id === userId);

      if (!user) return console.log(`${userId} not in ${lobbyId}'s user list`)

      socket.join(lobbyId);
      user.isOnline = true;
      user.socketId = socket.id;

      if (!lobby.leader) {
        lobby.leader = userId;
        user.isLeader = true;
      };

      const resData = {
        usersOnline: lobby.users.filter(u => u.isOnline === true),
        user: user
      };
      io.in(lobbyId).emit(
        'userConnected',
        {
          resData,
          msg: announce.join(user.id)
        }
      );
    });

    // disconnect

    socket.on('disconnect', () => {
      console.log(`Socket: ${socket.id} disconnected`);

      let user;

      try {
        user = getUserBySID(socket.id);
      } catch (err) {
        return console.log(`Cannot find user on Socket: ${socket.id}`);
      };

      user.isOnline = false;
      user.isReady = false;

      const needNewLeader = user.isLeader && (lobby.numOnline() >= 1);

      let newLeaderId;

      if (!needNewLeader) {
        newLeaderId = null;
      } else {
        const newLeader = lobby.users.find(u => u.isOnline === true);
        user.isLeader = false;
        newLeader.isLeader = true;
        lobby.leader = newLeader.id;
        newLeaderId = newLeader.id;
        // console.log(`${newLeaderId} is the new leader of ${lobby.id}`);
      };

      const resData = {
        usersOnline: lobby.users.filter(u => u.isOnline === true),
        discoUserId: user.id,
        newLeaderId
      };

      io.to(lobby.id).emit(
        'userDisco',
        {
          resData,
          msg: announce.leave(user.id)
        }
      );
      // console.log(`Removed: ${user.id} on: ${socket.id} from: ${lobby.id}`);
    });

    // readyUnready

    socket.on('readyUnready', ({ userId }) => {
      const user = lobby.users.find(u => u.id === userId);
      user.isReady ? user.isReady = false : user.isReady = true;

      const resData = {
        usersOnline: lobby.users.filter(u => u.isOnline === true),
        userId: userId,
        ready: user.isReady,
        canStart: lobby.canStart()
      };
      // console.log(`${userId} is ${user.isReady ? 'ready' : 'not ready'}`);
      io.in(lobby.id).emit(
        'readyUnready',
        {
          resData,
          msg: announce.ready(userId, user.isReady)
        }
      );
    });

    // ghostAssigned

    function unAssignGhost() {
      const formerGhost = lobby.users.find(u => u.isAssignedToGhost === true);
      if (formerGhost) formerGhost.isAssignedToGhost = false;
    };

    function assignNewGhost(userId) {
      unAssignGhost();
      const newGhost = lobby.users.find(u => u.id === userId);
      newGhost.isAssignedToGhost = true;
      lobby.gameSettings.assignedToGhost = userId;
    };

    function assignNoGhost() {
      unAssignGhost();
      lobby.gameSettings.assignedToGhost = null;
    };

    socket.on('ghostAssigned', (data) => {
      const userId = data[0];
      userId ? assignNewGhost(userId) : assignNoGhost();

      const resData = {
        usersOnline: lobby.users.filter(u => u.isOnline === true),
        assignedToGhost: lobby.gameSettings.assignedToGhost
      };

      io.in(lobby.id).emit(
        'ghostAssigned',
        {
          resData,
          msg: announce.ghostAssigned(userId)
        }
      );
    });

    // toggle

    function emitGameSettingsChange() {
      io.in(lobby.id).emit(
        'gameSettingsUpdate',
        {
          gameSettings: lobby.gameSettings
        }
      );
    };

    function toggleItem(toggledItem) {
      switch (toggledItem) {
        case `witness`:
          lobby.gameSettings.hasWitness = !lobby.gameSettings.hasWitness;
          emitGameSettingsChange();
          break;
        case `accomplice`:
          lobby.gameSettings.hasAccomplice = !lobby.gameSettings.hasAccomplice;
          emitGameSettingsChange();
          break;
        default: return console.log(`toggleItem Error: 'toggledItem' = ${toggledItem}`);
      };
    };

    socket.on('toggle', toggledItem => toggleItem(toggledItem));

    // newMessage

    socket.on('newMessage', (data) => {
      const msg = announce.userMessage(data.sender, data.text)
      lobby.chat.push(msg);
      io.in(lobby.id).emit(
        'newMessage',
        msg
      );
    });

    // startGame

    function emitToHunters(user) {
      io.to(user.socketId).emit(
        'startGame',
        {
          game: lobby.game.viewAsHunter(),
          msg: announce.gameStart(),
        }
      );
    };

    function emitToGhostKiller(user) {
      io.to(user.socketId).emit(
        'startGame',
        {
          game: lobby.game,
          msg: announce.gameStart()
        }
      );
    };

    socket.on('startGame', (data) => {
      // console.log('Game started');

      lobby.makeGame(data.settings);

      lobby.game.players.forEach(player => {
        lobby.game.hunters.includes(player) ? emitToHunters(player) : emitToGhostKiller(player);
      });
    });

    // clearGame

    socket.on('clearGame', () => {
      // console.log('Game cleared by leader');

      lobby.game = null;
      lobby.gameOn = false;
      io.in(lobby.id).emit(
        'gameEnd',
        {
          cause: 'emergencyStop',
          msg: announce.gameEnd('emergencyStop')
        }
      );
    });

    // advanceStage

    socket.on('advanceStage', () => {
      lobby.game.advanceStage();
      io.in(lobby.id).emit(
        'advanceStage',
        {
          game: lobby.game,
          msg: announce.advanceTo(lobby.game.currentStage)
        }
      )
    });

    // keyEvidenceChosen (by killer)

    socket.on('keyEvidenceChosen', (keyEv) => {
      // console.log(`Key evidence chosen: ${keyEv[0]}, ${keyEv[1]}`);

      lobby.game.keyEvidence = keyEv;
      lobby.game.advanceStage();
      io.in(lobby.id).emit(
        'advanceStage',
        {
          game: lobby.game,
          msg: announce.advanceTo(lobby.game.currentStage)
        }
      );
      io.to(lobby.game.ghost.socketId).emit(
        'keyEvidenceChosen',
        { game: lobby.game }
      );
    });

    // clueChosen (by Ghost)

    socket.on('clueChosen', (data) => {
      const clue = data[0];

      // console.log(`Clue chosen: ${clue}`);

      lobby.game.confirmedClues.push(clue);
      const cardToLock = lobby.game.cluesDeck.find(card => card.opts.some(opt => opt.id === clue));
      cardToLock.isLocked = true;
      io.in(lobby.id).emit(
        'clueChosen',
        {
          game: lobby.game,
          msg: announce.clueChosen(clue)
        }
      );
    });

    // accusation

    socket.on('accusation', ({accuserSID, accusedId, accusalEv}) => {
      const accuser = getUserBySID(accuserSID);

      // console.log(`${accuser.id} accuses: ${accusedId} (${accusalEv[0]}, ${accusalEv[1]})`);

      const correct = intersection(accusalEv, lobby.game.keyEvidence).length === 2;
      if (correct) {
        io.in(lobby.id).emit(
          'gameEnd',
          {
            cause: 'accusation',
            accuserId: accuser.id,
            killerId: accusedId,
            keyEv: accusalEv
          }
        );
        io.in(lobby.id).emit(
          'rightAccusation',
          {
            msg: announce.accusationRight(accuser.id, accusedId)
          }
        );
        lobby.game = null;
        lobby.gameOn = false;
        // console.log(`${accuser.id} is correct; ${accusedId} loses; game over!`);
        return;
      };

      // console.log(`${accuser.id} is incorrect; game continues...`);

      accuser.accusalSpent = true;
      io.in(lobby.id).emit(
        'wrongAccusation',
        {
          game: lobby.game,
          msg: announce.accusation({
            accuser: accuser.id,
            accusee: accusedId,
            evidence: accusalEv
          })
        }
      );
    });

  });

};