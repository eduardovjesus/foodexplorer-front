import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiMinus, FiPlus, FiChevronLeft } from "react-icons/fi";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Ingredient } from "../../components/Ingredient";
import { api } from "../../services/api";

import receipt from "../../assets/receipt.svg";

import {
  Container,
  Main,
  Ingredients,
  ButtonBack,
  Content,
  Info,
} from "./styles";

export function Details() {
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState(null);
  const params = useParams();
  console.log(data);

  const imageURL = data && `${api.defaults.baseURL}/files/${data.image}`;

  function handleAddQuantity() {
    const newQuantity = Math.min(quantity + 1, 9);
    setQuantity(newQuantity); // Atualiza o estado de "quantity"
  }
  
  function handleRemoveQuantity() {
    const newQuantity = Math.max(quantity - 1, 1);
    setQuantity(newQuantity); // Atualiza o estado de "quantity"
  }
  

  useEffect(() => {
    async function fetchDish() {
      const response = await api.get(`/dishes/${params.id}`);
      setData(response.data);
    }

    fetchDish();
  }, []);

  return (
    <Container>
      <Header />

      <Content>
        <ButtonBack>
          <Link to="/">
            {" "}
            <FiChevronLeft size={30} />
            Voltar
          </Link>
        </ButtonBack>
        {data && (
          <Main>
            <div>
              <img src={imageURL} alt={`imagem de ${data.title}`} />
            </div>
            <div>
              <h1>{data.title}</h1>
              <p>{data.description}</p>
              <Ingredients>
                {data.ingredients.map((ingredient) => (
                  <Ingredient
                    key={String(ingredient.id)}
                    ingredient={ingredient.name}
                  />
                ))}
              </Ingredients>
              <Info>
                <strong>R$ {data.price}</strong>
                <button onClick={handleRemoveQuantity} className="btn">
                  <FiMinus size={25} />
                </button>

                <span>0{quantity}</span>

                <button onClick={handleAddQuantity} className="btn">
                  <FiPlus size={25} />
                </button>
                <div>
                  <Button
                    title="incluir"
                    image={receipt}
                  />
                </div>
              </Info>
            </div>
          </Main>
        )}
      </Content>
      <Footer />
    </Container>
  );
}
