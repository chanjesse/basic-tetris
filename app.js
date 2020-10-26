document.addEventListener('DOMContentLoaded', () => {
  //talks to the grid element in the html file
  const grid = document.querySelector('.grid')

  //to have js talk to all 200 squares
  let squares = Array.from(document.querySelectorAll('.grid div'))

  //connects to html's ID of "score"
  const ScoreDisplay = document.querySelector('#score')

  //connects to html's ID of "start-button"
  const StartBtn = document.querySelector('#start-button')

  const width = 10
})
