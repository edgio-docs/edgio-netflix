import Item from '@/components/Item'
import { getOrigin } from '@/lib/helper'

const Home = ({ data, country }) => {
  return (
    <>
      <h1 className="mt-10 text-3xl font-bold text-gray-100 md:text-5xl">TV Shows {country && <span>for {country}</span>}</h1>
      <h2 className="text-md mt-5 max-w-[60vw] text-gray-200 md:text-xl">
        These days, the small screen has some very big things to offer. From sitcoms to dramas to travel and talk shows, these are all the best shows
        on TV.
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {data
          .filter((item) => item.show.image)
          .map((item, index) => (
            <Item key={index} {...item['show']} />
          ))}
      </div>
    </>
  )
}

export default Home

export async function getServerSideProps({ req }) {
  const url = `${getOrigin(req)}/tvmaze/schedule?country=US&date=2014-12-01`
  console.log(`fetching ${url}`)
  const res = await fetch(url)
  const data = await res.json()

  return {
    props: {
      data,
      country: getCountryName(req.headers['x-geo-country'] || null),
    },
  }
}

const codes = {
  EE: 'Estonia',
  US: 'United States',
}

function getCountryName(code) {
  return codes[code] || null
}
