

$(document).ready(setUpFirstTimeStartWindow());

$(document).on("click", displayWorld.startGame, function () {
    startGame();
});

$(document).on("click", displayWorld.btnAnswerClass, function () {
    if ($(this).attr("value") === $(displayWorld.question).attr("value")) {
        alert("correct");
    } else {
        alert("wrong");
    }
    setUpQuestion();
});

function setUpFirstTimeStartWindow() {
    hideAllGameElements();
    $(displayWorld.jumboWords).text(messagesDictionary.jumboTitle);
    $(displayWorld.startGame).text(messagesDictionary.startGame);
    $(displayWorldRow.startGameRow).show();
    getQuestionsAPI();

}

function hideAllGameElements() {
    $.each(displayWorldRow, function (key, value) {
        $(value).hide();
    });
}

function startGame() {
    $(displayWorldRow.startGameRow).hide();
    setUpQuestion();
    $(displayWorldRow.questionTimerRow).show();
    $(displayWorldRow.questionRow).show();
    $(displayWorldRow.optionsGroup).show();
}

function setUpQuestion() {
    var questionObj = getRandomOneTimeQuestion();
    $(displayWorld.question).text(questionObj.question);
    $(displayWorld.question).attr("value", questionObj.answer);
    $(displayWorld.option1).text(questionObj.option1);
    $(displayWorld.option2).text(questionObj.option2);
    $(displayWorld.option3).text(questionObj.option3);
    $(displayWorld.option4).text(questionObj.option4);
    startCountDownTimer();
}

function getRandomOneTimeQuestion() {
    var rand = randomNumber(0, arrayOfQuestions.length);
    var question = arrayOfQuestions[rand];
    arrayOfQuestions.splice(rand, 1);
    return question;
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function startCountDownTimer() {
    countDownNumber = 20;
    $(displayWorld.questionTimer).text(messagesDictionary.timeCountDown + countDownNumber);
    clearInterval(intervalId);
    intervalId = setInterval(function () {
        countDownNumber--;
        if (countDownNumber < 1) {
            alert("done");
            setUpQuestion();
        }
        $(displayWorld.questionTimer).text(messagesDictionary.timeCountDown + countDownNumber);
    }, 1000);
}