import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/cart-item';

import * as S from './styles';
import { Text } from '../Text';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { MinusCircle } from '../Icons/MinusCircle';

type CartProps = {
  cartItems: CartItem[];
};

export const Cart = ({ cartItems }: CartProps) => {
  return (
    <FlatList
      data={cartItems}
      keyExtractor={(cartItem) => cartItem.product._id}
      showsVerticalScrollIndicator={false}
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
            <TouchableOpacity style={{ marginRight: 24 }}>
              <PlusCircle />
            </TouchableOpacity>

            <TouchableOpacity>
              <MinusCircle />
            </TouchableOpacity>
          </S.Actions>
        </S.Item>
      )}
    />
  );
};
