import axios from "axios"
import { ChangeEvent, useState, FormEvent } from "react";
import { useHistory } from 'react-router-dom';

import { database } from '../services/firebase';
import '../styles/Login.scss';

interface IUser {
    user: string;
    password: string;
}

export function Login() {
    const history = useHistory();
    const [ user, setUser ] = useState<IUser>({
        user: '',
        password: ''
    });

    function updateUser(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    async function auth(e: FormEvent) {
        e.preventDefault();

        axios.post('https://ttseguros.tradetech.com.br/api/Account/authenticate', user)
        .then(async (response) => {           
            const userRef = database.ref('users');
            const firebaseUser = await userRef.push(user);
            
            console.log("retorno", response.data);
            const result = JSON.stringify(response.data);
            localStorage.setItem('token', result);
            //console.log("result", result);
            // const cabecalho = axios.defaults.headers.common.authorization = `Bearer ${result}`;
            // console.log(cabecalho);
        })
        history.push('/destinations');
    }
    
    return (
        <div className="background-auth">
            <form id="form-auth" onSubmit={auth}>
                <label>User</label>
                <input type="text" name="user" onChange={updateUser} value={user.user}/>
               
                <label>Password</label>
                <input type="password" name="password" onChange={updateUser} value={user.password}/>
                
                <button>Entrar</button>
            </form>
        </div>
    )
}