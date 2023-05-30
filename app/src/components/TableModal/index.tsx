import { Modal, TouchableOpacity, Platform } from 'react-native';
import { Text } from '../Text';

import * as S from './styles';
import { Close } from '../Icons/Close';
import { Button } from '../Button';
import { useState } from 'react';

type TableModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
};

export const TableModal = ({ visible, onClose, onSave }: TableModalProps) => {
  const [table, setTable] = useState('');

  function handleSave() {
    setTable('');
    onSave(table);
    onClose();
  }

  return (
    <Modal transparent visible={visible} animationType="fade">
      <S.Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <S.ModalBody>
          <S.Header>
            <Text weight="600">Informe a mesa</Text>
            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </S.Header>
          <S.Form>
            <S.Input
              placeholder="Número da mesa"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              onChangeText={setTable}
            />
          </S.Form>
          <Button disabled={table.length === 0} onPress={handleSave}>
            Salvar
          </Button>
        </S.ModalBody>
      </S.Overlay>
    </Modal>
  );
};
