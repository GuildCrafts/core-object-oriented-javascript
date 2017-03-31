// Create Questions
var questions = [
  new Question("Who was the first President of the United States?", ["George Washington", "Thomas Jefferson"], "George Washington"),
  new Question("What is the answer to the Ultimate Question of Life, the Universe, and Everything?", ["Pi", "42"], "42"),
  new Question("What is Sally's Favorite Color?", ["Rainbow", "Plaid"], "Rainbow")
];

// Create quiz
var quiz = new Quiz(questions);

// Display Quiz
QuizUI.displayNext();
