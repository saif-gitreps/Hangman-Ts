import { useState, useEffect, useCallback } from "react";
import words from "./WordList.json";
import { HangmanWord, HangmanDrawing, Keyboard } from "./components";

function App() {
   const [wordToGuess, setWordToGuess] = useState<{
      word: string;
      hint: string;
   }>(() => words[Math.floor(Math.random() * words.length)]);
   const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
   const incorrectLetters: string[] = guessedLetters.filter(
      (letter) => !wordToGuess.word.includes(letter)
   );

   const isLoser: boolean = incorrectLetters.length >= 8;
   const checkWinner = (): boolean => {
      let count = 0;
      wordToGuess.word
         .split("")
         .forEach((letter) => (guessedLetters.includes(letter) ? count++ : null));

      return count === wordToGuess.word.length;
   };
   const isWinner: boolean = checkWinner();

   const addGuessedLetter = useCallback(
      (letter: string) => {
         if (guessedLetters.includes(letter) || isLoser || isWinner) return;
         setGuessedLetters((prev) => [...prev, letter]);
      },
      [guessedLetters, isLoser, isWinner]
   );

   useEffect(() => {
      const handler = (e: KeyboardEvent) => {
         const key = e.key;
         if (!key.match(/[a-zA-Z]/i)) return;

         e.preventDefault();
         addGuessedLetter(key.toLowerCase());
      };

      document.addEventListener("keypress", handler);
      return () => document.removeEventListener("keypress", handler);
   }, [guessedLetters, addGuessedLetter]);

   useEffect(() => {
      const handler = (e: KeyboardEvent) => {
         const key = e.key;
         if (key != "Enter") return;

         e.preventDefault();
         reset();
      };

      document.addEventListener("keypress", handler);
      return () => document.removeEventListener("keypress", handler);
   }, []);

   const reset = (): void => {
      setGuessedLetters([]);
      setWordToGuess(() => words[Math.floor(Math.random() * words.length)]);
   };

   return (
      <div className="max-w-5xl flex flex-col gap-8 my-0 mx-auto items-center bg-black">
         <div className="text-xl 2xl:text-2xl font-bold text-center text-white">
            {wordToGuess.hint && <h1>hint: {wordToGuess.hint}</h1>}
            {isLoser && <h1 className="text-red-500">loser!</h1>}
            {isWinner && <h1 className="text-green-500">winner!</h1>}
         </div>
         <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
         <HangmanWord
            reveal={isLoser}
            guessedLetters={guessedLetters}
            wordToGuess={wordToGuess.word}
         />
         <Keyboard
            disabled={isWinner || isLoser}
            activeLetters={guessedLetters.filter((letter) =>
               wordToGuess.word.includes(letter)
            )}
            inactiveLetters={incorrectLetters}
            addGuessedLetter={addGuessedLetter}
            reset={reset}
         />
      </div>
   );
}

export default App;
