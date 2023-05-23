import { useState } from "react";
import { Order } from "../../types/Order";
import * as S from "./styles";
import { OrderModal } from "../OrderModal";

type OrdersBoardProps = {
  icon: string;
  title: string;
  orders: Order[];
};

export const OrdersBoard = ({ icon, title, orders }: OrdersBoardProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  return (
    <S.Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <S.OrdersContainer>
          {orders.map((order) => (
            <button
              key={`order-${order._id}`}
              type="button"
              onClick={() => handleOpenModal(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </S.OrdersContainer>
      )}
    </S.Board>
  );
};
