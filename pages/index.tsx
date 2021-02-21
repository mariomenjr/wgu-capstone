import { GetServerSideProps } from 'next';

import Container from "../components/Container";
import Main from "../components/Main";

function Index(props) {
  return <Container><Main {...props} /></Container>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3000/api/model?volume=907873000&increase=-64.63`);
  
  return {
    props: {
      chances: await res.json()
    }
  };
}
export default Index;
