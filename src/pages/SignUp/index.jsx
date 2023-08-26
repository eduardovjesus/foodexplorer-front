import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { api } from "../../services/api";

import { Container, Form } from "./styles";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSignUp() {
    if (!name || !email || !password) {
      return setError("Preencha todos os campos");
    }

    if (password.length < 6) {
      return setError("A senha deve conter no mínimo 6 caracteres!");
    }

    setLoading(true);

    api
      .post("/users", { name, email, password })
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("Não foi possível cadastrar");
        }
        setLoading(false);
      });
  }

  return (
    <Container>
      <Header />
      <Form>
        <legend>Crie sua conta</legend>
        <Input
          type="text"
          label="name"
          title="Seu nome"
          placeholder="Exemplo: Maria da Silva"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          type="email"
          label="email"
          title="Email"
          placeholder="Exemplo: exemplo@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          label="password"
          title="Senha"
          placeholder="No mínimo 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="6"
          required
        />

        {error && <Message type="error" message={error} />}
        {loading ? (
          <Button title="Cadastrando" disabled />
        ) : (
          <Button title="Criar conta" onClick={handleSignUp} />
        )}
        <Link to="/">Já tenho uma conta</Link>
      </Form>
    </Container>
  );
}

function Header() {
  return (
    <div>
      <Logo />
      <h1>food explorer</h1>
    </div>
  );
}

function Logo() {
  return (
    <svg
      width="44"
      height="48"
      viewBox="0 0 44 48"
      fill="none"
      xmlns="<http://www.w3.org/2000/svg>"
    >
      <path
        d="M22.0318 0.216492L43.4349 12.0918V35.8425L22.0318 47.7179L0.628698 35.8425V12.0918L22.0318 0.216492Z"
        fill="#065E7C"
      />
    </svg>
  );
}

function Message({ type, message }) {
  return (
    <div className={`message ${type}`}>
      <p>{message}</p>
    </div>
  );
}

