import arrow from "../../../public/arrow.svg";
import Image from "next/image";

export default function NavigationButton({ state, moveQuestion }) {
  const { currentQuestion, answers, numberOfQuestions } = state;

  const buttonStyles = {
    disabled:
      "bg-gradient-to-br from-green to-green0 flex items-center justify-center hover:bg-green-950 text-white font-bold p-6 rounded-full opacity-50 cursor-not-allowed",
    active:
      " bg-gradient-to-br from-green to-green0 flex items-center justify-center hover:bg-green-950 text-white font-bold p-6 rounded-full",
  };

  const getButton = (direction) => {
    if (direction === "next") {
      return (
        <button
          onClick={() => moveQuestion("next")}
          className={!answers[currentQuestion] ? x : y}
        >
          {currentQuestion !== numberOfQuestions - 1 ? (
            <Image src={arrow} className="" alt="" />
          ) : (
            "Finish"
          )}
        </button>
      );
    } else {
      return (
        <button
          onClick={currentQuestion === 0 ? null : () => moveQuestion("prev")}
          className={currentQuestion === 0 ? x : y}
        >
          <Image src={arrow} className="rotate-180" alt="" />
        </button>
      );
    }
  };
  const { disabled: x, active: y } = buttonStyles;
  return (
    <div className="flex justify-end gap-2 mx-2">
      {getButton("prev")}
      {getButton("next")}
    </div>
  );
}
