export default function Button({
  onPressed,
  buttonText,
}: {
  onPressed: () => void;
  buttonText: string;
}) {
  return (
    <button
      className="outfit-bold p-6 bg-orange rounded-lg text-white tracking-widest"
      onClick={onPressed}
    >
      {buttonText}
    </button>
  );
}
