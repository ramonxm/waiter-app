import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/cart-item';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';
import { Button } from '../Button';
import * as S from './styles';
import { Product } from '../../types/product';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { useState } from 'react';

type CartProps = {
  cartItems: CartItem[];
  onAdd: (product: Product) => void;
  onDecrement: (product: Product) => void;
  onConfirmOrder: () => void;
};

export const Cart = ({ cartItems, onAdd, onDecrement, onConfirmOrder }: CartProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  function handleConfirmOrder() {
    setIsModalVisible(true);
  }

  function handleOk(){
    onConfirmOrder();
    setIsModalVisible(false);
  }

  return (
    <>
      <OrderConfirmedModal visible={isModalVisible} onOk={handleOk}/>
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 200 }}
          renderItem={({ item: cartItem }) => (
            <S.Item>
              <S.ProductContainer>
                <S.Image source={{ uri: cartItem.product.imagePath }}></S.Image>
                <S.QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </S.QuantityContainer>
                <S.ProductDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color="#666">
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </S.ProductDetails>
              </S.ProductContainer>
              <S.Actions>
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => onAdd(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </S.Actions>
            </S.Item>
          )}
        />
      )}
      <S.Summary>
        <S.TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </S.TotalContainer>
        <Button onPress={handleConfirmOrder} disabled={cartItems.length === 0}>
          Confirmar pedido
        </Button>
      </S.Summary>
    </>
  );
};
