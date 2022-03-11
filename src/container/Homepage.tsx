import Link from 'next/link';

export function HomePage() {
  return (
    <div>
      <h1>Hello</h1>
      <Link href="/People">
        <a>People</a>
      </Link>
      <hr />
      <Link href="/Vehicles">
        <a>Vehicles</a>
      </Link>
    </div>
  );
}
