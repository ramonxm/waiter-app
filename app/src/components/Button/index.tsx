import { Text } from '../Text';
import * as S from './styles';
import { TouchableOpacityProps } from 'react-native';

export const Button = ({
  children,
  onPress,
  disabled,
}: TouchableOpacityProps) => {
  return (
    <S.Container onPress={onPress} disabled={disabled}>
      <Text weight="600" color="#fff">
        {children}
      </Text>
    </S.Container>
  );
};
