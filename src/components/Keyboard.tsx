const generateKeys = (): string[] => {
   const letters: string[] = [];
   for (let i = 0; i < 26; i++) {
      letters.push(String.fromCharCode(65 + i));
   }
   return letters;
};

function Keyboard() {
   const keys: string[] = generateKeys();
   return (
      <div className="max-w-6xl flex flex-wrap justify-center">
         {keys.map((key) => (
            <button
               key={key}
               className="w-28 bg-gray-200 m-1 border-8 border-black font-semibold p-1 rounded-md hover:bg-gray-500 text-5xl"
            >
               {key}
            </button>
         ))}
      </div>
   );
}

export default Keyboard;
