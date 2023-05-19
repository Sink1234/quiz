export default function ExerciseList({ exercises, func }) {
  return (
    <div className="quiz">
      <div className="step-1">
        <h5 className="step">шаг 1</h5>
        <p className="step-1p">Для какого строения Вам требуется фундамент?</p>
        <ul>
          {exercises.map((exercise) => (
            <li className="hover:text-blue-900" key={exercise.id}>
              <button  className='text-start' onClick={() => func(exercise.id)}>
                {exercise.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
