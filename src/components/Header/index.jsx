import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiLogOut, FiMenu, FiX } from "react-icons/fi";

import logo from "../../assets/logo.svg";
import receipt from "../../assets/receipt.svg";
import { useAuth } from "../../hooks/auth";

import {
  Container,
  Content,
  Logo,
  Nav,
  Favorites,
  NewDish,
  Search,
  Button,
  Logout,
} from "./styles";

export function Header({ search, functionButton }) {
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  function handleGoToNew() {
    navigate("/new");
  }

  return (
    <Container>
      <Content>
        <Logo to="/">
          <img src={logo} alt="polígono azul" />
          <strong>food explorer</strong>
        </Logo>

        <Nav isVisible={menuIsVisible}>
          <Search>
            {<FiSearch size={20} />}
            <input
              type="text"
              placeholder="Busque pelas opções de pratos"
              onChange={(e) => {
                search(e.target.value);
              }}
            />
          </Search>
          
          {user.isAdmin ? (
            <Button type="button" onClick={handleGoToNew}>
            Novo Prato
          </Button>
          ) : (
            <Button type="button">
              Meus pedidos
            </Button>
          )}

          <Logout to="/" onClick={signOut}>
            <FiLogOut />
          </Logout>
        </Nav>

        <button type="button" onClick={() => setMenuIsVisible(!menuIsVisible)}>
          {menuIsVisible ? <FiX /> : <FiMenu />}
        </button>
      </Content>
    </Container>
  );
}
