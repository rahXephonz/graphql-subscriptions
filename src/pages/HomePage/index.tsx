import { useQuery, gql } from '@apollo/client';

const GET_INFO = gql`
  query Info {
    info
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_INFO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return <div>Status: {data.info}</div>;
};

export default Home;
