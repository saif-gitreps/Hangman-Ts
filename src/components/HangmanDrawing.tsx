const Head = (
   <div className="w-12 h-12 rounded-full border-8 border-white absolute top-12 -right-5" />
);
const Body = <div className="w-2 h-24 absolute bg-white top-24 right-0" />;

const RightArm = (
   <div
      className="w-24 h-2 bg-white absolute top-32 -right-24"
      style={{ transformOrigin: "left bottom", rotate: "-30deg" }}
   />
);

const RightHand = (
   <div className="w-6 h-8 rounded-full border-4 bg-white absolute top-16 -right-24" />
);

const LeftHand = (
   <div className="w-6 h-8 rounded-full border-4 bg-white absolute top-16 right-20" />
);

const LeftArm = (
   <div
      className="w-24 h-2 bg-white absolute top-32 right-2"
      style={{ transformOrigin: "right bottom", rotate: "30deg" }}
   />
);

const RightLeg = (
   <div
      className="w-24 h-2 bg-white absolute top-44 "
      style={{ transformOrigin: "left bottom", rotate: "60deg", right: "-92px" }}
   />
);

const LeftLeg = (
   <div
      className="w-24 h-2 bg-white absolute top-44 right-0"
      style={{ transformOrigin: "right bottom", rotate: "-60deg" }}
   />
);

const BodyParts = [Head, Body, RightArm, RightHand, LeftArm, LeftHand, RightLeg, LeftLeg];

type HangmanDrawingProps = {
   numberOfGuesses: number;
};

function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
   return (
      <div className="relative">
         {BodyParts.slice(0, numberOfGuesses)}
         <div className="h-12 w-2 bg-white absolute top-0 right-0" />
         <div className="h-2 w-48 bg-white ml-32" />
         <div className="h-96 w-2 bg-white ml-32" />
         <div className="h-2 w-64 bg-white" />
      </div>
   );
}

export default HangmanDrawing;
