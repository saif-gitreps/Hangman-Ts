const generateKeys = (): string[] => {
   const letters: string[] = [];
   for (let i = 0; i < 26; i++) {
      letters.push(String.fromCharCode(65 + i));
   }
   return letters;
};

type KeyboardProps = {
   disabled?: boolean;
   activeLetters: string[];
   inactiveLetters: string[];
   addGuessedLetter: (letter: string) => void;
   reset: () => void;
};

function Keyboard({
   disabled = false,
   activeLetters,
   inactiveLetters,
   addGuessedLetter,
   reset,
}: KeyboardProps) {
   const keys: string[] = generateKeys();

   return (
      <div className="max-w-6xl flex flex-wrap justify-center">
         {keys.map((key) => (
            <button
               onClick={() => addGuessedLetter(key)}
               key={key}
               className={`w-28 bg-gray-200 m-1 border-8 p-2 border-gray-200 font-semibold rounded-lg hover:bg-gray-300 hover:cursor-pointer text-5xl ${
                  activeLetters.includes(key) ? "bg-green-500 hover:bg-green-500" : ""
               } ${inactiveLetters.includes(key) ? "opacity-60 hover:opacity-60" : ""}`}
               disabled={
                  activeLetters.includes(key) || inactiveLetters.includes(key) || disabled
               }
            >
               {key}
            </button>
         ))}
         <button
            type="button"
            onClick={() => {
               reset();
            }}
            className="`w-28 bg-gray-200 m-1  font-semibold p-2 border-8 rounded-md hover:bg-gray-300 text-5xl"
         >
            new
         </button>
      </div>
   );
}

export default Keyboard;
