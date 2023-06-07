import { Input } from "postcss";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Answers from "./Answers";
import NavigationButton from "./NavigationButton";
import cls from "classnames";
import ProgressBar from "@ramonak/react-progress-bar";

export default function Question({
  questions,
  hideExercise,
  finishTest,
  setAllAnswers,
  allAnswers,
  isMobile,
}) {
  const initialState = {
    currentQuestion: 0,
    answers: [],
    numberOfQuestions: questions.length,
    correctAnswers: [],
  };
  const [state, setState] = useState(initialState);
  const { currentQuestion, answers, numberOfQuestions } = state;
  const question = questions[currentQuestion];

  const submitAnswer = () => {
    let totalScore = [];
    for (let i = 0; i < questions.length; i++) {
      answers[i] = totalScore[i];
    }
    finishTest(totalScore);
  };

  const answerQuestion = (answerValue, answerText) => {
    answers[currentQuestion] = answerValue;

    setState({
      ...state,
      answers,
    });
    
    setAllAnswers({
      ...allAnswers,
      [currentQuestion + 1]: { question: question.question, answer: answerText },
    });
  };

  const moveQuestion = (direction) => {
    switch (direction) {
      case "next": {
        if (currentQuestion === numberOfQuestions - 1) {
          submitAnswer();
          return;
        }
        setState({
          ...state,
          currentQuestion: currentQuestion + 1,
        });
        break;
      }
      case "prev": {
        setState({
          ...state,
          currentQuestion: currentQuestion - 1,
        });
      }
    }
  };

  const percents =
    Math.floor(((state.currentQuestion + 1) / 5) * 100)
  return (
    <div className="w-full flex flex-col grow max-w-[600px] mx-auto">
      <h5
        className={cls("text-6xl font-bold uppercase", {
          "text-[32px]": isMobile,
        })}
      >
        шаг {`${state.currentQuestion + 2}`}/6
      </h5>
      <button
        className="flex items-center gap-1 bg-black border boder-[c7c7c7] text-[#c7c7c7] p-2 px-4 my-2 w-fit rounded-sm shadow-md text-white"
        onClick={hideExercise}
      >
        <span>
          <FaArrowLeft />
        </span>
        <span>К выбору строения</span>
      </button>
      <h1 className="text-md mt-2 text-[#ffffff] mb-10">{`${
        state.currentQuestion + 2
      }. ${question.question}`}</h1>
      <Answers
        answers={question.answers}
        answerQuestion={answerQuestion}
        state={state}
      />

      <div className="mt-auto">
        <div className="text-[12px] text-[#6D6D6D]">{percents}%</div>
        <ProgressBar
          customLabel=" "
          bgColor="green"
          height="2px"
          width="100%"
          completed={percents}
        />

        <NavigationButton state={state} moveQuestion={moveQuestion} />
      </div>
    </div>
  );
}
