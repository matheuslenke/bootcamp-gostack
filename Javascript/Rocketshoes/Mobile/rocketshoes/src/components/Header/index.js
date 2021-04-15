import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Wrapper,
  Container,
  Logo,
  BasketContainer,
  ItemCount,
  LogoButton,
} from './styles';

export default function Header({ navigation }) {
  const cartSize = useSelector(state => state.cart.length);

  return (
    <Wrapper>
      <Container>
        <LogoButton onPress={() => navigation.navigate('Main')}>
          <Logo />
        </LogoButton>
        <BasketContainer onPress={() => navigation.navigate('Cart')}>
          <Icon name="shopping-basket" color="#FFF" size={24} />
          <ItemCount>{cartSize || 0}</ItemCount>
        </BasketContainer>
      </Container>
    </Wrapper>
  );
}
