import { useState } from "react";
import words from "./WordList.json";
import { HangmanWord, HangmanDrawing, Keyboard } from "./components";

function App() {
   const [wordToGuess, setWordToGuess] = useState(
      () => words[Math.floor(Math.random() * words.length)]
   );
   const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
   const incorrectLetters = guessedLetters.filter(
      (letter) => !wordToGuess.includes(letter)
   );

   return (
      <div className="max-w-8xl h-screen flex flex-col gap-8 my-0 mx-auto items-center">
         <div className="text-xl text-center">Lose win</div>
         <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
         <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
         <Keyboard />
      </div>
   );
}

export default App;
