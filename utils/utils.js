// Misc Utilites and Constants

// TO DO: break these out into separate files.

const isDevEnv = process.env.NODE_ENV !== 'production';
const servName = 'MHK';
const devPort = 5555;

const LOBBIES = {};
const TIMERS = {};
const GHOST = 'ghost';
const HUNTER = 'hunter';
const KILLER = 'killer';
const ACCOMPLICE = 'accomplice';
const WITNESS = 'witness';
const CAUSE = 'cause';
const LOCATION = 'location';
const CLUE = 'clue';
const OPT_ROLES = ['witness', 'accomplice'];

const EVIDENCE_CARD_DATA = [
  'love letter','rain coat','broken glass','wine glass','motor oil','thread','mirror','fish tank','tire','bicycle','computer','umbrella','keyboard','flowers','apple','plane ticket','telephone','envelope','chalk','ballet slippers','computer mouse','gift','tooth picks','bullet','fiber optics','sock','gloves','mosquito netting','candy','sewing kit','watch','antique furniture','eggs','spices','tattoo','skull','table lamp','map','gear','flyer','numbers','tea leaves','notebook','hour glass','receipt','towel','tool box','cardboard box','toy blocks','painting','nail','gift wrap','fruit juice','surgical mask','clothing iron','bone','test tube','perfume','panties','boxer shorts','white powder','black powder','red powder','antique vase','watch','candy','campfire','gloves','computer cable','cigarette ash','paperwork','cigarette butt','lunch box','light switch','postage stamp','button','paper money','dice','mobile phone','blood','earrings','handcuffs','exam paper','lipstick','wallet','costume mask','tweezers','maze','apple','ants','safety pin','paper bag','clothes hanger','doctor\'s note','shoe','sandals','cotton balls','bell','bread','sponge','electric parts','signature','tissues','peanuts','poker chips','diary','flute','coffee','wedding ring','bandage','hat','violin','flash light','badge','dentures','light bulb','suit','cigar','sunglasses','space heater','spy camera','book','key','luggage','cockroach','syringe','bracelet','earbuds','game console','office supplies','insect','calendar','laptop','teacup','high heel','puppet','stuffed animal','stockings','dog fur','cat fur','leash','vegetables','newspaper','paint','comic books','rose','wedding invite','rat','dust','human hair','oil stain','finger nails','cake','plastic bottle','photograph','dirt','ice','slinky','playing cards','spider','tie','soap','shampoo','puzzle pieces','diamond','curtains','leaf','camp fire','broom','glue','menu','sand','fan','dictonary','library card','wig','riddle','magazine','padlock','hairpin','helmet','lottery ticket','black cat','graffiti','lens','sticky note','speaker','sawdust','bullseye','herbal medicine','house plant','coins'
];

const MEANS_CARD_DATA = [
  'pocket knife','pistol','pills','falling debris','animal bite','power tool','machine','motor vehicle','plastic bag','brick','axe','crowbar','drowned','hunting rifle','heart attack','crutch','razor blade','cattle prod','scarf','liquid drug','machete','potted plant','wine','dirty water','plague','dumbbell','ice skates','candle stick','matches','belt','venomous insect','lighter','wrench','starved','electric shock','scissors','machinery','chemicals','metal wire','illegal drugs','fish hook','sculpture','powder drug','dismember','injection','baseball bat','towel','box cutter','rope','pills','metal chain','mercury','poisoned needle','stone','amoeba','arson','locked room','dagger','chainsaw','kerosene','wire','arsenic','noxious gas','folding chair','buried','packing tape','steel pipe','smoke','gun powder','bleeding','explosion','drill','bare hands','rubbing alcohol','meat cleaver','blender','pillow','overdose','throat slit','hammer','ripped apart','medical procedure','radiation','virus','sulfuric acid','sniper rifle','trophy','pesticide','board game','fork','arrow','spear','frozen','liquid nitrogen','infection','head trauma','building collapse','rail car','farm animal','throwing star','sword','crushed','alcohol poisoning','zoo animal','ice pick','scythe','cesspool','rockslide','tablesaw','forklift','boat propeller','cannon','covid-19','hanging','cooked'
];

const makePlayerCard = (info, type) => {
  return {
    imgURL: `placeholderUrl.${info}`, // Images not yet implemented.
    id: info,
    type: type
  };
};

const MEANS_DECK = MEANS_CARD_DATA.map(info => makePlayerCard(info, 'means'));
const EVIDENCE_DECK = EVIDENCE_CARD_DATA.map(info => makePlayerCard(info, 'evidence'));

const GHOST_CARD_INFO = [
  {
    type: CAUSE,
    id: 'Cause of Death',
    opts: ['Suffocation', 'Severe Injury', 'Blood Loss', 'Illness', 'Poison', 'Accident']
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
    type: LOCATION,
    id: 'Location',
    opts: ['vacation home', 'park', 'supermarket', 'school', 'forest', 'bank']
  },
  {
    type: LOCATION,
    id: 'Location',
    opts: ['living room', 'bedroom', 'pantry', 'bathroom', 'kitchen', 'driveway']
  },
  {
    type: 'clue',
    id: "victim's build",
    opts: [ 'large', 'thin', 'tall', 'short', 'disfigured', 'athletic' ]
  },
  {
    type: 'clue',
    id: 'trace at scene',
    opts: [
      'fingerprint',
      'footprint',
      'bruise',
      'blood stain',
      'bodily fluid',
      'scar'
    ]
  },
  {
    type: 'clue',
    id: "killer's personality",
    opts: [
      'arrogant',
      'despicable',
      'angry',
      'greedy',
      'stubborn',
      'perverted'
    ]
  },
  {
    type: 'clue',
    id: 'day of crime',
    opts: [ 'weekday', 'weekend', 'spring', 'summer', 'fall', 'winter' ]
  },
  {
    type: 'clue',
    id: 'evidence left behind',
    opts: [
      'natural',
      'artistic',
      'written',
      'synthetic',
      'personal',
      'unrelated'
    ]
  },
  {
    type: 'clue',
    id: "victim's clothes",
    opts: [ 'neat', 'dirty', 'elegant', 'shabby', 'bizarre', 'naked' ]
  },
  {
    type: 'clue',
    id: 'noticed by bystander',
    opts: [
      'sudden sound',
      'prolonged sound',
      'smell',
      'visual',
      'action',
      'nothing'
    ]
  },
  {
    type: 'clue',
    id: 'time of death',
    opts: [ 'dawn', 'morning', 'noon', 'afternoon', 'evening', 'midnight' ]
  },
  {
    type: 'clue',
    id: 'state of the scene',
    opts: [
      'bits and pieces',
      'ashes',
      'liquid damage',
      'cracked',
      'disorderly',
      'clean'
    ]
  },
  {
    type: 'clue',
    id: 'weather',
    opts: [ 'sunny', 'stormy', 'dry', 'humid', 'cold', 'hot' ]
  },
  {
    type: 'clue',
    id: "victim's occupation",
    opts: [
      'boss',
      'professional',
      'amateur',
      'student',
      'unemployed',
      'retired'
    ]
  },
  {
    type: 'clue',
    id: 'condition of corpse',
    opts: [
      'still warm',
      'stiff',
      'decayed',
      'incomplete',
      'intact',
      'twisted'
    ]
  },
  {
    type: 'clue',
    id: "victim's identity",
    opts: [ 'child', 'young adult', 'middle-aged', 'senior', 'man', 'woman' ]
  },
  {
    type: 'clue',
    id: 'sudden incident',
    opts: [
      'power failure',
      'fire',
      'conflict',
      'scattering',
      'scream',
      'nothing'
    ]
  },
  {
    type: 'clue',
    id: 'Motive',
    opts: [ 'Hatred', 'Power', 'Money', 'Love', 'Envy', 'Justice' ]
  },
  {
    type: 'clue',
    id: 'In Progress',
    opts: [
      'Entertainment',
      'Relaxation',
      'Assembly',
      'Trading',
      'Visit',
      'Dining'
    ]
  },
  {
    type: 'clue',
    id: 'Duration',
    opts: [
      'Instant',
      'Brief',
      'Gradual',
      'Prolonged',
      'A Few Days',
      'Unclear'
    ]
  },
  {
    type: 'clue',
    id: 'General Impression',
    opts: [
      'Common',
      'Creative',
      'Fishy',
      'Cruel',
      'Horrific',
      'Suspensful'
    ]
  },
  {
    type: 'clue',
    id: 'Relationship',
    opts: [
      'Relatives',
      'Friends',
      'Colleagues',
      'Competitors',
      'Lovers',
      'Strangers'
    ]
  },
  {
    type: 'clue',
    id: "Victim's Expression",
    opts: [
      'Peaceful',
      'Struggling',
      'Frightened',
      'In Pain',
      'Blank',
      'Angry'
    ]
  },
  {
    type: 'clue',
    id: 'Hint on Corpse',
    opts: [ 'Head', 'Chest', 'Hand', 'Leg', 'Partial', 'All-over' ]
  }
];

// List of game properties to be hidden from certain roles.
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
    'blueTeam', 'redTeam', 'rolesRef', 'keyEvidence', 'hunters', 'killer',
    'accomplice', 'witness'
  ]
};

// Check if value is truthy.
const isTruthy = (x) => !!x ? true : console.log(`ERR! have = ${x}`);

// Return new object with specified properties to `null`.
const nullify = (obj, keys) => {
  const newObj = Object.assign({}, obj);
  keys.forEach(key => {
    newObj[key] = null;
  });
  return newObj;
};

// Return new object with specified properties removed.
const omit = (obj, keys) => {
  const newObj = Object.assign({}, obj);
  keys.forEach(key => {
    delete newObj[key];
  });
  return newObj;
};

// Capitalize first letter of each word (separated by non-letter characters).
const capitalize = (str) => {
  return str.replace(/\b([a-zÁ-ú])/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));
};

// Shuffle an array. (Mutates the array.)
const shuffle = (array) => {
  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  };
  return array;
};

// Divide elements of an array into 'batches' of given size (e.g. arrays of
// given length). Last 'batch' contains to remainder, if any. Returns an array
// of arrays. (Does not mutate the original array.)
const batch = (array, batchSize) => {
  const batches = [];

  let i = 1
  array.forEach(card => {
    switch (true) {
      case (i === 1):
        batches.push([]);
        batches[batches.length-1].push(card);
        i++;
        break;
      case (i > 1 && i < batchSize):
        batches[batches.length-1].push(card);
        i++
        break;
      case (i === batchSize):
        batches[batches.length-1].push(card);
        i = 1;
        break;
    };
  });

  return batches;
};

const shuffleAndBatch = (array, batchSize) => {
  const shuffledDeck = shuffle(array);
  return batch(shuffledDeck, batchSize);
};

const makeGhostCard = (item) => {
  return {
    type: item.type,
    id: item.id,
    opts: item.opts.map(opt => createOption(opt)),
    isDisplayed: false,
    isLocked: false
  };

  function createOption(opt) {
    return {
      id: opt,
      isSelected: false
    };
  };
};

// TO DO: add proper error handling.
const getLobbyById = lobbyId => {
  const id = lobbyId.toLowerCase();
  if (!LOBBIES[id]) {
    console.log(`ERR! getLobbyById: lobby '${id}' not found`);
    return;
  };
  return LOBBIES[id];
};

// TO DO: add proper error handling.
const getUserById = ({lobbyId, userId}) => {
  if (!LOBBIES[lobbyId]) {
    console.log(`ERR! getUserById: lobby '${lobbyId}' not found`);
    return;
  };
  return LOBBIES[lobbyId].users.find(user => user.id === userId);
};

// TO DO: add proper error handling.
const getRoleById = (userId, lobby) => {
  const role = lobby.game.rolesRef.find(ref => ref.user.id === userId).role;
  if (!!role) return role;
  return console.log(`ERR! getRoleById: role '${userId}' matches no roles in this game`);
};

// Structure message data for the `buildSMDString` front end module.
const msg = ({
  type,
  args=[],
  isInGame,
  senderId='app'
}) => {
  return {
    // `en-GB` format is expected by `convertToClientTimezone`.
    time: new Date().toLocaleTimeString('en-GB'),
    type,
    isInGame,
    args,
    senderId,
  };
};

const cookieSettings = {
  maxAge: 60 * 60 * 7000, // 7 hours
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
  secure: process.env.NODE_ENV === "production"
}

module.exports = {
  isDevEnv,
  servName,
  devPort,
  LOBBIES,
  TIMERS,
  OPT_ROLES,
  GHOST,
  HUNTER,
  KILLER,
  ACCOMPLICE,
  WITNESS,
  EVIDENCE_DECK,
  MEANS_DECK,
  GHOST_CARD_INFO,
  HIDE_FROM,
  cookieSettings,
  omit,
  nullify,
  capitalize,
  shuffle,
  shuffleAndBatch,
  makeGhostCard,
  getLobbyById,
  getUserById,
  getRoleById,
  msg,
  isTruthy
};
