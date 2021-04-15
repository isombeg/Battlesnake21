const decisionDispatcher = require('../dispatcher').dispatcher;

exports.handleIndex = (request, response) => {
    console.log('INDEX');
    const battlesnakeInfo = {
        apiversion: '1',
        author: '',
        color: '#8BFCFF',
        head: 'gamer',
        tail: 'mouse'
    }
    response.status(200).json(battlesnakeInfo)
}

exports.handleStart = (request, response) => {
    const gameData = request.body

    console.log('START')
    response.status(200).send('ok')
}

exports.handleMove = (request, response) => {
    const gameData = request.body
    const move = decisionDispatcher(
        gameData.game,
        gameData.turn,
        gameData.board,
        gameData.you
    )

    console.log('MOVE: ' + move)
    response.status(200).send({
        move: move
    })
}

exports.handleEnd = (request, response) => {
    const gameData = request.body

    console.log('END')
    response.status(200).send('ok')
}