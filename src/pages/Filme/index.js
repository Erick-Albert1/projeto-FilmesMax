import { useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme-info.css';
import api from '../../services/api'
import { toast } from 'react-toastify'

function Filme(){
    const {id} = useParams();
    const navigate = useNavigate();

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
                navigate("/" ,{replace: true});
                return;
            })

            
        }

        loadFilme();


        return()=>{
            console.log("COMPONENTE FOI DESMONTADO")
        }

    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeMax");
        
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)
        if(hasFilme){
            toast.warn("Esse filme já está na sua lista!")
            return;
        }
        filmesSalvos.push(filme);
        localStorage.setItem("@primeMax" , JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso!")
    }

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
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel='external' href={`https://youtube.com/results?search_query=${filme.title} trailer`}>
                        Trailer
                    </a>
                </button>
            </div>

           </div>
        </div>
    )
}
export default Filme;