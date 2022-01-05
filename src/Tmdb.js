const API_KEY = 'bfd6d9b4c96a5f7e4f9a5e2c00b2a22a';
const API_BASE = 'https://api.themoviedb.org/3';

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`); 
    const json = await req.json();
    return json; 
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`),
            },

            {
                slug: 'trending',
                title: 'Recomendados para você',
                items:  await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`),
            },
             
            {
                slug: 'toprated',
                title: 'Em alta',
                items:  await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`),  
            }, 

            {
                slug: 'action',
                title: 'Ação',
                items:  await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`),
            }, 

            {
                slug: 'comedy',
                title: 'Comédia',
                items:  await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`),
            },

            {
                slug: 'horror',
                title: 'Terror',
                items:  await basicFetch(`/discover/movie?with_genres=37&language=pt-BR&api_key=${API_KEY}`),
            },

            {
                slug: 'scifi',
                title: 'Sci-Fi',
                items:  await basicFetch(`/discover/movie?with_genres=878&language=pt-BR&api_key=${API_KEY}`),
            }, 

            {
                slug: 'romance',
                title: 'Romance',
                items:  await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`),
            },

        ]
    },

    getMediaInfo: async (mediaId, type) => {
        let info = {};
        
        if(mediaId){
            switch(type){
                case 'movie':
                    info = await basicFetch(`/movie/${mediaId}?language=pt-BR&api_key=${API_KEY}`);    
                break;
        
                case 'tv':
                    info = await basicFetch(`/tv/${mediaId}?language=pt-BR&api_key=${API_KEY}`);
                break;        

                default:
                    info = null;
                break;
            }


         return(info);       

        }
    }
}