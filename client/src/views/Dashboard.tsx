import { useEffect, useState } from 'react';
import ApplicationCard from '../components/application_card/application_card';

import Header from '../components/header/header';
import { config } from '../config';
import { ApplicationResponse } from '../interfaces/Question';
import ApplicationReview from './ApplicationReview';
import Button from '../components/inputs/button';

// VALUES NAME SHOULD HAVE SAME NAME AS THE API ENDPOINT
enum ApplicationStatus {
  WAITING = 'waiting',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
  WAITING_NUMBER = -1,
  REJECTED_NUMBER = 0,
  ACCEPTED_NUMBER = 1,
}

export default function Dashboard() {
  const [clickedApplicationIndex, setClickedApplicationIndex] = useState<
    number | null
  >(null);
  const [applications, setApplications] = useState<ApplicationResponse[]>([]);

  const setApplicationsResponse = async (status: ApplicationStatus) => {
    const API_ENDPOINT = `${config.BASE_API_URL}/applications/${status}`;
    const response = await fetch(API_ENDPOINT, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      },
    });
    const applicationsData = await response.json();
    setApplications(applicationsData);
  };

  useEffect(() => {
    setApplicationsResponse(ApplicationStatus.WAITING);
  }, []);

  if (clickedApplicationIndex !== null) {
    return (
      <ApplicationReview application={applications[clickedApplicationIndex]} />
    );
  }

  return (
    <main>
      <Header />
      <section className="flex flex-wrap m-2 gap-10">
        <div className="flex justify-center flex-col items-center w-full gap-5">
          <div className="flex flex-row gap-5">
            <Button
              buttonText="Rejected Applications"
              onPressed={() => {
                if (
                  applications[0]?.status !== ApplicationStatus.REJECTED_NUMBER
                ) {
                  setApplicationsResponse(ApplicationStatus.REJECTED);
                }
              }}
            />
            <Button
              buttonText="Accepted Applications"
              onPressed={() => {
                if (
                  applications[0]?.status !== ApplicationStatus.ACCEPTED_NUMBER
                ) {
                  setApplicationsResponse(ApplicationStatus.ACCEPTED);
                }
              }}
            />
            <Button
              buttonText="Not Processed Applications"
              onPressed={() => {
                if (
                  applications[0]?.status !== ApplicationStatus.WAITING_NUMBER
                ) {
                  setApplicationsResponse(ApplicationStatus.WAITING);
                }
              }}
            />
          </div>
          {applications.length === 0 ? (
            <h2 className="text-white text-3xl">
              All application are already checked
            </h2>
          ) : null}
        </div>
        {applications.map((application, index) => (
          <ApplicationCard
            key={application.id}
            username={application.name}
            age={parseInt(application.answers['1'])}
            onClick={() => setClickedApplicationIndex(index)}
          />
        ))}
      </section>
    </main>
  );
}
