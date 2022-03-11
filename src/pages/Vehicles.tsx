import { NextPageContext } from 'next';
import { myGet } from '../../api/myGet';

export default function Vehicles({ vehicles }: any) {
  return (
    <div>
      <h1>Vehicles</h1>
      <p>{JSON.stringify(vehicles)}</p>
    </div>
  );
}

Vehicles.getInitialProps = async (ctx: NextPageContext) => {
  const json = await myGet('http://localhost:3000/api/vehicles', ctx);
  return { people: json };
};
