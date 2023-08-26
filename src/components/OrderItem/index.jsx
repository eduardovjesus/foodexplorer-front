import { useCart } from "../../hooks/cart";
import { Container, ImageWrapper, TitleWrapper, QuantityWrapper, PriceWrapper, ButtonWrapper } from "./styles";

export function OrderItem({ data }) {
  const { handleRemoveDishFromCart, paymentAccept } = useCart();

  return (
    <Container>
      <ImageWrapper>
        <img src={data.image} alt="imagem do prato" />
      </ImageWrapper>
      <TitleWrapper>{data.title}</TitleWrapper>
      <QuantityWrapper>{data.quantity}X</QuantityWrapper>
      <PriceWrapper>R$ {data.price}</PriceWrapper>
      <ButtonWrapper
        type="button"
        onClick={() => handleRemoveDishFromCart(data.id)}
        disabled={paymentAccept}
      >
        Excluir
      </ButtonWrapper>
    </Container>
  );
}
