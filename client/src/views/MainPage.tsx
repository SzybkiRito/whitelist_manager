import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import InstructionCard from '../components/instruction_card/instruction_card';
import Banner from '../assets/images/banner.png';

export default function MainPage() {
  return (
    <>
      <Header />
      <img src={Banner} alt="banner" className="w-full" />
      <section className="w-full p-10 flex flex-col items-center sm:flex-row gap-10 justify-evenly">
        <InstructionCard
          stepNumber={1}
          title="Join Discord Server"
          buttonText="JOIN"
          description="You'll need to join discord server in order to play on our server"
          onPressed={() => {}}
        />
        <InstructionCard
          stepNumber={1}
          title="Join Discord Server"
          buttonText="JOIN"
          description="You'll need to join discord server in order to play on our server"
          onPressed={() => {}}
        />
        <InstructionCard
          stepNumber={1}
          title="Join Discord Server"
          buttonText="JOIN"
          description="You'll need to join discord server in order to play on our server"
          onPressed={() => {}}
        />
      </section>
      <Footer />
    </>
  );
}
