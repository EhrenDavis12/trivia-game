

$(document).ready(function () {

    setUpFirstTimeStartWindow()

    $(document).on("click", htmlDisplayHandler.displayWorld.startGame, function () {
        getQuestionsAPI();
    });

    $(document).on("click", htmlDisplayHandler.displayWorld.btnAnswerClass, function (){
        handlePlayerAnswer($(this).attr("value"));
    });

    $(".category-menu a").click(function(e){
        e.preventDefault(); // cancel the link behaviour
        var selText = $(this).text();
        $("#category").text(selText);
        htmlDisplayHandler.jumboWordsCategory();
    });

    $(".difficulty-menu a").click(function(e){
        e.preventDefault(); // cancel the link behaviour
        var selText = $(this).text();
        $("#difficulty").text(selText);
    });
});

function setUpFirstTimeStartWindow() {
    htmlDisplayHandler.mainStartView(
        $(htmlDisplayHandler.displayWorld.category).text() + messagesDictionary.jumboTitle,
        messagesDictionary.startGame);
}

function startGame() {
    htmlDisplayHandler.startQuestionsView();
    controlQuestionFlow(0);
}

function handlePlayerAnswer(chosenValue) {
    var answerIndex = $(htmlDisplayHandler.displayWorld.question).attr("value");
    if (chosenValue === answerIndex) {
        results.correctCount++;
    } else {
        results.wrongCount++;
    }
    results.totalTime += (questionRunTime - countDownNumber);
    htmlDisplayHandler.showAnswer(answerIndex, chosenValue);
    controlQuestionFlow();
}

function controlQuestionFlow(timeDelay = 1000) {
    htmlDisplayHandler.disableAllButtons();
    if (arrayOfQuestions.length > 0) {
        delayOneSecond(function () {
            setUpQuestion();
            startCountDownTimer();
            htmlDisplayHandler.enableAllButtons();
            htmlDisplayHandler.clearAnswerBoarder();
        }, timeDelay);
    } else {
        delayOneSecond(function () {
            setUpFirstTimeStartWindow();
            showResults();
            htmlDisplayHandler.enableAllButtons();
            htmlDisplayHandler.clearAnswerBoarder();
        }, timeDelay);
    }
}

function setUpQuestion() {
    var questionObj = getRandomOneTimeQuestion();
    htmlDisplayHandler.setUpQuestionView(questionObj);
}

function showResults() {
    htmlDisplayHandler.showResults();
    resetResultsCard();
}

function resetResultsCard() {
    results.correctCount = 0;
    results.wrongCount = 0;
    results.unansweredCount = 0;
    results.totalTime = 0;
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
    countDownNumber = questionRunTime;
    htmlDisplayHandler.setQuestionTimer(messagesDictionary.timeCountDown + countDownNumber);
    clearInterval(intervalId);
    intervalId = setInterval(function () {
        countDownNumber--;
        if (countDownNumber < 1) {
            results.totalTime += questionRunTime;
            results.unansweredCount++;
            controlQuestionFlow();
        }
        htmlDisplayHandler.setQuestionTimer(messagesDictionary.timeCountDown + countDownNumber);
    }, 1000);
}

function delayOneSecond(func, timeDelay) {
    clearInterval(intervalId);
    intervalId = setInterval(function () {
        clearInterval(intervalId);
        func();
    }, timeDelay);
}