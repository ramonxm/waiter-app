import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Empty } from '../components/Icons/Empty';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Text } from '../components/Text';
import { CartItem } from '../types/cart-item';
import { Category } from '../types/category';
import { Product } from '../types/product';
import * as S from './styles';
import { api } from '../services/api';

export const Main = () => {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    Promise.all([api.get('categories'), api.get('products')]).then(
      ([categoryResponse, productsResponse]) => {
        setCategories(categoryResponse.data);
        setProducts(productsResponse.data);
        setIsLoading(false);
      }
    );
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId
      ? 'products'
      : `categories/${categoryId}/products`;

    const { data } = await api.get(route);
    setProducts(data);
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      if (itemIndex < 0) {
        return prevState.concat({ quantity: 1, product });
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newCartItems;
    });
  }

  return (
    <>
      <S.Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />
        {isLoading ? (
          <S.CenteredContainer>
            <ActivityIndicator color="#d73035" size="large" />
          </S.CenteredContainer>
        ) : (
          <>
            <S.CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </S.CategoriesContainer>
            {products.length > 0 ? (
              <S.MenuContainer>
                <Menu onAddToCart={handleAddToCart} products={products} />
              </S.MenuContainer>
            ) : (
              <S.CenteredContainer>
                <Empty />
                <Text color="#666" style={{ marginTop: 24 }}>
                  Nenhum produto foi encontrado!
                </Text>
              </S.CenteredContainer>
            )}
          </>
        )}
      </S.Container>
      <S.Footer>
        {/* <S.FooterContainer> */}
        {!selectedTable && (
          <Button
            onPress={() => setIsTableModalVisible(true)}
            disabled={isLoading}
          >
            Novo Pedido
          </Button>
        )}
        {selectedTable && (
          <Cart
            cartItems={cartItems}
            onAdd={handleAddToCart}
            onDecrement={handleDecrementCartItem}
            onConfirmOrder={handleResetOrder}
          />
        )}
        {/* </S.FooterContainer> */}
        <TableModal
          visible={isTableModalVisible}
          onClose={() => setIsTableModalVisible(false)}
          onSave={handleSaveTable}
        />
      </S.Footer>
    </>
  );
};
