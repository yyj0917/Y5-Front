import { RetrieveForm } from './_components/retrieve-form';

export default function RetrievePage() {
  return (
    <div className="mt-10 w-full h-[70vh] flex flex-col justify-center items-center">
      <section className="w-[50%] h-auto flex flex-col justify-center items-center">
        <RetrieveForm />
      </section>
    </div>
  );
}
