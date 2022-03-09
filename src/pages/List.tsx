import Link from 'next/link'
import { useEffect } from 'react'
import { ListFormat } from 'typescript'
import { VehiclePerson } from '../../api/VehiclePerson'

const people = [
  { v: 'car', name: 'john' },
  { v: 'bike', name: 'jane' },
  { v: 'plane', name: 'joe' },
]

export interface ListProps {
  ownerList: VehiclePerson[] | undefined
  // or owerList?: VehiclePerson[]
}

export default function List({ ownerList }: ListProps) {
  // const [owners, setOwners] = userState([])
  // useEffect will not run in server side in runtime. As next.js renders the page
  // and sends it immediately to the browser. UseEffect will in the next time frame.
  // Nextjs provides a hook called getInitialProps which is called when the page is
  // rendered for the first time.
  // Won't work:
  // useEffect(() => {
  //   async function loadData() {
  //     const response = await fetch('https://swapi.dev/api/people/1')
  //     const ownersList = await response.json()
  //     setOwnsers(ownserList)
  //   }
  //   loadData()
  // }, [])

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

// Check if it receives a promise, wait for it to resolve and then return the value
List.getInitialProps = async () => {
  const response = await fetch('https://swapi.dev/api/people/1')
  const ownersList: VehiclePerson[] | undefined = await response.json()
  return { ownerList: ownersList }
}
