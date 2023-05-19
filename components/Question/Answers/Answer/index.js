export default function Answer(props) {
  const { icon, answerQuestion, answerText, answerValue } = props;

  return (
    <li>
      <button
        className="p-1 sm:p-0 flex items-center gap-2 hover:text-green"
        onClick={() => answerQuestion(answerValue, answerText)}
      >
        <span>{icon}</span>
        {`${answerValue}. ${answerText}`}
      </button>
    </li>
  );
}
