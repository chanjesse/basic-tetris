document.addEventListener('DOMContentLoaded', () => {
  //talks to the grid element in the html file
  const grid = document.querySelector('.grid')

  //to have js talk to all 200 squares
  let squares = Array.from(document.querySelectorAll('.grid div'))

  //connects to html's ID of "score"
  const scoreDisplay = document.querySelector('#score')

  //connects to html's ID of "start-button"
  const startBtn = document.querySelector('#start-button')

  let nextRandom = 0
  const width = 10
  let timerId



  //The Tetrominoes
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1]
  ]

  const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
  ]

  const oTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
  ]

  const iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0

  // randomly select a tetromino and its first rotation
  let random = Math.floor(Math.random()*theTetrominoes.length)

  let current = theTetrominoes[random][currentRotation]

  // draw the Tetromino
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
    })
  }

  // undraw the Tetrominoes
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }

  // make the tetromino move down every second
  // timerId = setInterval(moveDown, 500)

  // assign functions to keyCodes
  function control(e) {
    if(e.keyCode === 37) {
      moveLeft()
    } else if (e.keyCode === 38) {
      rotate()
    } else if(e.keyCode === 39) {
      moveRight()
    } else if(e.keyCode === 40) {
      moveDown()
    }
  }
  //could use keyup as well
  document.addEventListener('keydown', control)

  //move down function
  function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  //freeze function
  function freeze() {
    // if tetromino hits taken, then begin adding taken tag to the board
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))

      random = nextRandom
      //start a new tetromino falling
      nextRandom = Math.floor(Math.random() * theTetrominoes.length)
      current = theTetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
    }
  }

  // move the tetromino left, unless is at the edge or there is a blockage
  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

    // if not at left edge, then can move
    if(!isAtLeftEdge) currentPosition -=1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1
    }

    draw()
  }

  // move the tetromino right, unless is at the edge or there is a blockage
  function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)

    if(!isAtRightEdge) currentPosition +=1

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -=1
    }

    draw()
  }

  // rotate the tetromino
  function rotate() {
    undraw()
    currentRotation ++
    // if the current rotation gets to 4, make it go back to 0
    if(currentRotation === current.length) {
      currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    draw()

  }

  // show up-next tetromino
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  let displayIndex = 0


  // the Tetrominos without rotations
  const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
  ]

  // display the shape in the mini-grid display
  function displayShape() {
    // remove any trace of a tetromino from the entire grid
    displaySquares.forEach(square => {
      square.classList.remove('tetromino')
    })
    upNextTetrominoes[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
    })
  }

  // add functionality to the button
  startBtn.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random()*theTetrominoes.length)
      displayShape()
    }
  })



})
