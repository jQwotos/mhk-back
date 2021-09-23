// constants

const DEVMODE = process.env.NODE_ENV !== "production"

const LOBBIES = {},
      GHOST = 'ghost',
      HUNTER = 'hunter',
      KILLER = 'killer',
      ACCOMPLICE = 'accomplice',
      WITNESS = 'witness'
      CAUSE = 'cause',
      LOCATION = 'location',
      CLUE = 'clue',
      MIN_PLAYER_COUNT = 3,
      MIN_PLAYER_COUNT_FOR_ADV_ROLES = 4;

const OPT_ROLES = ['witness', 'accomplice'];

const DEFAULT_GAME_SETTINGS = {
  assignedToGhost: null,
  hasWitness: false,
  hasAccomplice: false,
  timer: {
    on: false,
    duration: 0,
    durationOpts: [0, 1, 2, 3, 4, 5],
  }
};

const GAME_OUTCOMES = {
  redwin: 'Killer wins! The Hunters used their last accusation.',
  redwintimeout: 'Killer wins! The Hunters ran out of time.',
  redwinwitnessdead: 'Killers win! The Witness is dead.',
  bluewin: 'Hunters and Ghost win!',
  bluewinwitnessalive: 'Hunters and Ghost win! The Witness survived.'
};

const COLORS = [
  'red','blue','green','yellow','orange','purple','pink','cyan','emerald','violet','rose','amber'
];

const EVIDENCE_CARD_INFO = [
  'Love Letter',
  'Raincoat',
  'Broken Glass',
  'Wine Glass',
  'Motor Oil',
  'Thread',
  'Mirror',
  'Fish Tank',
  'Tire',
  'Bicycle',
  'Computer',
  'Umbrella',
  'Flowers',
  'Apple',
  'Plane Ticket',
  'telephone',
  'envelope',
  'chalk',
  'perfume',
  'test tube',
  'ballet slippers',
  'bone',
  'clothes iron',
  'surgical mask',
  'computer mouse',
  'fruit juice',
  'gift',
  'toothpicks',
  'bullet',
  'fiber optics',
  'sock',
  'gloves',
  'mosquito netting',
  'candy',
  'needle & thread',
  'watch',
  'antique furniture',
  'white powder',
  'eggs',
];

const MEANS_CARD_INFO = [
  'Knife',
  'Revolver',
  'Pills',
  'Falling Debris',
  'Animal Bite',
  'Power Tool',
  'Machine',
  'Motor Vehicle',
  'Plastic Bag',
  'Brick',
  'Axe',
  'Crowbar',
  'Drowned',
  'Hunting Rifle',
  'Heart Attack',
  'crutch',
  'razor blade',
  'electric baton',
  'scarf',
  'liquid drug',
  'machete',
  'potted plant',
  'wine',
  'dirty water',
  'plague',
  'dumbbell',
  'ice skates',
  'candle stick',
  'matches',
  'belt',
  'venomous insect',
  'lighter',
  'wrench',
  'starvation',
  'electric shock',
  'scissors',
  'machinery',
  'chemicals',
  'metal wire',
];

const makePlayerCard = (info, type) => {
  return {
    imgURL: `url.${info}`,
    id: info,
    type: type
  };
};

const EVIDENCE_DECK = EVIDENCE_CARD_INFO.map(info => makePlayerCard(info, 'evidence'));
const MEANS_DECK = MEANS_CARD_INFO.map(info => makePlayerCard(info, 'means'))

const GHOST_CARD_INFO = [
  {
    type: CAUSE,
  
    id: 'Cause of Death',
    opts: ['Suffocation', 'Severe Injury', 'Blood Loss', 'Illness/Disease', 'Poison', 'Accident']
  },
  {
    type: LOCATION,
  
    id: 'Location',
    opts: ['Playground', 'Classroom', 'Dormitory', 'Cafeteria', 'Elevator', 'Toilet']
  },
  {
    type: LOCATION,
  
    id: 'Location',
    opts: ['Pub', 'Restaurant', 'Bookstore', 'Hotel', 'Hospital', 'Building Site']
  },
  {
    type: CLUE,
  
    id: 'Motive',
    opts: ['Hatred', 'Power', 'Money', 'Love', 'Envy', 'Justice']
  },
  {
    type: CLUE,
  
    id: 'In Progress',
    opts: ['Entertainment', 'Relaxation', 'Assembly', 'Trading', 'Visit', 'Dining']
  },
  {
    type: CLUE,
  
    id: 'Duration',
    opts: ['Instant', 'Brief', 'Gradual', 'Prolonged', 'A Few Days', 'Unclear']
  },
  {
    type: CLUE,
  
    id: 'General Impression',
    opts: ['Common', 'Creative', 'Fishy', 'Cruel', 'Horrific', 'Suspensful']
  },
  {
    type: CLUE,
  
    id: 'Relationship',
    opts: ['Relatives', 'Friends', 'Colleagues', 'Competitors', 'Lovers', 'Strangers']
  },
  {
    type: CLUE,
  
    id: 'Victim\'s Expression',
    opts: ['Peaceful', 'Struggling', 'Frightened', 'In Pain', 'Blank', 'Angry']
  },
  {
    type: CLUE,
  
    id: 'Hint on Corpse',
    opts: ['Head', 'Chest', 'Hand', 'Leg', 'Partial', 'All-over']
  }
];

const HIDE_FROM = {
  spectator: [],
  ghost: [],
  killer: [
    'blueTeam', 'rolesRef', 'witness', 'hunters'
  ],
  accomplice: [
    'blueTeam', 'rolesRef', 'witness', 'hunters'
  ],
  witness: [
    'blueTeam', 'rolesRef', 'keyEvidence', 'killer', 'accomplice'
  ],
  hunter: [
    'blueTeam', 'redTeam', 'rolesRef', 'keyEvidence', 'hunters', 'killer', 'accomplice', 'witness'
  ]
};

exports.DEVMODE = DEVMODE;
exports.LOBBIES = LOBBIES;
exports.GAME_OUTCOMES = GAME_OUTCOMES;
exports.OPT_ROLES = OPT_ROLES;
exports.GHOST = GHOST;
exports.HUNTER = HUNTER;
exports.KILLER = KILLER;
exports.ACCOMPLICE = ACCOMPLICE;
exports.WITNESS = WITNESS;
exports.EVIDENCE_DECK = EVIDENCE_DECK;
exports.MEANS_DECK = MEANS_DECK;
exports.GHOST_CARD_INFO = GHOST_CARD_INFO;
exports.COLORS = COLORS;
exports.HIDE_FROM = HIDE_FROM;
exports.DEFAULT_GAME_SETTINGS = DEFAULT_GAME_SETTINGS;
exports.MIN_PLAYER_COUNT = MIN_PLAYER_COUNT;
exports.MIN_PLAYER_COUNT_FOR_ADV_ROLES = MIN_PLAYER_COUNT_FOR_ADV_ROLES;