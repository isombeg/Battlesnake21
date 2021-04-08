const decisionDispatcher = require('../dispatcher').dispatcher;

exports.handleIndex = (request, response) => {
    console.log('INDEX');
    let battlesnakeInfo = {
        apiversion: '1',
        author: '',
        color: '#888888',
        head: 'default',
        tail: 'default'
    }
    response.status(200).json(battlesnakeInfo)
}

exports.handleStart = (request, response) => {
    let gameData = request.body

    console.log('START')
    response.status(200).send('ok')
}

exports.handleMove = (request, response) => {
    let gameData = request.body
    let move = decisionDispatcher(
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
    let gameData = request.body

    console.log('END')
    response.status(200).send('ok')
}