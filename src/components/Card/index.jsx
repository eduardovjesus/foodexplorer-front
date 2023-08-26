import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaAngleRight } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai"; // import do ícone

import { Button } from "../Button";

import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";

import { Container } from "./styles";

export function Card({ data, ...rest }) {
  const [quantity, setQuantity] = useState(1);

  const { user } = useAuth();

  const navigate = useNavigate();

  const imageURL = `${api.defaults.baseURL}/files/${data.image}`;

  function handleAddQuantity() {
    const isGreater10 = quantity >= 9;
    if (isGreater10) {
      return;
    }

    setQuantity(quantity + 1);
  }

  function handleRemoveQuantity() {
    const isLess0 = quantity <= 1;
    if (isLess0) {
      return;
    }
    setQuantity(quantity - 1);
  }

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  function handleEditDish(id) {
    navigate(`/edit/${id}`);
  }

  return (
    <Container {...rest}>
      {user.isAdmin ? (
        <button onClick={() => handleEditDish(data.id)}>
  <       AiOutlineEdit size={25} />
        </button> 
      ) : (
        <button
          type="button"
        >
          <img/>
        </button>
      )}

      <div>
        <img src={imageURL} alt={data.title} />
      </div>

      <a
        type="button"
        onClick={
          user.isAdmin
            ? () => handleDetails(data.id)
            : () => handleDetails(data.id)
        }
      >
        <h3>
          {data.title} <FaAngleRight />
        </h3>
      </a>

      <p>{data.description}</p>
      <strong>R$ {data.price}</strong>
      {user.isAdmin ? (
        <div></div>
      ) : (
        <div>
          <button onClick={handleRemoveQuantity} className="btn">
            <FiMinus size={25} />
          </button>

          <span>0{quantity}</span>

          <button onClick={handleAddQuantity} className="btn">
            <FiPlus size={25} />
          </button>
          <Button
            title="incluir"
          />
        </div>
      )}
    </Container>
  );
}