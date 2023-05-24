import Head from "next/head";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Question from "../components/Question";
import ExerciseList from "../components/ExerciseList";
import polygon from "../public/kirpich.jpg";
import Image from "next/image";
import { Input } from "postcss";
import cls from 'classnames'


export function getServerSideProps() {
  const exercises = [
    { id: 2, title: "Дом из газобетона", imageUrl: "/../public/beton.jpg" },
    { id: 1, title: "Кирпичный дом", imageUrl: "/../public/kirpich.jpg" },
    { id: 1, title: "Деревянный дом", imageUrl: "/../public/wood.jpg" },
    { id: 1, title: "Мелкое строение", imageUrl: "/../public/small.jpg" },
    // { id: 0, title: "Каркасный дом" },
    // { id: 3, title: "Дом из бруса" },
    // { id: 4, title: "Баня" },
    {
      id: 5,
      title: "Коммерческая недвижимость",
      imageUrl: "/../public/commerce.jpg",
    },
    { id: 5, title: "Другое", imageUrl: "/../public/other.jpg" },
    // { id: 6, title: "Другое" },
  ];

  return {
    props: {
      exercises,
    },
  };
}

export function getQuestions(exerciseId) {
  const questions = [
    {
      id: 0,
      exerciseId: 0,
      question: "Сколько этажей планируется?",
      answers: [
        "1 этаж",
        "2 этажа",
        "3 этажа",
        "4 этажа",
        "Более 4 этажа",
        "Другое…",
      ],
      correctAnswer: "a",
    },
    {
      id: 1,
      exerciseId: 0,
      question: "Какой тип фундамента рассматриваете?",
      answers: [
        "Монолитная плита",
        "Утепленная плита с ростверком",
        "Утепленная шведская плита",
        "Цокольный этаж",
        "Не знаю, нужно порекомендовать",
      ],
      correctAnswer: "d",
    },
    {
      id: 2,
      exerciseId: 0,
      question: "Укажите высоту плиты",
      answers: [
        "0.2 метра",
        "0.25 метра",
        "0.3 метра",
        "0.35 метра",
        "0.4 метра",
      ],
      correctAnswer: "b",
    },
    {
      id: 3,
      exerciseId: 0,
      question: "Когда планируете начать работы?",
      answers: [
        "Как можно скорее",
        "Через 1-2 недели",
        "В течении месяца",
        "Через 1-3 месяца",
      ],
      correctAnswer: "d",
    },
  ];

  return questions.filter((items) => items.exerciseId === exerciseId);
}

export default function Home({ exercises }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [allAnswers, setAllAnswers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sending");

    let data = {
      name,
      email,
      message,
      allAnswers,
    };

    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("Response received");
      if (res.status === 200) {
        console.log("Response succeeded!");
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
      }
    });
  };

  const initialState = {
    isExerciseShown: false,
    exerciseId: null,
    questions: [],
    isExerciseDone: false,
    score: 0,
  };

  const [state, setState] = useState(initialState);
  const { isExerciseShown, questions, isExerciseDone, score } = state;

  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    if (window) {
      setIsMobile(window.innerWidth < 800);
    }
  }, []);

  const showExercise = (id) => {
    setState({
      ...state,
      exerciseId: id,
      questions: getQuestions(0),
      isExerciseShown: true,
    });
  };
  const hideExercise = () => {
    setState(initialState);
  };
  const finishTest = (score) => {
    setState({
      ...state,
      isExerciseDone: true,
      score,
    });
  };

  return (
    <>
      <Head>
        <title>Quiz</title>
        <meta name="description" content="Quiz app in next js" />
      </Head>

      <main className={cls(" w-full flex bg-black text-white grow min-h-[100%] flex-col items-center justify-center pt-20 sm:pt-[40px] px-5 pb-20 ", {
        '!items-start !justify-start ': isMobile
      })}>
        <>
          {submitted ? (
            <div className="py-[20%] px-[10%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          ) : !isExerciseShown ? (
            <ExerciseList
              exercises={exercises}
              func={showExercise}
              isMobile={isMobile}
            />
          ) : isExerciseDone ? (
            <div>
              <form className="flex flex-col  space-y-10 py-[20%]">
                <div className="flex flex-col">
                  <label htmlFor="name">
                    Площать пильного фундамента в кв/м
                  </label>
                  <input
                    className="rounded-md  text-black bg-white p-2 border border-gray"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    name="name"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="message">Телефон</label>
                  <input
                    type="tel"
                    className="rounded-md text-black bg-white p-2 border border-gray"
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    name="message"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email">Почта</label>
                  <input
                    type="email"
                    className="rounded-md text-black bg-white p-2 border border-gray"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    name="email"
                  />
                </div>
                <button
                  type="submit"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <Question
              questions={questions}
              hideExercise={hideExercise}
              finishTest={finishTest}
              setAllAnswers={setAllAnswers}
              allAnswers={allAnswers}
              isMobile={isMobile}
            />
          )}
        </>
      </main>
    </>
  );
}
