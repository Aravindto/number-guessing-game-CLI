import readline from "readline-sync";
import chalk from "chalk";
import { getRandomNumber,
    getTimeElapsed,
    loadHighScore,
    saveHighScore } from "./utils.js";

const difficulties = {
    1:{name: "Easy", attempts: 10},
    2:{name: "Medium", attempts: 5},
    3:{name: "Hard", attempts: 3}
}

const playGame = () => {
    console.log(chalk.green("\n🎉 Welcome to the Number Guessing Game! 🎉"));
    console.log("I'm thinking of a number between 1 and 100.");

    console.log("\nPlease select a difficulty level:");
    Object.entries(difficulties).forEach(([key, level]) => {
        console.log(`${key}. ${level.name} (${level.attempts} chances)`);
    });  
    
    let difficultyChoice = readline.questionInt("\nEnter your choice (1-3): ");
    while (![1, 2, 3].includes(difficultyChoice)) {
        difficultyChoice = readline.questionInt("Invalid choice! Enter 1, 2, or 3: ");
    }

    const difficulty = difficulties[difficultyChoice];
    console.log(chalk.blue(`\nGreat! You selected ${difficulty.name}. You have ${difficulty.attempts} chances.`));

    const secretNumber = getRandomNumber(1, 100);
    let attemptsLeft = difficulty.attempts;
    let startTime = Date.now();

    while (attemptsLeft > 0) {
        let userGuess = readline.questionInt("\nEnter your guess: ");
    
        if (userGuess === secretNumber) {
            let timeTaken = getTimeElapsed(startTime);
            console.log(chalk.green(`🎉 Congratulations! You guessed the correct number in ${difficulty.attempts - attemptsLeft + 1} attempts!`));
            console.log(chalk.yellow(`⏱️ Time taken: ${timeTaken} seconds.`));

            let highScores = loadHighScore();
            if ((difficulty.attempts - attemptsLeft + 1) < highScores[difficulty.name.toLowerCase()]) {
                console.log(chalk.cyan("🏆 New high score!"));
                highScores[difficulty.name.toLowerCase()] = difficulty.attempts - attemptsLeft + 1;
                saveHighScore(highScores);
            }
            break;
        }else{
            console.log(chalk.red(`❌ Incorrect! The number is ${userGuess > secretNumber ? "lower" : "higher"} than ${userGuess}.`));
            attemptsLeft--;
            console.log(chalk.yellow(`You have ${attemptsLeft} attempts left.`));
        }
    }

    if (attemptsLeft === 0) {
        console.log(chalk.red(`😢 Game Over! The correct number was ${secretNumber}.`));
    }

    // Replay option
    let playAgain = readline.question("\nDo you want to play again? (yes/no): ", {
        limit: ["yes", "no"],
        limitMessage: "⚠️ Invalid input! Please enter either 'yes' or 'no'."
    }).toLowerCase();
    if (playAgain === "yes") {
        playGame();
    } else {
        console.log(chalk.green("\nThanks for playing! Goodbye! 👋"));
    }

}

playGame();
