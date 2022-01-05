import React, {useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      // Buscando a lista completa de títulos
      let list = await Tmdb.getHomeList();  
      setMovieList(list);

      // Buscando o destaques
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMediaInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }
    
    loadAll();
      
  }, []); 

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return() => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />
      
      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      
      <footer>
          Feito por <a href='https://github.com/gustavofoo'>Gustavo Silva</a> como projeto de estudo 📚<br/>
          com orientação de <a href='https://b7web.com.br/'>Bonieky Larceda</a> via <a href='https://www.youtube.com/watch?v=tBweoUiMsDg'>Clone do NETFLIX em REACTJS para Iniciantes</a> <br/>
          Direitos de imagem para <strong>Netflix</strong> <br/>
          Dados fornecidos por <strong>themoviedb.org</strong>
      </footer>

      {movieList.length <= 0 &&
        <div className='loading'>
          <img src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif' alt='Carregando'></img>
        </div>
      }
    </div>
  );
}