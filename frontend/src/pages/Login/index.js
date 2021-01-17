import React, { useState } from 'react';
import { Button, Form, FormControl, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import backIcon from '../../assets/icons/back.svg';
import pokeLogo from '../../assets/logo-dex.png';

import './styles.css';
import api from '../../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        await api.post('/login', { email, password })
            .then(res => {
                localStorage.setItem('user_id', res.data.id);
                localStorage.setItem('user_name', res.data.name);
                localStorage.setItem('user_email', res.data.email);
                sessionStorage.setItem('status', 1);
                alert('Logado com sucesso!');
                history.push('/');
            }).catch(err => {
                alert('Erro, email ou senha não conferem, tente novamente!');
            })
    }

    return (
        <div id="Login">
            <main>
                <Link to="/" className="text-warning w-100 backToInitial">
                    <img
                        src={backIcon}
                        alt="Voltar"
                        className="mr-4"
                    />
                    Voltar para página inicial
                </Link>

                <header className="header mt-1">
                    <img src={pokeLogo} width={400} alt="PokeLogo" />
                </header>

                <Form className="form-login" onSubmit={handleLogin}>
                    <h3 className="text-light w-100">Fazer Login</h3>
                    <Form.Group as={Row} className="w-100 text-light" >
                        <Form.Label className="w-100 text-warning" htmlFor="email">Email</Form.Label>
                        <FormControl
                            id="email"
                            placeholder="nome@examplo.com"
                            type="email"

                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Row} className="w-100 text-light">
                        <Form.Label className="w-100 text-warning" htmlFor="senha">Senha</Form.Label>
                        <FormControl
                            id="senha"
                            placeholder="Senha"
                            type="password"

                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mt-2 w-100 text-light" as={Row}>
                        <Button type="submit" variant="warning" className="w-100 bg-warning mb-3">Entrar</Button>
                        <Form.Text>Ainda não tem uma conta ?</Form.Text>
                        <Link to="/registro" className="ml-auto text-warning">Registrar-se</Link>
                    </Form.Group>

                </Form>
            </main>
        </div>
    )
}

export default Login;