
var htmlDisplayHandler = {
    displayWorld: {
        jumboWords: ".jumboWords",
        startGame: "#startGame",
        category: "#category",
        difficulty: "#difficulty",
        questionTimer: "#questionTimer",
        resultCard: "#statCard",
        totalTime: "#totalTime",
        questionsRightResult: "#questionsRightResult",
        questionsWrongResult: "#questionsWrongResult",
        questionsUnansweredResult: "#questionsUnansweredResult",
        question: "#question",
        btnAnswerClass: ".option",
        option1: "#option1",
        option2: "#option2",
        option3: "#option3",
        option4: "#option4",
        options: [
            "#option1",
            "#option2",
            "#option3",
            "#option4"
        ]
    },

    displayWorldRow: {
        startGameRow: "#startGame-row",
        startGameOptionsRow: "#startGameOptions-row",
        resultCard: "#statCard",
        questionTimerRow: "#questionTimer-row",
        questionRow: "#question-row",
        optionsGroup: "#optionsGroup"
    },

    mainStartView: function (jumboTitle, startMessage) {
        htmlDisplayHandler.hideGameElements();
        htmlDisplayHandler.jumboWordsCategory();
        $(htmlDisplayHandler.displayWorld.startGame).text(startMessage);

        $(htmlDisplayHandler.displayWorldRow.startGameRow).show();
        $(htmlDisplayHandler.displayWorldRow.startGameOptionsRow).show();
        $('body').css('background-image', 'url(./assets/worldImages/woldBkg.jpg)');
    },

    jumboWordsCategory: function (){
        $(htmlDisplayHandler.displayWorld.jumboWords).text(
            $(htmlDisplayHandler.displayWorld.category).text() + messagesDictionary.jumboTitle
        );
    },

    startQuestionsView: function () {
        $(htmlDisplayHandler.displayWorldRow.startGameRow).hide();
        $(htmlDisplayHandler.displayWorldRow.startGameOptionsRow).hide();
        $(htmlDisplayHandler.displayWorldRow.resultCard).hide();
        $(htmlDisplayHandler.displayWorldRow.questionTimerRow).show();
        $(htmlDisplayHandler.displayWorldRow.questionRow).show();
        $(htmlDisplayHandler.displayWorldRow.optionsGroup).show();
    },

    setUpQuestionView: function (questionObj) {
        $(htmlDisplayHandler.displayWorld.question).text(questionObj.question);
        $(htmlDisplayHandler.displayWorld.question).attr("value", questionObj.answer);
        $.each(questionObj.option, function (key, value) {
            $(htmlDisplayHandler.displayWorld.options[key]).text(value);
        });
    },

    hideGameElements: function () {
        $.each(htmlDisplayHandler.displayWorldRow, function (key, value) {
            $(value).hide();
        });
    },

    showResults: function () {
        $(htmlDisplayHandler.displayWorld.questionsRightResult).text(messagesDictionary.cardCorrectCount + results.correctCount);
        $(htmlDisplayHandler.displayWorld.questionsWrongResult).text(messagesDictionary.cardWrongCount + results.wrongCount);
        $(htmlDisplayHandler.displayWorld.questionsUnansweredResult).text(messagesDictionary.cardUnAnsweredCount + results.unansweredCount);
        $(htmlDisplayHandler.displayWorld.totalTime).text(messagesDictionary.cardTotalTime + results.totalTime);
        $(htmlDisplayHandler.displayWorldRow.resultCard).show();
    },

    setQuestionTimer: function (timeMessage) {
        $(htmlDisplayHandler.displayWorld.questionTimer).text(timeMessage);
    },

    disableAllButtons: function () {
        $(htmlDisplayHandler.displayWorld.btnAnswerClass).prop('disabled', true);
        $(htmlDisplayHandler.displayWorld.startGame).prop('disabled', true);
    },

    enableAllButtons: function () {
        $(htmlDisplayHandler.displayWorld.btnAnswerClass).prop('disabled', false);
        $(htmlDisplayHandler.displayWorld.startGame).prop('disabled', false);
    },

    showAnswer: function (rightAnswerIndex, chosenAnswerIndex) {
        $(htmlDisplayHandler.displayWorld.options[rightAnswerIndex - 1]).css('border-color', "var(--rightAnswer)");
        if (chosenAnswerIndex !== rightAnswerIndex) {
            $(htmlDisplayHandler.displayWorld.options[chosenAnswerIndex - 1]).css('border-color', "var(--wrongAnswer)");
        }

    },

    clearAnswerBoarder: function () {
        $.each(htmlDisplayHandler.displayWorld.options, function (key, value) {
            $(value).css('border-color', "var(--borderColor)");
        });
    }
}