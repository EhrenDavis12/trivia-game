var displayWorld = {
    jumboWords: ".jumboWords",
    startGame: "#startGame",
    questionsRightResult: "#questionsRightResult",
    questionsWrongResult: "#questionsWrongResult",
    questionsUnansweredResult: "#questionsUnansweredResult",
    questionTimer: "#questionTimer",
    question: "#question",
    btnAnswerClass: ".option",
    option1: "#option1",
    option2: "#option2",
    option3: "#option3",
    option4: "#option4",
}

var displayWorldRow = {
    startGameRow: "#startGame-row",
    questionsRightResultRow: "#questionsRightResult-row",
    questionsWrongResultRow: "#questionsWrongResult-row",
    questionsUnansweredResultRow: "#questionsUnansweredResult-row",
    questionTimerRow: "#questionTimer-row",
    questionRow: "#question-row",
    optionsGroup: "#optionsGroup"
}

var messagesDictionary = {
    jumboTitle: "Space Trivia!",
    startGame: "Click to start your game!",
    selectCharacter: "Seconds on the clock: ",
    questionsRight: "Questions answered correctly: ",
    questionsWrong: "Questions answered incorrectly",
    questionsUnanswered: "Questions unanswered",
    timeCountDown: "Seconds Remaining: "

}

var countDownNumber;
var intervalId = 0;
