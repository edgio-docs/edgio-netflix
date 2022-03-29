import Item from '@/components/Item'

const Home = ({ data }) => {
  return (
    <div className="w-full flex flex-col items-center text-center">
      <h1 className="mt-10 text-3xl md:text-5xl font-bold">TV Shows</h1>
      <h2 className="mt-5 text-md md:text-xl max-w-[60vw]">
        These days, the small screen has some very big things to offer. From sitcoms to dramas to
        travel and talk shows, these are all the best shows on TV.
      </h2>
      <div className="py-10 flex flex-row flex-wrap justify-center items-start gap-10">
        {data
          .filter((item) => item.show.image)
          .map((item, index) => (
            <Item key={index} {...item['show']} />
          ))}
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const fetchCall = await fetch('https://api.tvmaze.com/schedule?country=US&date=2014-12-01')
  const data = await fetchCall.json()
  return {
    props: {
      data,
    },
  }
}
