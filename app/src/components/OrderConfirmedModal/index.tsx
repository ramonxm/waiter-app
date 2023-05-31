import { Modal } from 'react-native';
import * as S from './styles';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';

type OrderConfirmedModalProps = {
  visible: boolean;
  onOk: () => void;
};

export const OrderConfirmedModal = ({ visible, onOk }: OrderConfirmedModalProps) => {
  return (
    <Modal visible={visible} animationType="fade">
      <S.Container>
        <CheckCircle />
        <Text size={20} weight="600" color="#fff" style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>
        <Text color="#fff" opacity={0.9} style={{ marginTop: 8 }}>
          O pedido já entrou na fila de produção!
        </Text>
        <S.OkButton onPress={onOk}>
          <Text color="#D73035" weight="600">
            OK
          </Text>
        </S.OkButton>
      </S.Container>
    </Modal>
  );
};
