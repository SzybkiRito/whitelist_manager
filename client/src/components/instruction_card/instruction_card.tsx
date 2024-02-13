import Button from '../inputs/button';

type PropsValidation = {
  stepNumber: number;
  title: string;
  description: string;
  buttonText: string;
  onPressed: () => void;
};

export default function InstructionCard(props: PropsValidation) {
  return (
    <div className="flex flex-col w-80 gap-2">
      <h4 className="outfit-bold text-orange uppercase ">
        STEP {props.stepNumber}
      </h4>

      <h5 className="outfit-bold text-white uppercase ">{props.title}</h5>
      <span className="outfit-regular text-white">{props.description}</span>
      <Button onPressed={props.onPressed} buttonText={props.buttonText} />
    </div>
  );
}
