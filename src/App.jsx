import './App.css'
import { getMovieList, searchMovie } from './api'
import { useEffect, useState } from 'react'
import Footer from './components/Footer'

function App() {

  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, [])

  const PopularMovie = () => {
    
    const color = (vote) => {
      if(vote >= 8){
          return 'green'
      }else if(vote >= 6){
          return "orange"
      }else{
          return 'red'
      }
    }

    return popularMovies.map((movie, i) => {
      
      const rating = (rate) =>{
        const rateRound = rate.toFixed(1)
        return rateRound;    
      }
      
      return (
        <div key={i}>
          <div className="container">
            <div className="movie-item rounded-lg relative overflow-hidden md:w-56 sm:w-40 w-36">
              <img src={`${import.meta.env.VITE_BASEIMGURL}/${movie.poster_path}`} alt="Film Poster" className='w-full sm:h-64 md:h-80 h-60'/>
              <div className="movie-info flex flex-row items-center justify-between py-2 px-1 mx-1">
                <div className='w-3/4'>
                  <h4 className='sm:text-sm md:text-base text-xs '>{movie.title} <p className='sm:text-sm text-xs font-semibold '>{movie.release_date.substring(0,4)}</p> </h4>
                </div>
                <div className={color(movie.vote_average)}>
                  <span className='w-1/4 rounded-md font-bold p-2 sm:text-base text-sm' > {rating(movie.vote_average)} </span>
                </div>
              </div>
              <div className="overview absolute left-0 right-0 bottom-0 p-4 max-h-full duration-300">
                <h4 className="sm:text-base text-sm font-semibold" >Overview</h4>
                <p className='md:text-sm text-xs'>{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }

  const search = async(q) => {
    if (q.length > 3){
      const query = await searchMovie(q)
      setPopularMovies(query.results)
    }
  }

  return (
    <>
      <header>
        <div className="nav-bar flex flex-wrap items-center justify-between h-16 py-0 md:px-24 px-5">
          <div className="sm:text-2xl font-bold tracking-tight">
              <a href="/">SPECTRUM</a>
          </div>
          <form id="form" className="flex lg:h-9 lg:p-1 rounded-md">
              <input type="text" placeholder="Search" id="search" className="px-2 font-medium border-none md:w-auto w-28" onChange={({target}) => search(target.value)}/>
              <button id="searchButtonElement" className="fas fa-times px-4 text-base border-none rounded md:w-auto"/>
          </form>
        </div>
      </header>

      <main>
        <div className="movie-list flex flex-wrap flex-row justify-center md:gap-3 lg:gap-6 gap-5 m-7">
            <PopularMovie />
        </div>
      </main>
      
      <Footer />
    </>
  )
}

export default App
