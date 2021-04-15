const assert = require('chai').assert;
const tailTrim = require('../algos/tailTrim');

const snake1 = {
    "id": "1",
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
    "id": "2",
    "name": "snake2",
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

  const snake3 = {
    "id": "3",
    "name": "snake3",
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

  const you = {
    "id": "id",
    "name": "mySnake",
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


  var board = {
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
      snake1,
      snake2,
      snake3,
      you
    ]
  }

  const expectedSnake1 = {
    "id": "1",
    "name": "snake1",
    "health": 54,
    "body": [
      {"x": 0, "y": 0}, 
    ],
    "latency": "123",
    "head": {"x": 0, "y": 0},
    "length": 1,
    "shout": "why are we shouting??",
    "squad": "1"
  }

  const expectedSnake2 = {
    "id": "2",
    "name": "snake2",
    "health": 54,
    "body": [
      {"x": 0, "y": 0}, 
    ],
    "latency": "123",
    "head": {"x": 0, "y": 0},
    "length": 1,
    "shout": "why are we shouting??",
    "squad": "1"
  }

  const expectedSnake3 = {
    "id": "3",
    "name": "snake3",
    "health": 54,
    "body": [
      {"x": 0, "y": 0}, 
    ],
    "latency": "123",
    "head": {"x": 0, "y": 0},
    "length": 1,
    "shout": "why are we shouting??",
    "squad": "1"
  }

  const expectedBoard = {
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
        expectedSnake1,
        expectedSnake2,
        expectedSnake3,
        you
    ]
  }

describe('tailTrim', function(){
    it('trim tail - checking board', function(){
        let result = tailTrim(board, you);
        assert.equal(
            JSON.stringify(result.snakes) == JSON.stringify(expectedBoard.snakes),
            true
        )
    })
})