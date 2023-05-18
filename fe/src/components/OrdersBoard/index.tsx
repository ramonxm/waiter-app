import { Order } from "../../types/Order";
import * as S from "./styles";

type OrdersBoardProps = {
  icon: string;
  title: string;
  orders: Order[];
};

export const OrdersBoard = ({ icon, title, orders }: OrdersBoardProps) => {
  return (
    <S.Board>
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>
      <S.OrdersContainer>
        {orders.map((order) => (
          <button key={`order-${order._id}`} type="button">
            <strong>Mesa {order.table}</strong>
            <span>{order.products.length} itens</span>
          </button>
        ))}
      </S.OrdersContainer>
    </S.Board>
  );
};
