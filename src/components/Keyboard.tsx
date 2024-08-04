const generateKeys = (): string[] => {
   const letters: string[] = [];
   for (let i = 0; i < 26; i++) {
      letters.push(String.fromCharCode(97 + i));
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
               className={`w-28 bg-gray-200 m-1 p-2 border-gray-200 font-semibold rounded-lg hover:opacity-50 hover:cursor-pointer text-4xl 
               ${activeLetters.includes(key) ? "bg-green-600 hover:bg-green-600" : ""} 
               ${inactiveLetters.includes(key) ? "opacity-50 hover:opacity-50" : ""}`}
               disabled={
                  activeLetters.includes(key) || inactiveLetters.includes(key) || disabled
               }
            >
               {key.toUpperCase()}
            </button>
         ))}
         <button
            type="button"
            onClick={() => {
               reset();
            }}
            className="`w-28 bg-yellow-500 m-1 font-bold p-2 rounded-lg hover:bg-yellow-700 text-4xl"
         >
            New
         </button>
      </div>
   );
}

export default Keyboard;
