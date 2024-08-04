type HangmanWordProps = {
   reveal?: boolean;
   guessedLetters: string[];
   wordToGuess: string;
};

function HangmanWord({ reveal = false, guessedLetters, wordToGuess }: HangmanWordProps) {
   return (
      <div className="flex gap-2 text-8xl font-bold capitalize font-mono text-white">
         {wordToGuess.split("").map((letter, index) => (
            <span key={index} style={{ borderBottom: "1rem solid white" }}>
               <span
                  style={{
                     visibility:
                        guessedLetters.includes(letter) || reveal ? "visible" : "hidden",
                     color: !guessedLetters.includes(letter) && reveal ? "red" : "white",
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
