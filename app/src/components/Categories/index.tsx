import { FlatList } from 'react-native';
import { Text } from '../Text';
import * as S from './styles';
import { useState } from 'react';
import { Category } from '../../types/category';

type CategoriesProps = {
  categories: Category[];
  onSelectCategory: (categoryId: string) => Promise<void>;
};

export const Categories = ({
  categories,
  onSelectCategory,
}: CategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;
    onSelectCategory(category);
    setSelectedCategory(category);
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={categories}
      contentContainerStyle={{ paddingRight: 24 }}
      keyExtractor={(category) => category._id}
      renderItem={({ item }) => {
        const isSelected = selectedCategory === item._id;

        return (
          <S.Category onPress={() => handleSelectCategory(item._id)}>
            <S.Icon>
              <Text opacity={isSelected ? 1 : 0.5}>{item.icon}</Text>
            </S.Icon>
            <Text opacity={isSelected ? 1 : 0.5} size={14} weight="600">
              {item.name}
            </Text>
          </S.Category>
        );
      }}
    />
  );
};
