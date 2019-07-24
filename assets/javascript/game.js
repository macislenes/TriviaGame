// when you click start the game is initialized you want to hide everything on the page except the divs you want to show
// after the game starts a timer ticks down on the screen
// a question is presented with 4 possible answers
// a user can click on an answer triggering an on-click function
    // a) the computer checks the users response to the stored answers
        // ... if the answer is correct a timed screen displays an image with the text saying your correct
        // ... if the answer is incorrect the timed screen displays an image with the text saying your guess was incorrect as well as give the correct answer
// at the end of the game your correct and incorrect answers are displayed on the screen with a [start over] button

var timerNumber = 30;

var intervalId;

var running = false;

var questionCounter = 0;

var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;

var currentQuestion;

var questions = [
    {
        questionText: "Which house does Harry Potter belong to?",
        options: ["Slytherin", "Gryffindor", "Hufflepuff", "Ravenclaw"],
        correctOption: 1,
        image: "assets/images/gryffindor.gif"
    },
    {
        questionText: "How old was Nicholas Flamel, when he decided to destroy the Philosopher's Stone",
        options: ["789", "532", "665", "934"],
        correctOption: 2,
        image: "assets/images/amused.gif"
    },
    {
        questionText: "How many staircases does Hogwarts have?",
        options: ["142", "145", "167", "203"],
        correctOption: 0,
        image: "assets/images/notBad.gif"
    },
    {
        questionText: "What food does Harry smell in the love potion Amortencia?",
        options: ["Lemon Drops", "Hagrid's Rock Cakes", "Cockroach Clusters", "Treacle Tart"],
        correctOption: 3,
        image: "assets/images/food.gif"
    },
    {
        questionText: "Who won the 'House Cup' in 'Philosopher's Stone?",
        options: ["Ravenclaw", "Hufflepuff", "Gryffindor", "Slytherin"],
        correctOption: 2,
        image: "assets/images/really.gif"
    },
    {
        questionText: "What did Harry give to dobby to set him free?",
        options: ["Hat", "Shoes", "Sock", "Tie"],
        correctOption: 2,
        image: "assets/images/sock.gif"
    }
];


function initialize(){
    $("#timerDiv, #questionsPage, #answerPage, #startOverButtonDiv").hide();
};

function gameStart(){
    if(questionCounter == questions.length )
    {
        // todo: add the gameEnd function and call it 
        gameEnd();
        return;
    };
    if(running === false){
        // this sets a new interval to call out the decrement function for every 1 second
        intervalId = setInterval(decrement, 1000);
        // setting the running value to true
        running = true;
        timerNumber = 30;
        $("#timeSpan").text(timerNumber + " seconds");
        $("#timerDiv, #questionsPage").show();
        $("#answerPage").hide();
    };
    // question is generated and displayed
    // answers are generated and displayed
    // storing the value of currentQuestion for the rest of the game
    currentQuestion = questions[questionCounter];

    $("#triviaQuestion").text(currentQuestion.questionText);

    for(var i = 0; i < currentQuestion.options.length; i++){

        $("#" + i).text(currentQuestion.options[i]);

    };  
    questionCounter++;
    console.log(questionCounter);
    // if questionsCounter > the number of questions it will return undefined
};

$(".answerSelection").on("click", function(){
    
    var onClickValue = Number($(this).attr("id"));
    console.log(onClickValue);
    // we need to change the index to questionCounter -1 in order to compensate for the game value on gameStart()
    if(onClickValue == currentQuestion.correctOption){
        correctAnswers++;
        $("#answerAlert").text("Correct!");
    }
    else{
        incorrectAnswers++;
        $("#answerAlert").text("Incorrect!");
    }

    displayAnswer();
});

function variableValueReset(){
    questionCounter = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    unanswered = 0;
};

function gameEnd(){
    stop();
    $("#triviaQuestion").text("Here is how you scored:");
    $("#0").text("Correct Answers: " + correctAnswers);
    $("#1").text("Incorrect Answers: " + incorrectAnswers);
    $("#2").text("Unanswered Qustions: " + unanswered);
    $("#3").html("<img src=\"assets/images/wellDone.gif\">");
    $("#answerPage").hide();
    $("#timerDiv, #questionsPage, #startOverButtonDiv" ).show();
    variableValueReset();
};

function displayAnswer(){
    // the questions page will be hidden
    $("#questionsPage").hide();
    // The answerPage will display
    $("#answerPage").show();
    // stop the timerInterval on screen and in the background
    stop();
    // time the page is on the screen for
    // a settimeout function starts counting in the background leaving this screen on for that set amout of time and moving onto the next page after its done
    setTimeout(gameStart, 5000);
    // The answer will fill in the correctAnswer div
    // the currentQuestions is the structure that contains options and correct options
    $("#correctAnswer").text(currentQuestion.options[currentQuestion.correctOption]);
    // A picture will fill the empty pictureDiv
    $("#imageTag").attr("src", currentQuestion.image);
};

function decrement(){
    timerNumber--;
    $("#timeSpan").text(timerNumber + " seconds");
    // when the timer reaches zero
    if(timerNumber === 0){
        unanswered++;
        $("#answerAlert").text("Took Too Long!");
        // The "Times Up" will display in the timeSpan
        $("#timeSpan").text("TIMES UP!");
        // Good practice to call the function at the end of the statement
        displayAnswer();
    }
};

function stop(){
    clearInterval(intervalId);
    running = false;
};

$("#startButtonDiv, #startOverButtonDiv").on("click", function(){
    $("#startButtonDiv").hide();
    $("#startOverButtonDiv").hide();
    initialize();
    gameStart();
});

initialize();







