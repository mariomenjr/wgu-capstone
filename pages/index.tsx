import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { model, sample } = context.req.wgu;
  const prediction: any = await model.predict(sample);
  return { props: { prediction: await prediction.array() } };
};

function Index(props) {
  return (
    <div>
      Welcome to Next.js!
      <br />
      <pre>{JSON.stringify(props)}</pre>
    </div>
  );
}

export default Index;
