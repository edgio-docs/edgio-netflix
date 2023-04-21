import Item from '@/components/Item'

const Home = ({ data, country }) => {
  return (
    <>
      <h1 className="mt-10 text-3xl font-bold text-gray-100 md:text-5xl">TV Shows {country && <span>for {country}</span>}</h1>
      <h2 className="text-md mt-5 max-w-[60vw] text-gray-200 md:text-xl">
        These days, the small screen has some very big things to offer. From sitcoms to dramas to travel and talk shows, these are all the best shows
        on TV.
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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

export async function getServerSideProps() {
  const res = await fetch('https://api.tvmaze.com/schedule?country=US&date=2014-12-01')
  const data = await res.json()

  console.log('[home] getServerSideProps')

  return {
    props: {
      data,
    },
  }
}
