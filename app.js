// Declaing my variables

var panel = $('#quiz-area');
var countStartNumber = 20;


// hereclick function

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">20</span> Seconds</h2>');
  game.loadQuestion();
});


// questions 

var questions = [{
  question: "In what country was the ceasar salad invented?",
  answers: ["Germany", "Greece", "Mexico", "Italy"],
  correctAnswer: "Mexico",
  
}, {
  question: "What continent is subjected to the worlds largest ozone hole?",
  answers: ["Antartica", "North America", "Asia", "Africa"],
  correctAnswer: "Antartica",

}, {
  question: "What is the first organism to grow back after fire?",
  answers: ["Mold", "Moss", "Grass", "Trees"],
  correctAnswer: "Moss",
  
}, {
  question: 'Which technological innovation was once famously belived to be a April Fools Day prank?',
  answers: ["Microsoft Windows", "The internet", "Bluetooth", "Gmail"],
  correctAnswer: "Gmail",
  
}, {
  question: 'Where was the graveyard located where Lord Voldermot made his return?',
  answers: ["Little Hangleton", "Godric's Hollow", "Azkaban", "Hogwarts School"],
  correctAnswer: "Little Hangleton",
  
}, {
  question: 'Which president is on the United States 1,000 dollar bill',
  answers: ["John F Kennedey", "Gerald Ford", "Bill Clinton", "Grover Cleveland"],
  correctAnswer: "Grover Cleveland",
  
}, {
  question: "Red Stripe is a popular beer brand that originates from which country?",
  answers: ["United States", "Venezuela", "Haiti", "Jamaica"],
  correctAnswer: "Jamaica",

}, {
  question: "Snoopy, from 'Peanuts', is what type of dog?" ,
  answers: ["Beagle", "Pug", "Poodle", "Dalmatian"],
  correctAnswer: "Beagle",

}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    
    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 2 * 1000);
    } else {
      setTimeout(game.nextQuestion, 2 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};