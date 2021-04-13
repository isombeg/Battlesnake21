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
        "length": 3,
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
        "length": 3,
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
        "length": 3,
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
        "length": 3,
        "shout": "why are we shouting??",
        "squad": "1"
    },
    {...you}
]

describe('headAppend', () => {
    it('appendHeadLeft - should append', () => {
        let result = headAppend(originalBoard, you);
        assert.equal(
            JSON.stringify(result.snakes) == JSON.stringify(expectedSnakesA),
            true
        )
    })
})