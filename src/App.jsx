import React, { useState, useEffect } from 'react'
import './index.css'
import Search from './components/Search'
import Spinners from './components/Spinners';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';



const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDNiODFhNGZiOGNlMDZkNzNhN2FiZTNkN2JhM2Q5MCIsIm5iZiI6MTc0OTk0Mjg3MC4wMjQ5OTk5LCJzdWIiOiI2ODRlMDI1NmVmNTQ2Yzk1YzUyOTRjMWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RTn11d2IyD9mJQLcP531ni3LjkcR_X8tst_V6kvn6hM`
  }
}

const App = (query = '') => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, 
  [searchTerm])
  

  const fetchMovies = async (query = '') => {
    setIsloading(true);
    setErrorMessage('');
    try{
      const endpoint = query 
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
        
      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok){
        throw new Error('Failed to fetch movies')
      }
      const data = await response.json();

      if(data.response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);

    } catch(error) {
      console.log(`error fetching error :${error}`);
      setErrorMessage('Error fetching movies, please try again later. ');
    } finally{
      setIsloading(false);
    }
  }


  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  return (

    <main>

      <div className="pattern" />
      <div className="wrapper">
        <header>
          
          <h1>
            <img src="./hero.png" alt="Hero Banner"/>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>
          {isLoading ? (
            <Spinners />
          ): errorMessage? (
            <p className='text-red-500'>{errorMessage}</p>
          ):(
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}

        </section>

        
        
        
      </div>

    </main>

  )
}

export default App
