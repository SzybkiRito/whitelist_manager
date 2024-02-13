import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Input from '../components/inputs/input';
import questionsJson from '../../questions.json';
import Button from '../components/inputs/button';
import Popup from '../components/popup/popup';
import { Question, QuestionAnswer } from '../interfaces/Question';
import { DiscordUser } from '../interfaces/DiscordUser';
import ApplicationService from '../services/ApplicationService';
import { config } from '../config';

export default function WhitelistPage({ userData }: { userData: DiscordUser }) {
  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer>(
    {} as QuestionAnswer
  );
  const questions: Question[] = questionsJson.questions as Question[];
  const navigate = useNavigate();

  const handleQuestionChange = (id: string, value: string) => {
    setQuestionAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const renderQuestions = () =>
    questions.map((question: Question) => (
      <Input
        key={question.id}
        type={question.type}
        question={question.question}
        max={question.max}
        min={question.min}
        placeHolder="Type your answer"
        onChangeValue={(value) =>
          handleQuestionChange(question.id.toString(), value.toString())
        }
      />
    ));

  const validateInputs = () => {
    const answers = Object.values(questionAnswers);
    if (
      answers.length < questionsJson.questions.length ||
      answers.includes('')
    ) {
      setPopupMessage('You have to answer all the questions');
      setIsPopupOpen(true);
      return;
    }

    setPopupMessage('Are you sure?');
    setIsPopupOpen(true);
  };

  const submitApplication = async () => {
    if (!userData) return;

    const applicationService = new ApplicationService();
    const application = await applicationService.submitApplication(
      userData,
      questionAnswers
    );
    const message = application
      ? 'Application submitted, wait for discord message from our bot to check status of your application.'
      : 'You have already submitted an application or something went wrong. Try again later or contact support.';
    setPopupMessage(message);

    if (application) {
      setTimeout(() => navigate('/'), 3000);
    }
  };

  useEffect(() => {
    if (userData) setIsLoading(true);
  }, [setIsLoading, userData]);

  return (
    <main>
      <Header />
      <section className="h-full flex flex-col items-center pt-10 gap-5">
        {isLoading ? (
          <>
            <div className="bg-orange p-6 rounded-md shadow-md text-white w-4/5">
              Please answer the following questions to get whitelisted on our
              server. Do not ask staff about the status of your application, you
              will be notified on discord. You can only submit
              {''} {config.maxApplicationPerUser} applications per user. Have
              fun!
            </div>
            <span className="text-white w-4/5">
              Discord ID: <span className="text-orange">{userData.id}</span>
            </span>
            <span className="text-white w-4/5">
              Discord Username:{' '}
              <span className="text-orange">{userData.global_name}</span>
            </span>
          </>
        ) : (
          <SkeletonLoader />
        )}
        {renderQuestions()}
        <div className="mb-5">
          <Button onPressed={validateInputs} buttonText="Submit" />
        </div>
      </section>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Are you sure?"
      >
        <p>{popupMessage}</p>
        <div className="flex justify-end gap-5">
          <button
            onClick={() => setIsPopupOpen(false)}
            className='className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-700 transition duration-300'
          >
            Cancel
          </button>
          {popupMessage === 'Are you sure?' && (
            <button
              onClick={submitApplication}
              className='className="p-4 px-4 py-2 bg-red-500 text-black rounded hover:bg-lime-700 transition duration-300 text-white'
            >
              Confirm
            </button>
          )}
        </div>
      </Popup>
      <Footer />
    </main>
  );
}

function SkeletonLoader() {
  return (
    <>
      <div
        className="p-10 rounded-md shadow-md text-white w-4/5"
        style={{ backgroundColor: '#3f3f3f' }}
      ></div>
      <div className="flex flex-start h-full w-4/5">
        <div
          className="min-h-4 w-28 animate-pulse rounded-lg flex flex-row"
          style={{ backgroundColor: '#3f3f3f' }}
        ></div>
        <div
          className="min-h-4 w-28 animate-pulse rounded-lg flex flex-row ml-2"
          style={{ backgroundColor: '#3f3f3f' }}
        ></div>
      </div>

      <div className="flex flex-start h-full w-4/5">
        <div
          className="min-h-4 w-28 animate-pulse rounded-lg flex flex-row"
          style={{ backgroundColor: '#3f3f3f' }}
        ></div>
        <div
          className="min-h-4 w-28 animate-pulse rounded-lg flex flex-row ml-2"
          style={{ backgroundColor: '#3f3f3f' }}
        ></div>
      </div>
    </>
  );
}
