import { FlatList } from 'react-native';
import { products } from '../../mocks/products';
import { Text } from '../Text';

import * as S from './styles';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';

export const Menu = () => {
  return (
    <FlatList
      data={products}
      style={{ marginTop: 32 }}
      ItemSeparatorComponent={S.Separator}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      keyExtractor={(product) => product._id}
      renderItem={({ item: product }) => (
        <S.Product>
          <S.Image source={{ uri: product.imagePath }} />
          <S.ProductDetails>
            <Text weight="600">{product.name}</Text>
            <Text size={14} color="#666" style={{ marginVertical: 8 }}>
              {product.description}
            </Text>
            <Text size={14} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </S.ProductDetails>
          <S.AddToCardButton>
            <PlusCircle />
          </S.AddToCardButton>
        </S.Product>
      )}
    />
  );
};
