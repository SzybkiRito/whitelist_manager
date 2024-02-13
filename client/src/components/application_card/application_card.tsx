export default function ApplicationCard({
  username,
  age,
  onClick,
}: {
  username: string;
  age: number;
  onClick?: () => void;
}) {
  return (
    <div
      className="application_card bg-white h-fit p-5 flex flex-col items-center rounded-lg select-none"
      onClick={onClick}
    >
      <span className="text-2xl font-bold">APPLICATION</span>
      <span className="text-lg font-bold uppercase">
        Username:{' '}
        <span className="text-orange normal-case font-normal">{username}</span>
      </span>
      <span className="text-lg font-bold uppercase">
        Age: <span className="text-orange normal-case font-normal">{age}</span>
      </span>
    </div>
  );
}
