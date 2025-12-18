import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface RejectedButtonProps {
  onReject: (reason: string) => void;
  style?: object;
}

const RejectedButton: React.FC<RejectedButtonProps> = ({ onReject, style }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim() === '') return;
    onReject(comment.trim());
    setComment('');
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.button, styles.danger, style]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Reject Ticket</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Reject Ticket</Text>

            <Text style={styles.label}>Reason for rejection</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Enter reason..."
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              autoFocus
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancel]}
                onPress={() => setModalVisible(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.confirm,
                  !comment.trim() && { opacity: 0.5 },
                ]}
                onPress={handleSubmit}
                disabled={!comment.trim()}
                activeOpacity={comment.trim() ? 0.8 : 1}
              >
                <Text style={styles.modalButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default RejectedButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#E74C3C',
    marginBottom: 0,
  },
  danger: {
    backgroundColor: '#E74C3C',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    color: '#2D3748',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#2D3748',
    minHeight: 100,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 10,
  },
  cancel: {
    backgroundColor: '#CBD5E0',
  },
  confirm: {
    backgroundColor: '#E74C3C',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
