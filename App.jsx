import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {
  const [userData, setuserData] = useState([])
  const [index, setIndex] = useState(1)

  const getdata = async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=21`)
    setuserData(response.data)
  }

  useEffect(() => {
    getdata()
  }, [index])

  let printUserData = (
    <h3 className='text-gray-400 font-black text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      LOADING PICTURES.....
    </h3>
  )

  if (userData.length > 0) {
    printUserData = userData.map((elem, idx) => {
      return (
        <div
          key={idx}
          className='group relative w-70 h-74 bg-white/10 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-white/10 hover:border-white/30'
        >
          <a href={elem.url} target='_blank' >
            <img
              className='h-50 w-full object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300'
              src={elem.download_url}
              alt={elem.author}
            />
            <div className='p-3'>
              <h2 className='font-semibold text-white group-hover:text-yellow-300 transition-colors text-lg'>
                {elem.author}
              </h2>
              <p className='text-xs text-gray-400'>Photo by <span className='text-blue-400'>Picsum</span></p>
            </div>
          </a>

        
          <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center text-sm text-white font-medium'>

            <a
              href={elem.url}
              target='_blank'
              rel='noopener noreferrer'
              className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center'
            >
              <button className='bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-4 rounded-full shadow-md transition-transform active:scale-95'>
                View Image
              </button>
            </a>
          </div>
        </div>
      )
    })
  }

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-900 to-black text-white'>
   
      <header className='sticky top-0 z-10 backdrop-blur-md bg-black/40 border-b border-white/10'>
        <div className='flex justify-between items-center px-8 py-6'>
          <h1 className='text-2xl font-bold tracking-tight'>
            <span className='text-yellow-300'>Khanal</span>Gallery
          </h1>
          <button
            onClick={getdata}
            className='bg-purple-700 active:scale-95 transition-transform font-semibold px-6 py-3 rounded-full text-white shadow-md'
          >
            Refresh
          </button>
        </div>
      </header>

    
      <main className='flex-grow px-8 py-8'>
        <div className='flex flex-wrap justify-center gap-6'>{printUserData}</div>
      </main>

   

      <footer className='py-6 border-t border-white/10 bg-black/50 backdrop-blur-md'>
        <div className='flex justify-center items-center gap-6'>
          <button style={{opacity:index == 1 ? 0.6 : 1 }}
            className='bg-yellow-400 text-black rounded-full px-6 py-3 font-bold shadow-md hover:bg-yellow-300 active:scale-95 transition-transform'
            onClick={() => {
              if (index > 1) {
                setIndex(index - 1)
                setuserData([])
              }
            }}
          >
            Prev
          </button>

          <span className='text-xl font-semibold text-white/90'>Page {index}</span>

          <button
            className='bg-yellow-400 text-black rounded-full px-6 py-3 font-bold shadow-md hover:bg-yellow-300 active:scale-95 transition-transform'
            onClick={() => {
              setuserData([])
              setIndex(index + 1)
            }}
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  )
}

export default App
