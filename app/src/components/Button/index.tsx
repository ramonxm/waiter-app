import { Text } from '../Text';
import * as S from './styles';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';

type ButtonProps = {
  loading?: boolean;
} & TouchableOpacityProps;

export const Button = ({
  children,
  loading,
  onPress,
  disabled,
}: ButtonProps) => {
  return (
    <S.Container onPress={onPress} disabled={disabled || loading}>
      {!loading && (
        <Text weight="600" color="#fff">
          {children}
        </Text>
      )}
      {loading && <ActivityIndicator color="#fff" />}
    </S.Container>
  );
};
