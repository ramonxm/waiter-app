import { FlatList, Modal } from 'react-native';
import { Text } from '../Text';
import { Product } from '../../types/product';

import * as S from './styles';
import { Close } from '../Icons/Close';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';

type ProductModalProps = {
  visible: boolean;
  onClose: () => void;
  product: Product | null;
};

export const ProductModal = ({
  visible,
  onClose,
  product,
}: ProductModalProps) => {
  if (!product) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <S.Image source={{ uri: product.imagePath }}>
        <S.CloseButton onPress={onClose}>
          <Close />
        </S.CloseButton>
      </S.Image>
      <S.ModalBody>
        <S.Header>
          <Text size={24} weight="600">
            {product.name}
          </Text>
          <Text color="#666" style={{ marginTop: 8 }}>
            {product.description}
          </Text>
        </S.Header>
        {product.ingredients.length > 0 && (
          <S.IngredientsContainer>
            <Text weight="600" color="#666">
              Ingredientes
            </Text>
            <FlatList
              data={product.ingredients}
              style={{ marginTop: 16 }}
              keyExtractor={(ingredient) => ingredient._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: ingredient }) => (
                <S.Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text size={14} color="#666" style={{ marginLeft: 20 }}>
                    {ingredient.name}
                  </Text>
                </S.Ingredient>
              )}
            />
          </S.IngredientsContainer>
        )}
      </S.ModalBody>
      <S.Footer>
        <S.FooterContainer>
          <S.Price>
            <Text color="#666">Preço</Text>
            <Text size={20} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </S.Price>
          <Button>Adicionar ao pedido</Button>
        </S.FooterContainer>
      </S.Footer>
    </Modal>
  );
};
