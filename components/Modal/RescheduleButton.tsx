import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface RescheduleButtonProps {
  onConfirm: (date: Date, reason: string) => void;
  style?: object;
}

const RescheduleButton: React.FC<RescheduleButtonProps> = ({ onConfirm, style }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState<Date>(new Date());
  const [rescheduleComment, setRescheduleComment] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const confirmReschedule = () => {
    if (!rescheduleComment.trim()) return;
    onConfirm(rescheduleDate, rescheduleComment.trim());
    setRescheduleComment('');
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={openModal} style={[styles.button, style]}>
        <Text style={styles.buttonText}>Reschedule</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Reschedule Ticket</Text>

            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>{rescheduleDate.toDateString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={rescheduleDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                minimumDate={new Date()}
                onChange={(_, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setRescheduleDate(selectedDate);
                  }
                }}
              />
            )}

            <Text style={styles.inputLabel}>Reason for reschedule</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Enter reason..."
              value={rescheduleComment}
              onChangeText={setRescheduleComment}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              autoFocus
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancel]}
                onPress={closeModal}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.confirm,
                  !rescheduleComment.trim() && { opacity: 0.5 },
                ]}
                onPress={confirmReschedule}
                disabled={!rescheduleComment.trim()}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default RescheduleButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F39C12',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
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
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 15,
    color: '#2D3748',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 6,
    marginTop: 12,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#2D3748',
    minHeight: 80,
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
    backgroundColor: '#F39C12',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
