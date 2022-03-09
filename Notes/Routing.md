# Routing
- Everything under pages are route
- Static route: The name of the file/ folder
- Dynamic route: use [name of your file/folder]

### Access data from dynamic route

```js
  const router = useRouter()
  console.log(router.query)
  return (
    <h1>
      {router.query.person}&apos;s {router.query.vehicle}
    </h1>
  )
```

### Access a page
- localhost:3000/car/john?query1=somthing%query1=something2
- We will receive an array for query 1

We use "as" to avoid full reload of a page
```javascript
      <Link as="/car/thomas" href="/[vehicle]/[person]">
        <a>Navigate to Thomas car</a>
      </Link>
```

More complex example:
```
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
```