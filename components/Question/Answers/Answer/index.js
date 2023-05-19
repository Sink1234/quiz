export default function Answer(props) {
  const { icon, answerQuestion, answerText, answerValue } = props;

  return (
    <li>
      <button
        className="p-1 sm:p-0 flex items-center text-start gap-2 hover:text-green"
        onClick={() => answerQuestion(answerValue, answerText)}
      >
        <span className="mr-2">{icon}</span>
        {`${answerValue}. ${answerText}`}
      </button>
    </li>
  );
}

