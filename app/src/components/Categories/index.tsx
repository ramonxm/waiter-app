import { FlatList } from 'react-native';
import { categories } from '../../mocks/categories';
import { Text } from '../Text';
import * as S from './styles';

export const Categories = () => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={(category) => category._id}
      renderItem={({ item }) => (
        <S.Category>
          <S.Icon>
            <Text>{item.icon}</Text>
          </S.Icon>
          <Text size={14} weight="600">
            {item.name}
          </Text>
        </S.Category>
      )}
    />
  );
};
