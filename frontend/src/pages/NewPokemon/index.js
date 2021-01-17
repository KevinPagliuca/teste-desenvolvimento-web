import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import logoDex from '../../assets/logo-dex.png';

import './styles.css';
import api from '../../services/api';
import PokeApi from '../../services/PokeAPi';

const NewPokemon = () => {
    const [types, setTypes] = useState([]);
    const [weathers, setWeathers] = useState([]);

    const [Name, setName] = useState('');
    const [Pokedex_Number, setPokedex_Numbe] = useState('');
    const [Generation, setGeneration] = useState('');
    const [Evolution_Stage, setEvolution_Stage] = useState('');
    const [Evolved, setEvolved] = useState('');
    const [FamilyID, setFamilyID] = useState('');
    const [Legendary, setLegendary] = useState('');
    const [type_1, setType_1] = useState('');
    const [type_2, setType_2] = useState('');
    const [weather_1, setWeather_1] = useState('');
    const [weather_2, setWeather_2] = useState('');
    const [ATK, setATK] = useState('');
    const [DEF, setDEF] = useState('');
    const [STA, setSTA] = useState('');
    const [STAT_TOTAL, setSTAT_TOTAL] = useState('');
    const [CP_MAX, setCP_MAX] = useState('');

    const data = {
        Name,
        Pokedex_Number,
        Generation,
        Evolution_Stage,
        Evolved,
        FamilyID,
        Legendary,
        type_1,
        type_2,
        weather_1,
        weather_2,
        ATK,
        DEF,
        STA,
        STAT_TOTAL,
        CP_MAX
    };

    const history = useHistory();

    useEffect(() => {
        async function getPokemonsTypes() {
            await PokeApi.get('/type')
                .then(res => {
                    setTypes(res.data.results);
                });
        }

        async function getWeatherEffects() {
            await api.get('/weathers')
                .then(res => {
                    setWeathers(res.data);

                })
        }

        getPokemonsTypes();
        getWeatherEffects();
    }, []);

    async function handleNewPokemon(e) {
        e.preventDefault();
        await api.post('/newpokemon', data)
        .then(res => {
            history.push('/');
            alert('Pokemon cadastrado com sucesso!');
        }).catch(err => {
            alert('Ocorreu algum erro durante o cadastro, tente novamente!');
        })
    }

    function handleLogout() {
        sessionStorage.removeItem('status');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_email');
        history.push('/')
    }

    return (
        <div id="newPokemon">
            <Container className="sidemenu mt-2 justify-content-center">
                <Container className="justify-content-center">
                    <Row className="mr-auto">
                        <Col>
                            <img src={logoDex} alt="logo" width={240} className="justify-content-center" />
                        </Col>
                    </Row>
                </Container>

                <Container className="w-100 mt-5 justify-content-center">
                    <Row className="mt-4">
                        <Col>
                            <Link to="/" className="btn btn-warning w-100">Ir para página principal</Link>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <Link to="#logout" onClick={handleLogout} className="btn btn-warning w-100">Logout</Link>
                        </Col>
                    </Row>
                </Container>
            </Container>

            <Container className="m-4 newPokemon-container">
                <Row className="m-4 mr-auto ml-auto justify-content-center">

                    <Form className="w-100 text-light" onSubmit={handleNewPokemon}>
                        <h4 className="text-light text-center w-100">Cadastrar Pokemon</h4>
                        <Form.Row>
                            <Form.Group as={Col} controlId="Name">
                                <Form.Label>Nome do Pokemon<small className="ml-2 text-danger">*</small></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Exemplo: Bulbasaur"
                                    required

                                    value={Name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="Pokedex_Number" required>
                                <Form.Label>Número do Pokedex<small className="ml-2 text-danger">*</small></Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Pokedex ID"
                                    required

                                    value={Pokedex_Number}
                                    onChange={e => setPokedex_Numbe(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="Generation">
                                <Form.Label>Geração<small className="ml-2 text-danger">*</small></Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Geração do Pokemon"
                                    required

                                    value={Generation}
                                    onChange={e => setGeneration(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row className="mt-2">
                            <Form.Group as={Col} controlId="Evolution_Stage">
                                <Form.Label>Estágio de evolução</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Estágio da evolução do pokemon"

                                    value={Evolution_Stage}
                                    onChange={e => setEvolution_Stage(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="Evolved">
                                <Form.Label>Evoluído ?</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0" max="1"
                                    placeholder="Estágio da evolução do pokemon"

                                    value={Evolved}
                                    onChange={e => setEvolved(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="FamilyID">
                                <Form.Label>Família do Pokemon<small className="ml-2 text-danger">*</small></Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="FamilyID"

                                    value={FamilyID}
                                    onChange={e => setFamilyID(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="Legendary">
                                <Form.Label>Pokemon Lendário ?</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0" max="1"
                                    placeholder="Lendário ?"

                                    value={Legendary}
                                    onChange={e => setLegendary(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row className="mt-2">
                            <Form.Group as={Col} controlId="Type_1">
                                <Form.Label>Tipo primário do Pokemon <small className="ml-2 text-danger">*</small></Form.Label>
                                <Form.Control
                                    as="select"
                                    required
                                    value={type_1}
                                    onChange={e => setType_1(e.target.value)}
                                >
                                    {types.map((type, index) => (
                                        <option value={type.name} key={index}>
                                            {type.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="Type_2">
                                <Form.Label>Tipo secundário do Pokemon</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={type_2}
                                    onChange={e => setType_2(e.target.value)}
                                >
                                    <option value="">Não possui</option>
                                    {types.map((type, index) => (
                                        <option value={type.name} key={index}>
                                            {type.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="Weather_1">
                                <Form.Label>Condição Meteorológica - 1 <small className="ml-2 text-danger">*</small></Form.Label>
                                <Form.Control
                                    as="select"
                                    required
                                    value={weather_1}
                                    onChange={e => setWeather_1(e.target.value)}
                                >
                                    {weathers.map((weather, index) => (
                                        <option value={weather.weather_1} key={index}>
                                            {weather.weather_1}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="Weather_2">
                                <Form.Label>Condição Meteorológica - 2</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={weather_2}
                                    onChange={e => setWeather_2(e.target.value)}
                                >
                                    <option value="">Não possui</option>
                                    {weathers.map((weather, index) => (
                                        <option value={weather.weather_1} key={index}>
                                            {weather.weather_1}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <h4 className="text-light mt-3 mb-3 text-center w-100">Status gerais do Pokemon</h4>

                        <Form.Row>
                            <Form.Group as={Col} controlId="STAT_TOTAL">
                                <Form.Label>Status total<small className="ml-2 text-danger">*</small></Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="STAT_TOTAL"

                                    value={STAT_TOTAL}
                                    onChange={e => setSTAT_TOTAL(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="ATK">
                                <Form.Label>Força de ATK<small className="ml-2 text-danger">*</small></Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="ATK"

                                    value={ATK}
                                    onChange={e => setATK(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="Defesa">
                                <Form.Label>Defesa<small className="ml-2 text-danger">*</small></Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="DEF"

                                    value={DEF}
                                    onChange={e => setDEF(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="Legendary">
                                <Form.Label>Estimina<small className="ml-2 text-danger">*</small></Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="STA"

                                    value={STA}
                                    onChange={e => setSTA(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="Legendary">
                                <Form.Label>CP_MAX<small className="ml-2 text-danger">*</small></Form.Label>
                                <Form.Control
                                    type="number"
                                    max="5000"
                                    placeholder="CP_MAX"

                                    value={CP_MAX}
                                    onChange={e => setCP_MAX(e.target.value)}
                                />
                            </Form.Group>

                        </Form.Row>

                        <Button type="submit" variant="warning" className="w-100 mt-3 btn">Cadastrar Pokémon</Button>

                    </Form>
                </Row>
            </Container>
        </div>
    );
}

export default NewPokemon;