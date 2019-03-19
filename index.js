let questionNumber = 0;
let score = 0;

function generateQuestion() {
	if (questionNumber < STORE.length) {
	return ` 
	<div class= "questionForm">
	<h2>${STORE[questionNumber].question}</h2>
	<form>
		<fieldset>
			<label class="answerOption">
				<input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
				<span>${STORE[questionNumber].answers[0]}</span>
			</label>
			<label class ="answerOption">
				<input type= "radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
				<span>${STORE[questionNumber].answers[1]}</span>
			</label>
			<label class ="answerOption">
				<input type= "radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
				<span>${STORE[questionNumber].answers[2]}</span>
			</label>
			<label class ="answerOption">
				<input type= "radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
				<span>${STORE[questionNumber].answers[3]}</span>
			</label>
			<button type="submit" class="submitButton">Submit</button>
		</fieldset>
	</form>
	</div>
	`;
	} else {
		renderResults();
		restartQuiz();
	}
}


function startButton() {
	$('.quizStart').on('click', '.startButton', function (event) {
		$('.quizStart').remove();
		$('.questionAnswerForm').css('display', 'block');
		$('.questionNumber').text(1);
  });
} 

function renderQuestion() {
	$('.questionAnswerForm').html(generateQuestion());
}

function incrementQuestion() {
	questionNumber++;
}

function incrementScore() {
	score++;
}

function changeScore () {
	incrementScore();
	$('.scores').text(score);
}

function submitAnswer() {
		$('form').on('submit', function (event) {
		  event.preventDefault();
		  let selected = $('input:checked');
		  let answer = selected.val();
		  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
		  if (answer === correctAnswer) {
			correctFeedback();
			changeScore();
			incrementQuestion();
			} else {
			wrongFeedback();
			incrementQuestion();
			}
		});
	  }

function correctFeedback() {
	$('.questionAnswerForm').html(`<div class = "correctFeedback"><img src = 
	"${STORE[questionNumber].icon}" class = "correctImg"><p>The answer was correct!</p>
	<button type=button class="nextButton">Onward!</button>
	</div> `);
}

function wrongFeedback(){
	$('.questionAnswerForm').html(`<div class = "wrongFeedback"><img src = 
	"${STORE[questionNumber].icon}" class = "correctImg"><p>The answer was 
	${STORE[questionNumber].correctAnswer}</p>
	<button type=button class="nextButton">Onward!</button>
	</div> `);
}

function nextButton() {
	$('main').on('click', '.nextButton', function(event) {
		renderQuestion();
		submitAnswer();
		if (questionNumber < STORE.length) {
			$('.questionNumber').text(questionNumber+1);
		} else {
			$('.questionNumber').text(7);
		}
    //This function is responsible for handling the next button.
    console.log('`nextButton`, ran')
});
}

function renderResults() {
	if (score < 7){
		$('.questionAnswerForm').html(`<div class= "results"><h1>
		Play again and try to get all the answers correct!</h1>
		<p>Your score is ${score} / 7</p><button class = "restartButton">
		Restart?</button></div>`);
	} else {
		$('.questionAnswerForm').html(`<div class= "results"><h1>
		Good job you got it all correct!</h1>
		<p>Your score is ${score} / 7</p><button class = "restartButton">
		Restart?</button></div>`);
	}
}

function restartQuiz(){
	$('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
    //This function is responsible for restarting the quiz when pressing button.
    console.log('`restartQuiz`, ran')
}

function handleQuiz() {
	startButton();
	renderQuestion();
	submitAnswer();
	nextButton();
}

$(handleQuiz);