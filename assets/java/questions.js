
function getQuestionsAPI() {
    $(htmlDisplayHandler.displayWorldRow.startGameRow).hide();
    var category = mapCategory($("#category").text());
    var difficulty = mapDifficulty($("#difficulty").text());
    var callURL = "https://opentdb.com/api.php?amount=10&category="+category+"&difficulty="+difficulty+"&type=multiple";
    $.ajax({
        /* url: "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple", */
        url: callURL,
        method: "GET"
    }).then(function (response) {
        populateQuestionsArray(response.results);
        startGame();
        console.log(response.results);
    });

    /* var runSampleResult = getSample();
    populateQuestionsArray(runSampleResult.results); 
    startGame();*/
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

function mapCategory(category){
    if (category === "Mythology")
        return "20";
    else if (category === "History")
        return "23";
    else if (category === "Geography")
        return "22";
    return "20";
}

function mapDifficulty(difficulty){
    if (difficulty === "Easy")
        return "easy";
    else if (difficulty === "Medium")
        return "medium";
    else if (difficulty === "Hard")
        return "hard";
    return "easy";
}