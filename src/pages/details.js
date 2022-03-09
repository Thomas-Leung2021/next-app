import Link from 'next/link'

const people = [
  { v: 'car', name: 'john' },
  { v: 'bike', name: 'jane' },
  { v: 'plane', name: 'joe' },
]
export default function Details() {
  return (
    <div>
      {people.map((item) => (
        <div key={item.name}>
          <Link as={`/${item.v}/${item.name}`} href="/[vehicle]/[person]">
            <a>
              Navigate to {item.name} {item.v}
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}
