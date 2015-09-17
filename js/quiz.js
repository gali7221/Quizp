$(document).ready(function(){
	generateQuestions();
	generateChoices();
	submit();
	restart();
});


var currentQuestion = 0;
var score = 0;
var guess = "";
var questions = new Array();

function Question(currentQuestion, answers, correct){
	this.currentQuestion = currentQuestion;
	this.answers = answers;
	this.correct = correct;
}

questions[0] = new Question ("Which character does not in the Comic Book version, but does appear in the TV Series?",["Daryll", "Rick", "Shane", "Andrea"], 0);
questions[1] = new Question ("Which character loses his arm in the Comic book series, but does not lose his hand in the TV Series?",["Rick", "Shane", "Glen", "Michone"], 0);
questions[2] = new Question ("Which character is considered 'Mom' to Carl in the Comic book version, but not the TV Series?",["Michonne", "Maggie", "Andrea", "Laurie",], 2);
questions[3] = new Question ("Which character died much earlier in the Comic book version versus its TV Series counterpart?",["Tyrese", "Shane", "Merle", "Daryl"], 1);
questions[4] = new Question ("Which character lasted longer in the comics and also had an affair with Andrea?",["Tyress", "Dale", "Shane", "Merle"], 1);


function generateQuestions(){
	var q = questions[currentQuestion].currentQuestion;
	$('.the_question').append('<h4>' + q + '</h4>');
}

function generateChoices(){
	var appendList = "";
	var answers = questions[currentQuestion].answers;

	for(var i=0;i<answers.length; i++){
		appendList = "<li><label><input type='radio' name='radio' class='option' value=" +i+ ">" + answers[i] + "</label></li>";
		$("#answers").append(appendList);
		appendList = "";
	}
}

function submit(){
	$('.option').click(function() { // click on one of the option
		if($("input[name='radio']").val()) { // retrieve 
			evaluate(); // evaluate the shit
		$('.option').attr('disabled',true); // disable inputs after guess. 
		}
	});
}

function evaluate(){
	// get the checked value
	var guess = $("input[name='radio']:checked").val();
	if(guess == questions[currentQuestion].correct){
		$('#correct').append("<p>Correct!</p>");
		$('#next').append("<p>Next</p>");
		nextQuestion();
		updateScore();
		currentQuestion++;
	}
	else{
		$('#incorrect').append("<p>Incorrect.</p>");
		$('#next').append("<p>Next</p>");
		$('#correct-answer').append("<p>The correct answer is" + " " + questions[currentQuestion].answers[questions[currentQuestion].correct] + "</p>");
		nextQuestion();
		currentQuestion++;
	}
}

function nextQuestion(){
	$("#next").click(function() {
		$('h4').remove();
		$('li').remove();
		$(".outcome p").remove();

		if (currentQuestion >= 5) {
			complete();
			restart();
			return;
		}
		else {
			questionNumber();
			generateQuestions();
			generateChoices();
			submit();
		}
	});
}

function questionNumber(){
	$('#question p').remove();
	$('#question').append(" " + '<p>' + (currentQuestion +1) + '/5' + '</p>');
}

function updateScore(){
	$("#score p").remove();
	score++;
	$('#score').append(" " + '<p>' + score + '</p>');
}

function complete(){
	$('.status').hide();
	$('.the_question').append("<h4>Quiz complete. You scored" + " " + score + " " + "out of 5 <br>" + "<div class='restart'><p>Restart</p></div></h4>").hide().fadeIn('400');
	$('.restart').addClass('quiz-end');
}

function restart(){
	$('.restart').click(function() {
		$('.restart').removeClass('quiz-end');
		currentQuestion = 0;
		score = -1;
		questions[0];
		$('#score').show();
		$('#question').show();
		$('h4').remove();
		$('li').remove();
		$(".outcome p").remove();
		questionNumber();
		generateQuestions();
		generateChoices();
		submit();
		updateScore();
		$('.status').show();
	});
}