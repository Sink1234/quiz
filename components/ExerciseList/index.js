import Image from "next/image";
import cls from "classnames";

export default function ExerciseList({ exercises, isMobile, func }) {
  return (
    <div className="max-w-[1000px] mx-auto">
      <h5 className={cls("text-6xl font-bold uppercase", {
        '!text-[32px]' : isMobile
      })}>шаг 1</h5>
      <p className="text-[#6D6D6D] text-[20px] mb-10 mt-1 font-medium">
        Для какого строения требуется фундамент?
      </p>
      <ul
        className={cls("flex flex-wrap items-start", {
          "gap-x-6 justify-center ": isMobile,
        })}
      >
        {exercises.map((exercise) => (
          <li
            className={cls(
              "hover:text-blue-900 cursor-pointer hover:text-green-900 transform transition hover:scale-105 flex items-center flex-col  mr-[50px] mb-[30px] max-w-[190px]",
              {
                "!space-x-[10px] !max-w-[150px] !mr-0": isMobile,
              }
            )}
            onClick={() => func(exercise.id, exercise.title )}
            key={exercise.id}
          >
            <Image
              src={exercise.imageUrl}
              alt=""
              className="rounded-3xl"
              width={isMobile ? 150 : 190}
              height={isMobile ? 110 : 135}
            />

            <div className="text-[#6D6D6D] text-[15px] text-center whitespace-normal mt-2">
              {exercise.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
