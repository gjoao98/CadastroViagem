import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";

import { database } from "../services/firebase";
import '../styles/Destinations.scss';

interface IDestiny {
    destination: string;
    destinationCode: string;
    from: Date;
    to: Date;
    adult: number;
    children: number;
}

export function Destinations() {
    const history = useHistory();
    const [ destiny, setDestiny ] = useState({
        destination: '',
        destinationCode: '',
        from: '2021-10-18T02:03:53.213Z',
        to: '2021-10-18T02:03:53.213Z',
        adult: 0,
        children: 0
    })

    async function SearchDestinations(e: FormEvent) {
        e.preventDefault();

        axios.post("https://ttseguros.tradetech.com.br/api/Availability", destiny, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }) 
        .then(async (response) => {
            const destinyRef = database.ref('destinations');
            const firebaseDestiny = await destinyRef.push(destiny);

            const result = JSON.stringify(response.data);
            localStorage.setItem('destination', result);

            console.log("retorno", response.data);
        })
        history.push('/availability')
    }

    function updateSearch<T extends HTMLInputElement | HTMLSelectElement>(e: ChangeEvent<T>) {
        setDestiny({
            ...destiny,
            adult: Number(destiny.adult),
            children: Number(destiny.children),
            [e.target.name]: e.target.value
        })
    }

    function selectPeople(e: ChangeEvent<HTMLSelectElement>) {
        setDestiny({
            ...destiny,
            adult: Number(destiny.adult),
            children: Number(destiny.children),
            [e.target.name]: parseInt(e.target.value)
        })
    }

    function selectOption(e: ChangeEvent<HTMLSelectElement>) {
        const target = e.target;
        const option = target.selectedOptions[0];

        setDestiny({
            ...destiny,
            destinationCode: option.dataset.code ?? '',
            [target.name]: target.value
        });
    }

    // const data = JSON.stringify(destiny);
    // console.log(data);

    useEffect(() => {
        console.log(destiny);
    }, [destiny]);

    return(
        <div className="background">
            <form id="form-search" onSubmit={SearchDestinations}>
                <label>Destino</label>
                <select className="form-control" name="destination" onChange={selectOption}>
                    <option>Destino</option>
                    <option data-code="AMN" value="América do Norte">América do Norte</option>
                    <option data-code="AMS" value="América do Sul">América do Sul</option>
                    <option data-code="AMC" value="América Central">América Central</option>
                    <option data-code="EUR" value="Europa">Europa</option>
                    <option data-code="AFR" value="África">África</option>
                    <option data-code="ASI" value="Ásia">Ásia</option>
                    <option data-code="OCE" value="Oceania">Oceania</option>
                    <option data-code="CRU" value="Cruzeiro">Cruzeiro</option>
                </select>

                <label>Data Partida</label>
                <input type="date" name="from" id="from" onChange={updateSearch}/>

                <label>Data Retorno</label>
                <input type="date" name="to" id="to" onChange={updateSearch}/>
                
                <label id="adults" >Adultos</label>
                <select className="form-control" name="adult" onChange={selectPeople}>
                    <option>Adultos</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>

                <label>Crianças</label>
                <select className="form-control" name="children" onChange={selectPeople}>
                    <option>Crianças</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>

                <button>Pesquisar</button>
            </form>
        </div>
    )
}