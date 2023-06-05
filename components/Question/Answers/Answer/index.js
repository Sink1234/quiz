export default function Answer(props) {
  const { icon, answerQuestion, answerText, answerValue } = props;

  return (
    <li>
      <button
        className="p-1 sm:p-0 mb-5 flex items-center text-[#6D6D6D] text-start gap-2 hover:text-green"
        onClick={() => answerQuestion(answerValue, answerText)}
      >
        <span className="mr-2">{icon}</span>
        {answerText}
      </button>
    </li>
  );
}
