import Image from "next/image";
import cls from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { Virtual, Navigation, Pagination, Scrollbar, A11y } from "swiper";

export default function ExerciseList({ exercises, isMobile, func }) {
  return (
    <div className="max-w-full mx-auto overflow-hidden ">
      <h5
        className={cls("text-6xl font-bold uppercase", {
          "!text-[32px]": isMobile,
        })}
      >
        шаг 1
      </h5>
      <p className="text-[#fff] text-[20px] mb-10 mt-1 font-medium">
        Для какого строения требуется фундамент?
      </p>

      {isMobile ? (
        <Swiper
          spaceBetween={10}
          slidesPerView={1.2}
        >
          {exercises.map((exercise, index) => {
            return (
              <SwiperSlide key={exercise.id} virtualIndex={index} onClick={() => func(exercise.id, exercise.title)}>
                <div className="">
                  <Image
                    src={exercise.imageUrl}
                    alt=""
                    className="rounded-[40px] !h-[340px]"
                    width={270}
                    height={350}
                  />

                  <div className="text-[#fff] text-[15px] text-center whitespace-normal mt-2">
                    {exercise.title}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <ul
          className={cls("flex flex-wrap items-start max-w-[1000px] mx-auto", {
            "gap-x-6 justify-center ": isMobile,
          })}
        >
          {" "}
          {exercises.map((exercise) => (
            <li
              className={cls(
                "hover:text-blue-900 cursor-pointer hover:text-green-900 transform transition hover:scale-105 flex items-center flex-col  mr-[50px] mb-[30px] max-w-[190px]",
                {
                  "!space-x-[10px] !max-w-[150px] !mr-0": isMobile,
                }
              )}
              onClick={() => func(exercise.id, exercise.title)}
              key={exercise.id}
            >
              <Image
                src={exercise.imageUrl}
                alt=""
                className="rounded-3xl"
                width={isMobile ? 150 : 190}
                height={isMobile ? 110 : 135}
              />

              <div className="text-[#fff] text-[15px] text-center whitespace-normal mt-2">
                {exercise.title}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

