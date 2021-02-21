import { GetServerSideProps } from "next";

import Container from "../components/layout/Container";
import Main from "../components/layout/Main";

function Index(props) {
  return <Container>
    <Main {...props} />
  </Container>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `http://${context.req.headers.host}/api/model?${Object.keys(context.query)
      .map((param) => `${param}=${context.query[param]}`)
      .join(`&`)}`
  );
  return {
    props: {
      chances: await res.json(),
      query: context.query
    },
  };
};
export default Index;
