import { orders } from "../../mocks/orders";
import { OrdersBoard } from "../OrdersBoard";
import * as S from "./styles";

export const Orders = () => {
  return (
    <S.Container>
      <OrdersBoard icon="🕓" title="Fila de espera" orders={orders} />
    </S.Container>
  );
};
