import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, FormGroup, Container, Card, Row, Col, Button } from 'react-bootstrap';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';

import { pad } from '../../utils/pokedex_number';

import pokeLogo from '../../assets/logo-dex.png';

import './styles.css';
import api from '../../services/api';

const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [counter, setCounter] = useState(0);
    const lastPage = Math.ceil(counter / 20);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    const session = sessionStorage.getItem('status');

    useEffect(() => {
        async function getPokemons() {
            await api.get(`/pokemons?page=${page}`)
                .then(res => {
                    setPokemons(res.data[1]);
                    setCounter(res.data[0].total);
                }).catch(err => {
                    alert(err);
                });
        }

        async function Procurar() {
            await api.post('/search', { SearchWord: search })
                .then(res => {
                    if (res.data) {
                        setPokemons(res.data);
                    }
                }).catch(err => {
                    alert(err);
                })
        }

        if (search !== '') {
            Procurar();
        } else {
            getPokemons();
        }
    }, [search, page]);

    function handleLogout() {
        sessionStorage.removeItem('status');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_email');
        window.location.reload();
    }

    return (
        <div id="home">
            <header className="header-menu">
                <Navbar>

                    <Link className="navbar-brand" to="/">
                        <img
                            src={pokeLogo}
                            alt="Pokemon-Logo"
                            width={200}
                        />
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    <Nav className="w-100 justify-content-end">
                        {session === "1" ?
                            <>
                                <Link to="/novoPokemon" className="nav-link btn btn-warning text-dark">Cadastros</Link>
                                <Link to="#Logout" className="nav-link btn btn-warning text-dark" onClick={handleLogout}>Logout</Link>
                            </>
                            :
                            <Link to="/login" className="nav-link btn btn-warning text-dark">Login / Registro</Link>
                        }
                    </Nav>
                </Navbar>
            </header>

            <Form onSubmit={() => { }} inline className="search-box d-flex justify-content-center">
                <FormGroup>
                    <FormControl type="text" placeholder="Buscar ID ou Nome" value={search} onChange={e => setSearch(e.target.value)} />
                    <FaSearch size={22} className="text-warning search-icon" />
                </FormGroup>
            </Form>

            <Container className="text-light mt-4 mb-4">
                <Row >
                    {pokemons.map(pokemon => (
                        <Col
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            xl={3}
                            key={pokemon.id}
                            className="text-light mb-3"
                        >
                            <Card className="text-light bg-dark">
                                <Card.Body>
                                    <Card.Title className="text-center">{pokemon.Name}</Card.Title>
                                    <img
                                        src={"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +
                                            pad(pokemon.Pokedex_Number, 3) + ".png"}
                                        alt="pokemon_img"
                                        className="w-100"

                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            {counter > 20 && search === '' ?
                <Container>
                    <Row className='justify-content-center'>
                        {page - 2 > 1 ?
                            <Button variant="warning" className="ml-3" onClick={() => setPage(1)}>
                                Primeira Página
                            </Button>
                            :
                            null
                        }

                        {page !== 1 ?
                            <Button variant="warning" className="ml-3" onClick={() => setPage(page - 1)}>
                                <FaArrowLeft />
                            </Button>
                            :
                            null
                        }

                        {page - 2 > 0 ?
                            <Button variant="warning" className="ml-3" onClick={() => setPage(page - 2)}>
                                {page - 2}
                            </Button>
                            :
                            null
                        }

                        {page - 1 > 0 ?
                            <Button variant="warning" className="ml-3" onClick={() => setPage(page - 1)}>
                                {page - 1}
                            </Button>
                            :
                            null
                        }

                        <Button variant='secondary' className='ml-3'>
                            {page}
                        </Button>

                        {page + 1 < lastPage ?
                            <Button variant="warning" className="ml-3" onClick={() => setPage(page + 1)}>
                                {page + 1}
                            </Button>
                            :
                            null
                        }

                        {page + 2 < lastPage ?
                            <Button variant="warning" className="ml-3" onClick={() => setPage(page + 2)}>
                                {page + 2}
                            </Button>
                            :
                            null
                        }

                        {page !== lastPage ?
                            <Button variant="warning" className="ml-3" onClick={() => setPage(lastPage)}>
                                Ultima página
                            </Button>
                            :
                            null
                        }


                    </Row>
                </Container>
                :
                null
            }
        </div>
    )
}
export default Home;