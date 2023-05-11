import Rating from '@/components/Rating'
import Image from 'next/image'

const Show = ({ data }) => {
  return (
    <>
      <Image alt="movie thumbnail" className="mt-10" height={295} width={210} src={data.image.original} />
      {data.name && <h1 className="mt-5 text-center text-4xl font-bold text-white md:text-left">{data.name}</h1>}
      <div className="mt-10 flex w-full flex-col items-center sm:mt-0 sm:w-1/2 sm:items-start md:w-2/3">
        <div className="mt-5 flex flex-row flex-wrap items-start justify-center gap-x-10 md:justify-start">
          {data.premiered && (
            <div className="flex flex-row items-center">
              <h3 className="text-md mt-5 rounded-lg bg-[#363636] p-2 px-5 text-gray-300">
                <span>Airing since: </span>
                <b>{`${new Date(data.premiered).getFullYear()} - ${data.ended ? new Date(data.ended).getFullYear() : 'Now'}`}</b>
              </h3>
            </div>
          )}
          {data.genres && data.genres.length > 0 && (
            <div className="flex flex-row items-center">
              <h3 className="text-md mt-5 rounded-lg bg-[#363636] p-2 px-5 text-gray-300">
                <span>Genre(s): </span>
                <b>{data.genres.join(', ')}</b>
              </h3>
            </div>
          )}
          {data.language && (
            <div className="flex flex-row items-center">
              <h3 className="text-md mt-5 rounded-lg bg-[#363636] p-2 px-5 text-gray-300">
                <span>Language: </span>
                <b>{data.language}</b>
              </h3>
            </div>
          )}
          {data.type && (
            <div className="flex flex-row items-center">
              <h3 className="text-md mt-5 rounded-lg bg-[#363636] p-2 px-5 text-gray-300">
                <span>Show Type: </span>
                <b>{data.type}</b>
              </h3>
            </div>
          )}
          {data.runtime && data.schedule.time && (
            <div className="flex flex-row items-center">
              <h3 className="text-md mt-5 rounded-lg bg-[#363636] p-2 px-5 text-gray-300">
                <span>Duration: </span>
                <b>{data.runtime}</b>
                <span> Min</span>
                <span> at </span>
                <b>{data.schedule.time}</b>
              </h3>
            </div>
          )}
          {data.status && (
            <div className="flex flex-row items-center">
              <h3 className="text-md mt-5 rounded-lg bg-[#363636] p-2 px-5 text-gray-300">
                <span>Status: </span>
                <b>{data.status}</b>
              </h3>
            </div>
          )}
          {data.rating.average && (
            <div className="mt-5 flex flex-row items-center gap-x-2 rounded-lg bg-[#363636] p-2 px-5">
              <h3 className="text-md text-gray-300">
                <span>Rating: </span>
              </h3>
              <Rating value={data.rating.average} />
            </div>
          )}
          {data.schedule.days && (
            <div className="flex flex-row items-center">
              <h3 className="text-md mt-5 rounded-lg bg-[#363636] p-2 px-5 text-gray-300">
                <span>Airing days: </span>
                <b>{data.schedule.days.join(', ')}</b>
              </h3>
            </div>
          )}
        </div>
        {data.officialSite && (
          <a href={data.officialSite} target="_blank">
            <button className="mt-10 w-[250px] rounded-sm bg-green-500 p-2 uppercase text-gray-100">Official Site &rarr;</button>
          </a>
        )}
      </div>
      <div className="mt-10 flex w-full flex-col items-center sm:items-start">
        <h1 className="text-3xl font-semibold text-white">Overview</h1>
        {data.summary && (
          <div className="mt-5 text-center text-xl text-gray-300 sm:px-0 sm:text-left" dangerouslySetInnerHTML={{ __html: data.summary }} />
        )}
      </div>
      <div className="w-full py-10"></div>
    </>
  )
}

export default Show

export async function getServerSideProps({ params }) {
  const res = await fetch(`https://api.tvmaze.com/shows/${params.id}`)
  const data = await res.json()

  return {
    props: {
      data,
    },
  }
}
