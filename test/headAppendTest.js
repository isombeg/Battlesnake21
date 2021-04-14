const assert = require('chai').assert;
const headAppend = require('../algos/headAppend');

const bsnake = {
    "id": "totally-unique-snake-id",
    "name": "Sneky McSnek Face",
    "health": 54,
    "body": [
        {"x": 0, "y": 0}, 
        {"x": 1, "y": 0}, 
        {"x": 2, "y": 0}
    ],
    "latency": "123",
    "head": {"x": 0, "y": 0},
    "length": 3,
    "shout": "why are we shouting??",
    "squad": "1"
};

const newBattleSnakes = {};

const snake1 = {
    "id": "snake1",
    "name": "snake1",
    "health": 54,
    "body": [
      {"x": 0, "y": 0}, 
      {"x": 1, "y": 0}, 
      {"x": 2, "y": 0}
    ],
    "latency": "123",
    "head": {"x": 0, "y": 0},
    "length": 3,
    "shout": "why are we shouting??",
    "squad": "1"
  }

const snake2 = {
    "id": "snake2",
    "name": "snake2",
    "health": 54,
    "body": [
      {"x": 4, "y": 3}, 
      {"x": 5, "y": 3}, 
      {"x": 6, "y": 3}
    ],
    "latency": "123",
    "head": {"x": 4, "y": 3},
    "length": 3,
    "shout": "why are we shouting??",
    "squad": "1"
  }

const snake3 = {
  id: "snake3",
  "name": "Literally just a head in the middle of the board",
  health: 30,
  body: [
    {x:5, y:5}
  ],
  head: {x:5, y:5},
  length: 1
}

const snake4 = {
  id: "snake4",
  "name": "I'm licherally in a corner and can only append one way",
  health: 60,
  body: [
    {x: 0, y: 10},
    {x: 0, y: 9}
  ],
  head: {x: 0, y: 10},
  length: 2
}

const snake5 = {
  id: "snake5",
  "name": "hERE to block snake4",
  health: 60,
  body: [
    {x: 1, y: 10},
    {x: 1, y: 9}
  ],
  head: {x: 1, y: 10},
  length: 2
}

const you = {
    "id": "you",
    "name": "you",
    "health": 54,
    "body": [
      {"x": 9, "y": 4}, 
      {"x": 9, "y": 5}, 
      {"x": 9, "y": 6}
    ],
    "latency": "123",
    "head": {"x": 9, "y": 4},
    "length": 3,
    "shout": "why are we shouting??",
    "squad": "1"
  }

const originalBoard = {
    "height": 11,
    "width": 11,
    "food": [
      {"x": 5, "y": 5}, 
      {"x": 9, "y": 0}, 
      {"x": 2, "y": 6}
    ],
    "hazards": [
      {"x": 0, "y": 0}, 
      {"x": 0, "y": 1}, 
      {"x": 0, "y": 2}
    ],
    "snakes": [
        snake1, snake2, you
    ]
  }

const expectedSnakesA = [
    {
        "id": "totally-unique-snake-id",
        "name": "Sneky McSnek Face",
        "health": 54,
        "body": [
            {"x": 0, "y": 1},
            {"x": 0, "y": 0}, 
            {"x": 1, "y": 0}, 
            {"x": 2, "y": 0}
        ],
        "latency": "123",
        "head": {"x": 0, "y": 1},
        "length": 4,
        "shout": "why are we shouting??",
        "squad": "1"
    },
    {
        "id": "totally-unique-snake-id",
        "name": "Sneky McSnek Face",
        "health": 54,
        "body": [
            {"x": 4, "y": 4}, 
            {"x": 4, "y": 3}, 
            {"x": 5, "y": 3}, 
            {"x": 6, "y": 3}
        ],
        "latency": "123",
        "head": {"x": 4, "y": 4}, 
        "length": 4,
        "shout": "why are we shouting??",
        "squad": "1"
    },
    {
        "id": "totally-unique-snake-id",
        "name": "Sneky McSnek Face",
        "health": 54,
        "body": [
            {"x": 4, "y": 2}, 
            {"x": 4, "y": 3}, 
            {"x": 5, "y": 3}, 
            {"x": 6, "y": 3}
        ],
        "latency": "123",
        "head": {"x": 4, "y": 2}, 
        "length": 4,
        "shout": "why are we shouting??",
        "squad": "1"
    },
    {
        "id": "totally-unique-snake-id",
        "name": "Sneky McSnek Face",
        "health": 54,
        "body": [
            {"x": 3, "y": 3}, 
            {"x": 4, "y": 3}, 
            {"x": 5, "y": 3}, 
            {"x": 6, "y": 3}
        ],
        "latency": "123",
        "head": {"x": 3, "y": 3}, 
        "length": 4,
        "shout": "why are we shouting??",
        "squad": "1"
    },
    {...you}
]

const inputBoard2 = {
  "height": 11,
  "width": 11,
  "food": [
    {"x": 5, "y": 5}, 
    {"x": 9, "y": 0}, 
    {"x": 2, "y": 6}
  ],
  "snakes": [snake3, you]
}

const inputBoard3 = {
  "height": 11,
  "width": 11,
  "food": [
    {"x": 5, "y": 5}, 
    {"x": 9, "y": 0}, 
    {"x": 2, "y": 6}
  ],
  "snakes": [snake4, you]
}

const inputBoard4 = {
  "height": 11,
  "width": 11,
  "food": [
    {"x": 5, "y": 5}, 
    {"x": 9, "y": 0}, 
    {"x": 2, "y": 6}
  ],
  "snakes": [snake4, you, snake5]
}

const case2_expectedSnakes = [
  {
    id: "snake3-4-5",
    "name": "Literally just a head in the middle of the board",
    health: 30,
    body: [
      {x:4, y:5},
      {x:5, y:5}
    ],
    head: {x:4, y:5},
    length: 2
  },
  {
    id: "snake3-5-4",
    "name": "Literally just a head in the middle of the board",
    health: 30,
    body: [
      {x:5, y:4},
      {x:5, y:5}
    ],
    head: {x:5, y:4},
    length: 2
  },
  {
    id: "snake3-6-5",
    "name": "Literally just a head in the middle of the board",
    health: 30,
    body: [
      {x:6, y:5},
      {x:5, y:5}
    ],
    head: {x:6, y:5},
    length: 2
  },
  {
    id: "snake3-5-6",
    "name": "Literally just a head in the middle of the board",
    health: 30,
    body: [
      {x:5, y:6},
      {x:5, y:5}
    ],
    head: {x:5, y:6},
    length: 2
  },
  you
]

const case3_expectedSnakes = [
  {
    id: "snake4-1-10",
    "name": "I'm licherally in a corner and can only append one way",
    health: 60,
    body: [
      {x: 1, y: 10},
      {x: 0, y: 10},
      {x: 0, y: 9}
    ],
    head: {x: 1, y: 10},
    length: 3
  },
  you
]

const case4_expectedSnakes = [
  snake4,
  you,
  {
    id: "snake5-2-10",
    "name": "hERE to block snake4",
    health: 60,
    body: [
      {x: 2, y: 10},
      {x: 1, y: 10},
      {x: 1, y: 9}
    ],
    head: {x: 2, y: 10},
    length: 3
  }
]

describe('headAppend', () => {
    it('appendHead- expectedSnakesA', () => {
        let result = headAppend(originalBoard, you);
        assert.equal(
            JSON.stringify(result.snakes) == JSON.stringify(expectedSnakesA),
            true
        )
    })

    it("appendHead- case2_expectedSnakes", () => {
      let result = headAppend(inputBoard2, you);
      assert.equal(
        JSON.stringify(result.snakes) == JSON.stringify(case2_expectedSnakes),
        true
      )
    })

    it("appendHead- case3_expectedSnakes", () => {
      let result = headAppend(inputBoard3, you);
      assert.equal(
        JSON.stringify(result.snakes) == JSON.stringify(case3_expectedSnakes),
        true
      )
    })

    it("appendHead- case4_expectedSnakes", () => {
      let result = headAppend(inputBoard4, you);
      assert.equal(
        JSON.stringify(result.snakes) == JSON.stringify(case4_expectedSnakes),
        true
      )
    })
})