import Head from "next/head";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Question from "../components/Question";
import ExerciseList from "../components/ExerciseList";
import polygon from "../public/kirpich.jpg";
import Image from "next/image";
import { Input } from "postcss";
import cls from "classnames";
import InputMask from 'react-input-mask';

export function getServerSideProps() {
  const exercises = [
    { id: 0, title: "Дом из газобетона", imageUrl: "/beton.jpg" },
    { id: 1, title: "Кирпичный дом", imageUrl: "/kirpich.jpg" },
    { id: 2, title: "Деревянный дом", imageUrl: "/wood.jpg" },
    { id: 3, title: "Мелкое строение", imageUrl: "/small.jpg" },
    {
      id: 4,
      title: "Коммерческая недвижимость",
      imageUrl: "/commerce.jpg",
    },
    { id: 5, title: "Другое", imageUrl: "/other.jpg" },
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
    if (!name || !name.trim()) {
      setName(false);
    }
    if (!email || !email.trim()) {
      setEmail(false);
    }
    if (!message || !message.trim() || message.includes('  -  ')) {
      setMessage(false);
    }

    if (!name || !email || !message) return;

    console.log("Sending");

    let data = {
      name,
      email,
      message,
      allAnswers,
    };

    setSubmitted(true);

    fetch("/api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("Response received");
      //       if (res.status === 200) {
      console.log("Response succeeded!");
      setName("");
      setEmail("");
      setMessage("");
      //       }
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

  const showExercise = (id, answer) => {
    setState({
      ...state,
      exerciseId: id,
      questions: getQuestions(0),
      isExerciseShown: true,
    });
    setAllAnswers({
      ...allAnswers,
      0: { question: "Тип строения", answer: answer },
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

      <main
        className={cls(
          " w-full flex bg-black text-white grow min-h-[100%] flex-col items-center justify-center pt-20 sm:pt-[40px] px-5 pb-20 ",
          {
            "!items-start !justify-start ": isMobile,
          }
        )}
      >
        <>
          {submitted ? (
            <div className="py-[20%] px-[10%]">
              Мы уже приступили к просчету Вашего фундамента, скоро с Вами
              свяжемся!
            </div>
          ) : !isExerciseShown ? (
            <ExerciseList
              exercises={exercises}
              func={showExercise}
              isMobile={isMobile}
            />
          ) : isExerciseDone ? (
            <form className="flex flex-col max-w-[300px] w-full mx-auto  space-y-10 py-[5%]">
              <div className="flex flex-col">
                <label htmlFor="name">Площать пильного фундамента в кв/м</label>
                <input
                  className={cls(
                    "rounded-md  text-black bg-white p-2 border border-gray",
                    {
                      "outline outline-2 outline-red-600 shadow-md shadow-red-600":
                        name === false,
                    }
                  )}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  name="name"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="message">Телефон</label>
                <InputMask mask="+7(999)-999-99-99" alwaysShowMask maskChar={' '} value={message} onChange={(e) => {
                    setMessage(e.target.value)}} className={cls(
                      "rounded-md text-black bg-white p-2 border border-gray",
                      {
                        "outline outline-2 outline-red-600 shadow-md shadow-red-600":
                          message === false,
                      }
                    )} />
                {/* <input
                  type="tel"
                  className={cls(
                    "rounded-md text-black bg-white p-2 border border-gray",
                    {
                      "outline outline-2 outline-red-600 shadow-md shadow-red-600":
                        message === false,
                    }
                  )}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  name="message"
                /> */}
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Почта</label>
                <input
                  type="email"
                  className={cls(
                    "rounded-md text-black bg-white p-2 border border-gray",
                    {
                      "outline outline-2 outline-red-600 shadow-md shadow-red-600":
                        email === false,
                    }
                  )}
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
                Отправить
              </button>
            </form>
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

