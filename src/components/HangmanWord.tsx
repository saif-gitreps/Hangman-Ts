type HangmanWordProps = {
   guessedLetters: string[];
   wordToGuess: string;
};

function HangmanWord({ guessedLetters, wordToGuess }: HangmanWordProps) {
   return (
      <div className="flex gap-2 text-8xl font-bold capitalize font-mono">
         {wordToGuess.split("").map((letter, index) => (
            <span key={index} style={{ borderBottom: "1rem solid black" }}>
               <span
                  style={{
                     visibility: guessedLetters.includes(letter) ? "visible" : "hidden",
                  }}
               >
                  {letter}
               </span>
            </span>
         ))}
      </div>
   );
}

export default HangmanWord;
