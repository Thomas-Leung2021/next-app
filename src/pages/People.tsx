import { NextPageContext } from 'next';
import { myGet } from '../../api/myGet';

export default function People({ people }: any) {
  return (
    <div>
      <h1>People</h1>
      <p>{JSON.stringify(people)}</p>
    </div>
  );
}

People.getInitialProps = async (ctx: NextPageContext) => {
  const json = await myGet('http://localhost:3000/api/people', ctx);
  return { people: json };
};
