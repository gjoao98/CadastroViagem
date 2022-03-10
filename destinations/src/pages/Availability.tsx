import { useState, useEffect } from "react";

import '../styles/Availability.scss';

type ResponseType = {
    amount: number;
    amount_person: number;
    amounts: Array<{
        min_age: number;
        max_age: number;
        amount_usd: number;
        amount_brl: number;
    }>
    benefits: null;
    broker: string;
    codigo_produto: string;
    description: string;
    family_plan: boolean;
    id: string;
    image: string;
    minimum_days: number;
    plan_id: string;
    published_rate: boolean;
    quotation: number;
    rate: string;
    rate_description: string;
    url_cobertura: string; 
}

export function Availability() {
    const [response, setResponse] = useState<ResponseType[]>([]);
    useEffect(() => {
    if(localStorage.getItem('destination')) {
        const result = JSON.parse(localStorage.getItem('destination') ?? ''); 
        console.log(result);
        setResponse(result.response.items);
        }
    }, []);
    //const result = localStorage.getItem('destination');
    //const result = JSON.parse(localStorage.getItem('destination') ?? '');

    return(
        <div className="back">
            <div className="header">
                <h2>Seguradora</h2>
                <h2>Plano</h2>
                <h2>Benefícios</h2>
                <div className="header-2">
                    <h2 id="seguro">Total por segurado</h2>
                </div>
            </div>
            <div className="content" >
                {response.map(item => (
                <div key={item.id} className="options">
                    <div className="seguradora">
                        <img src={item.image} />
                    </div>
                    <div className="description">
                        <h4><strong>{item.rate_description}</strong></h4>
                        <p>{item.description}</p>
                        <button>
                            Ver cobertura completa
                            <a href={item.url_cobertura}></a>
                        </button>
                    </div>
                    <div className="price"> 
                        <h2>R$ {item.amount_person}</h2>
                        <p>por pessoa</p>
                        <button id="compra">
                            Comprar plano
                        </button>
                        <button id="carrinho">
                            Adicionar ao carrinho
                        </button>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}