import { Input } from "postcss";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Answers from "./Answers";
import NavigationButton from "./NavigationButton";

export default function Question({
  questions,
  hideExercise,
  finishTest,
  setAllAnswers,
  allAnswers,
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
    console.log("state: ", state);
    setState({
      ...state,
      answers,
    });

    setAllAnswers({
      ...allAnswers,
      [currentQuestion]: { question: question.question, answer: answerText },
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

  return (
    <div className="step-1">
      <h5 className="step">шаг {`${state.currentQuestion + 2}`}/6</h5>
      <button
        className="flex items-center gap-1 bg-gray-400 p-2 rounded-sm shadow-md text-white"
        onClick={hideExercise}
      >
        <span>
          <FaArrowLeft />
        </span>
        <span>К выбору строения</span>
      </button>
      <h1 className="text-2xl mt-2 capitalize">{`${
        state.currentQuestion + 1
      }. ${question.question}`}</h1>
      <Answers
        answers={question.answers}
        answerQuestion={answerQuestion}
        state={state}
      />

      <NavigationButton state={state} moveQuestion={moveQuestion} />
    </div>
  );
}
