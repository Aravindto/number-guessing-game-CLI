import fs from "fs";

const HIGH_SCORE_FILE = "highscore.json";

export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getTimeElapsed = (startTime) => {
    return ((Date.now() - startTime) / 1000).toFixed(2);
}

export const loadHighScore = () => {
    try {
        if (!fs.existsSync(HIGH_SCORE_FILE)) {
            // Create the file with default values if it doesn't exist
            saveHighScore({ easy: 999, medium: 999, hard: 999 });
        }
        const data = fs.readFileSync(HIGH_SCORE_FILE, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading high score file:", error);
        return { easy: 999, medium: 999, hard: 999 };
    }
}

export const saveHighScore = (highScores) => {
    try {
        fs.writeFileSync(HIGH_SCORE_FILE, JSON.stringify(highScores, null, 2));
    } catch (error) {
        console.error("Error saving high scores:", error);
    }
}