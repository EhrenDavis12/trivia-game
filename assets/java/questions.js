
function getQuestionsAPI() {
    $(htmlDisplayHandler.displayWorldRow.startGameRow).hide();
    /* $.ajax({
        url: "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple",
        method: "GET"
    }).then(function (response) {
        populateQuestionsArray(response.results);
        $(displayWorldRow.startGameRow).show();
        console.log(response.results);
    }); */

    var runSampleResult = getSample();
    populateQuestionsArray(runSampleResult.results);
    $(htmlDisplayHandler.displayWorldRow.startGameRow).show();
}


function getSample (){
    let sample = {
        "response_code": 0,
        "results": [
            {
                "category": "Mythology",
                "type": "multiple",
                "difficulty": "easy",
                "question": "The ancient roman &quot;god&quot; of war was commonly known as...",
                "correct_answer": "Mars",
                "incorrect_answers": [
                    "Jupiter",
                    "Juno",
                    "Ares"
                ]
            },
            {
                "category": "Mythology",
                "type": "multiple",
                "difficulty": "easy",
                "question": "Who in Greek mythology, who&#039;s led the Argonauts in search of the Golden Fleece?",
                "correct_answer": "Jason",
                "incorrect_answers": [
                    "Castor",
                    "Daedalus",
                    "Odysseus"
                ]
            }
        ]
    }
    return sample;
}


var arrayOfQuestions = [];
function populateQuestionsArray(apiResult) {
    arrayOfQuestions = [];
    apiResult.forEach(element => {
        var scrambledArray = getRandomizedOptions(element.correct_answer, element.incorrect_answers);
        arrayOfQuestions.push(setUpSingleQuestion(element.question, scrambledArray));
    });
}

function getRandomizedOptions(correct_answer, incorrect_answers) {
    var rand = randomNumber(0, 4);
    var options = incorrect_answers;
    options.splice(rand, 0, correct_answer);
    options.push(parseInt(rand));
    return options;
}

function setUpSingleQuestion(question, scrambledAnswers){
    return question = {
        question: cleanStringHTML(question),
        option: scrambledAnswers,
        answer: (scrambledAnswers[4] + 1)
    };
}

function cleanStringHTML(word) {

    word = word.replace(/&#039;/g, "\'");
    word = word.replace(/&quot;/g, "\"");
    word = word.replace(/&apos;/g, "\'");
    word = word.replace(/&amp;/g, "&");
    word = word.replace(/&lt;/g, "<");
    word = word.replace(/&gt;/g, ">");
    word = word.replace(/&nbsp;/g, " ");

    return word;
}