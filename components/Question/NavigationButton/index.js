import arrow from "../../../public/arrow.svg";
import Image from "next/image";

export default function NavigationButton({ state, moveQuestion }) {
  const { currentQuestion, answers, numberOfQuestions } = state;

  const buttonStyles = {
    disabled: "cursor-not-allowed opacity-50",
    active: "",
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
    <div className="flex justify-center gap-10 mt-5 mx-2">
      {getButton("prev")}
      {getButton("next")}
    </div>
  );
}
