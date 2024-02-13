import Header from '../components/header/header';
import { ApplicationResponse, Question } from '../interfaces/Question';
import Button from '../components/inputs/button';
import questionsJson from '../../questions.json';
import Input from '../components/inputs/input';
import { useState } from 'react';
import Dashboard from './Dashboard';
import ApplicationService from '../services/ApplicationService';

export default function ApplicationReview({
  application,
}: {
  application: ApplicationResponse;
}) {
  const [isApplicationProcessed, setIsApplicationProcessed] = useState<
    boolean | null
  >();
  const questions: Question[] = questionsJson.questions as Question[];

  const renderQuestions = () =>
    questions.map((question: Question, index) => (
      <Input
        key={question.id}
        type={question.type}
        question={question.question}
        max={question.max}
        min={question.min}
        disabled={true}
        placeHolder={application.answers[index + 1]}
      />
    ));

  const processApplication = async (status: boolean) => {
    const response = await ApplicationService.processAplication(
      status,
      application.id
    );
    if (response) {
      setIsApplicationProcessed(true);
    }
  };

  if (isApplicationProcessed) return <Dashboard />;

  return (
    <main>
      <Header />
      <section className="h-full flex flex-col items-center pt-10 gap-5">
        <span className="text-white w-4/5">
          Discord ID:{' '}
          <span className="text-orange">{application.discord_id}</span>
        </span>
        <span className="text-white w-4/5">
          Discord Username:{' '}
          <span className="text-orange">{application.name}</span>
        </span>
        {renderQuestions()}
        <div className="flex gap-10">
          <div className="mb-5">
            <Button
              onPressed={() => processApplication(false)}
              buttonText="Decline"
            />
          </div>
          <div className="mb-5">
            <Button
              onPressed={() => processApplication(true)}
              buttonText="Accept"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
