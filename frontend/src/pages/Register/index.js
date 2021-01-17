import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, FormControl, Row } from 'react-bootstrap';

import backIcon from '../../assets/icons/back.svg';
import pokeLogo from '../../assets/logo-dex.png';

import './styles.css';
import api from '../../services/api';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        await api.post('/register', {
            name,
            email,
            password
        }).then(res => {
            alert('Cadastrado com sucesso!');
            history.push('/login');
        }).catch(err => {
            alert('Email já cadastrado em nossa base');
        });
    }

    return (
        <div id="Registro">
            <main>
                <Link to="/" className="text-warning w-100">
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

                <Form className="form-registro" onSubmit={handleRegister}>
                    <h3 className="text-light w-100">Fazer cadastro</h3>
                    <Form.Group as={Row} className="w-100 text-light" >
                        <Form.Label className="w-100 text-warning" htmlFor="name">Nome completo</Form.Label>
                        <FormControl
                            id="name"
                            placeholder="Nome completo"
                            type="text"

                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Row} className="w-100 text-light" >
                        <Form.Label className="w-100 text-warning" htmlFor="email">E-mail</Form.Label>
                        <FormControl
                            id="email"
                            placeholder="nome@examplo.com"
                            type="email"

                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
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
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Row} className="w-100 text-light">
                        <Form.Label className="w-100 text-warning" htmlFor="conf-senha">Confirmar senha</Form.Label>
                        <FormControl
                            id="conf-senha"
                            placeholder="Confirmar senha"
                            type="password"

                            value={confPassword}
                            onChange={e => setConfPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mt-2 w-100 text-light" as={Row}>
                        {password && confPassword !== '' && password === confPassword ?
                            <Button type="submit" variant="warning" className="w-100 bg-warning mb-3">Registrar-se</Button>
                            :
                            <Button type="submit" variant="warning" disabled className="w-100 bg-warning mb-3">Registrar-se</Button>

                        }
                        <Form.Text>Já possuo uma conta!</Form.Text>
                        <Link to="/login" className="ml-auto text-warning">Ir para Login</Link>
                    </Form.Group>
                </Form>
            </main>
        </div>
    )
}

export default Register;