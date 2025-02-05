import { useState, useEffect, useCallback } from "react";
import words from "./WordList.json";
import { HangmanWord, HangmanDrawing, Keyboard } from "./components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./supabaseClient";

function App() {
   const [wordToGuess, setWordToGuess] = useState<{
      word: string;
      hint: string;
   }>(() => words[Math.floor(Math.random() * words.length)]);
   const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
   const incorrectLetters: string[] = guessedLetters.filter(
      (letter) => !wordToGuess.word.includes(letter)
   );
   const [name, setName] = useState<string>("");
   const [yourScore, setYourScore] = useState<number>(0);

   const queryClient = useQueryClient();

   const {
      data: topScores,
      isLoading,
      isError,
   } = useQuery({
      queryKey: ["leaderboard"],
      queryFn: async () => {
         const { data, error } = await supabase
            .from("leaderboard")
            .select("*")
            .order("score", { ascending: false })
            .limit(3);

         if (error) throw new Error(error.message);
         return data;
      },
   });

   const addScoreMutation = useMutation({
      mutationFn: async () => {
         const { data: existing } = await supabase
            .from("leaderboard")
            .select("name")
            .eq("name", name)
            .single();

         if (existing) {
            alert("This username is already taken. Please choose another name.");
            throw new Error("Username already exists");
         }

         const { error } = await supabase
            .from("leaderboard")
            .insert([{ name, score: yourScore }]);

         if (error) throw new Error(error.message);
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
         alert("Score saved successfully!");
      },
      onError: (error) => {
         console.error("Failed to save score:", error);
      },
   });

   const saveScore = () => {
      if (name && yourScore > 0) {
         addScoreMutation.mutate();
      }
   };

   useEffect(() => {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
         if (name && yourScore > 0) {
            e.preventDefault();
            alert("Please save your score before leaving the page.");
         }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => window.removeEventListener("beforeunload", handleBeforeUnload);
   }, [name, yourScore]);

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
      wordToGuess.word
         .split("")
         .forEach((letter) =>
            guessedLetters.includes(letter) ? setYourScore((prev) => prev + 1) : null
         );
   }, [guessedLetters, setYourScore, wordToGuess]);

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
         <h1 className="text-4xl 2xl:text-6xl font-bold text-center text-white">
            Hangman
         </h1>

         <div className="text-xl 2xl:text-2xl xl:flex xl:flex-col xl:justify-start font-bold text-center text-white xl:absolute xl:top-3 xl:left-3 p-2 space-y-2">
            <h1>Enter name to beat leaderboards:</h1>
            <input
               className="p-2 max-w-52 rounded text-black"
               type="text"
               value={name}
               placeholder="Name"
               onChange={(e) => setName(e.target.value)}
            />
         </div>

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

         <div className="text-xl 2xl:text-2xl font-bold text-center text-white xl:absolute border border-white xl:top-32 xl:left-3 p-2 mb-10">
            <h1>Top 3 Leaderboard</h1>
            {isError && <div>Error loading leaderboard</div>}

            {isLoading && topScores === undefined ? (
               <div>Loading leaderboard...</div>
            ) : (
               <>
                  <table className="text-white max-w-md border-separate border-spacing-1 table-auto w-full">
                     <thead>
                        <tr className="border border-b-2 border-gray-200">
                           <th className="text-left px-2 py-1">Name</th>
                           <th className="text-left px-2 py-1">Score</th>
                        </tr>
                     </thead>
                     <tbody>
                        {topScores?.map((score, index) => (
                           <tr
                              key={index + score}
                              className="border border-white text-gray-300"
                           >
                              <td className="px-2 py-1 break-words text-left">
                                 {score.name}
                              </td>
                              <td className="px-2 py-1 text-yellow-400">{score.score}</td>
                           </tr>
                        ))}

                        {name && (
                           <tr className="border border-white text-gray-300 max-w-md bg-slate-700">
                              <td className="px-2 py-1 break-words text-left max-w-72">
                                 You
                              </td>
                              <td className="px-2 py-1 text-yellow-400">{yourScore}</td>
                           </tr>
                        )}
                     </tbody>
                  </table>
                  {name && yourScore > 0 && (
                     <button
                        className="bg-yellow-500 p-2 rounded text-black"
                        onClick={saveScore}
                     >
                        Save score
                     </button>
                  )}
               </>
            )}
         </div>
      </div>
   );
}

export default App;
