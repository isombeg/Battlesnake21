const assert = require('chai').assert;
const tailTrim = require('../algos/tailTrim');

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


const inputBoard1 = {
    "height": 11,
    "width": 11,
    "food": [
        {"x": 5, "y": 5}, 
        {"x": 9, "y": 0}, 
        {"x": 2, "y": 6}
    ],
    "snakes": [you]
}

const expectedSnakes1 = [you]

const inputBoard2 = {
    "height": 11,
    "width": 11,
    "food": [
        {"x": 5, "y": 5}, 
        {"x": 9, "y": 0}, 
        {"x": 2, "y": 6}
    ],
    "snakes": [snake1, you]
}

const expectedSnakes2 = [
    {
        "id": "snake1",
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
    },
    you
]

const inputBoard3 = {
    "height": 11,
    "width": 11,
    "food": [
        {"x": 5, "y": 5}, 
        {"x": 9, "y": 0}, 
        {"x": 2, "y": 6}
    ],
    "snakes": [snake1, snake2, you]
}

const expectedSnakes3 = [
    {
        "id": "snake1",
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
    },
    {
        "id": "snake2",
        "name": "snake2",
        "health": 54,
        "body": [
          {"x": 4, "y": 3}
        ],
        "latency": "123",
        "head": {"x": 4, "y": 3},
        "length": 1,
        "shout": "why are we shouting??",
        "squad": "1"
    },
    you
]

describe('headAppend', () => {
    it('tailTrim - expectedSnakes1', () => {
        let result = tailTrim(inputBoard1, you);
        assert.equal(
            JSON.stringify(result.snakes) === JSON.stringify(expectedSnakes1),
            true
        )
    })
    it('tailTrim - expectedSnakes2', () => {
        let result = tailTrim(inputBoard2, you);
        assert.equal(
            JSON.stringify(result.snakes) === JSON.stringify(expectedSnakes2),
            true
        )
    })
    it('tailTrim - expectedSnakes3', () => {
        let result = tailTrim(inputBoard3, you);
        assert.equal(
            JSON.stringify(result.snakes) === JSON.stringify(expectedSnakes3),
            true
        )
    })
})