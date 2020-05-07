//Assign question number
const questionNumberSpan=document.querySelector(".question-num-value");
const totalQuestionSpan=document.querySelector(".total-question");

const options=document.querySelector(".options").children;
const answerTrackerContainer=document.querySelector(".answers-tracker");
//declare and assign question
const question= document.querySelector(".question");

//correct answer tracker
const correctAnswerSpan=document.querySelector(".correct-answers");
const totalQuestionSpan2=document.querySelector(".total-question2");
const percentage=document.querySelector(".percentage");
//assign buttons
const op1=document.querySelector(".option1");
const op2=document.querySelector(".option2");
const op3=document.querySelector(".option3");



//define some variables
let questionIndex=0;
let index=0;
let myArray=[];
let myArr=[];
let score=0;

//populate questions, options and answers
const questions=[
    {
        q:'Which is heavier:a kilo of gold or a kilo of feathers?',
        options:['Gold','Feathers','They are the same'],
        answer:2
    }, 
    {
        q:'Which one of these things is not like the other?',
        options:['Cat and lion','Man and machine','Mouse and rat'],
        answer:1
    }, 
    {
        q:'Two fathers and two sons go fishing. Each catches a fish, but only three fishes are caught. How?',
        options:['One fish got away','There were only three people fishing','One fish was released & caught again by someone else'],
        answer:1
    }, 
    {
        q:'I am not a toy, though many use me for pleasure. I have a butt but i cannot poop. What am I?',
        options:['Motorcycle','Facebook','Cigarette'],
        answer:2
    }, 
    {
        q:'What Would happen if you were on a train going just under the speed of light and you started to run?',
        options: ['No one knows','Trains cannot go at the speed of light','Time would slow down'],
        answer:2
    } 
]


totalQuestionSpan.innerHTML=questions.length; 
function load(){ //to load question and options
    questionNumberSpan.innerHTML=index+1;
    question.innerHTML=questions[questionIndex].q; //On page load, display first question
    op1.innerHTML=questions[questionIndex].options[0]; //Display first option
    op2.innerHTML=questions[questionIndex].options[1]; //Display Second option
    op3.innerHTML=questions[questionIndex].options[2]; //Display Second option
    index++;
}
function check(element){
    if (element.id==questions[questionIndex].answer) { //compare index of clicked selection & answer index
        element.classList.add("correct");
        updateAnswerTracker("correct")
        score++;
        console.log("score"+score);
    }
    else{ element.classList.add("wrong");
    updateAnswerTracker("wrong")
    }
    disabledOptions() //If user selects one option disable other options
}

function disabledOptions(){
    for (let i=0; i<options.length; i++){
        options[i].classList.add ("disabled");
        if(options[i].id==questions[questionIndex].answer){
            options[i].classList.add("correct");
        }
    }

}

function enableOptions(){
    for (let i=0; i<options.length; i++){
        options[i].classList.remove("disabled", "correct", "wrong");    
    }
}


function validate(){ //Check if an  answer option is picked
        if(!options[0].classList.contains('disabled')){
            alert("Please Select One Option")
        }
        else {
            randomQuestion();
            enableOptions();
        }
}

function next(){ //move to next question
        validate();
    }

function randomQuestion() { //randomize question displayed 
    let randomNumber=Math.floor(Math.random()*questions.length);
    let hitDuplicate=0;
    if(index==questions.length){
        quizOver();
    }
    else{
        if(myArray.length>0){
            for(let i=0; i<myArray.length; i++){
                if(myArray[i]==randomNumber){
                    hitDuplicate=1;
                    break;
                }
            }
           if (hitDuplicate==1){
               randomQuestion();
           }
           else {
            questionIndex=randomNumber;
            myArr.push(questionIndex);
            load();
           }
        }
        if(myArray.length==0){
            questionIndex=randomNumber;
            load();
            myArr.push(questionIndex);
        }
        
        myArray.push(randomNumber);   
    }
}

function answerTracker(){ // create answer tracker for questions answered
    for(let i=0; i<questions.length; i++){
        const div=document.createElement("div")
        answerTrackerContainer.appendChild(div);
    }
}

function updateAnswerTracker(classNam){ // update answer tracker
        answerTrackerContainer.children[index-1].classList.add(classNam);
}

function quizOver(){ // results page
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswerSpan.innerHTML=score;
    totalQuestionSpan2.innerHTML=questions.length;
    percentage.innerHTML= (score/questions.length)*100 + "%";
}
function tryAgain(){ // to reset quiz
    window.location.reload();
}


window.onload=function(){ //run function on page load
    randomQuestion();
    answerTracker();
}
