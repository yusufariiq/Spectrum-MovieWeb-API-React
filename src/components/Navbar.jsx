export default function Navbar(){

    const [popularMovies, setPopularMovies] = useState([]);
    
    useEffect(() => {
        getMovieList().then((result) => {
        setPopularMovies(result)
        })
    }, []);

    const search = async(q) => {
        if (q.length > 3){
          const query = await searchMovie(q)
          setPopularMovies(query.results)
        }
    }
    
    return (
        <header>
            <div className="nav-bar flex flex-wrap items-center justify-between h-16 py-0 px-24">
            <div className="text-2xl font-bold tracking-tight">
                <a href="/">
                    <h2>SPECTRUM</h2>
                </a>
            </div>
            <div className="search-icon"><span className="fas fa-search hidden"></span></div>
            <div className="cancel-icon w-10 text-center mx-12 text-lg cursor-pointer hidden"><span className="fas fa-times"></span></div>
            <form id="form" className="flex h-9 p-1 rounded-md">
                <input type="text" placeholder="Search" id="search" className="px-2 font-medium border-none" onChange={({ target }) => search(target.value)}/>
                <button id="searchButtonElement" className="fas fa-search px-4 text-base border-none rounded" disabled/>
            </form>
            </div>
        </header>
    )
}