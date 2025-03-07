import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import './filme-info.css';
import api from '../../services/api'

function Filme(){
    const {id} = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:"d00ad2f16fdb19fd0e3d044de187e1e9",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                
            })

            
        }

        loadFilme();


        return()=>{
            console.log("COMPONENTE FOI DESMONTADO")
        }

    }, [])


    if(loading){
        return(
            <div className='filme-info'>
                <h1>CARREGANDO DETALHES</h1>
            </div>
        )
    }
    
    return(
        <div>
           <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}></img>
           <h3>Sinopse</h3>
           <span>{filme.overview}</span>
           <strong>Avaliação: {filme.vote_average} /10 </strong>

            <div className='area-buttons'>
                <button>Salvar</button>
                <button>
                    <a href='#'>
                        Trailer
                    </a>
                </button>
            </div>

           </div>
        </div>
    )
}
export default Filme;