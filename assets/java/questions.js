
function getQuestionsAPI() {
    $.ajax({
        url: "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple",
        method: "GET"
    }).then(function (response) {
        populateQuestionsArray(response.results);
        console.log(response.results);
    });
}


var sample = {
    "response_code": 0,
    "results": [
        {
            "category": "Mythology",
            "type": "multiple",
            "difficulty": "easy",
            "question": "The ancient roman god of war was commonly known as...",
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
            "question": "Who in Greek mythology, who led the Argonauts in search of the Golden Fleece?",
            "correct_answer": "Jason",
            "incorrect_answers": [
                "Castor",
                "Daedalus",
                "Odysseus"
            ]
        }
    ]
}

var arrayOfQuestions = [];
function populateQuestionsArray(apiResult) {
    apiResult.forEach(element => {

        var scrambledArray = getRandomizedOptions(element.correct_answer, element.incorrect_answers);

        question = {
            question: element.question,
            option1: scrambledArray[0],
            option2: scrambledArray[1],
            option3: scrambledArray[2],
            option4: scrambledArray[3],
            answer: (scrambledArray[4] + 1)
        };
        arrayOfQuestions.push(question);
    });
}

function getRandomizedOptions(correct_answer, incorrect_answers){
    var rand = randomNumber(0,4);
    
    incorrect_answers.splice(rand, 0, correct_answer);

    incorrect_answers.push(parseInt(rand));

    return incorrect_answers;
}

