import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';

import * as S from './styles';

export const Main = () => {
  return (
    <>
      <S.Container>
        <Header />
        <S.CategoriesContainer>
          <Categories />
        </S.CategoriesContainer>

        <S.MenuContainer>
          <Menu />
        </S.MenuContainer>
      </S.Container>
      <S.Footer>
        <S.FooterContainer></S.FooterContainer>
      </S.Footer>
    </>
  );
};
