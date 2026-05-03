

import React, { RefObject } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { t } from 'i18next';
import { Modalize } from 'react-native-modalize';
import BottomDrawer from './BottomDrawer';
import PrimaryButton from './PrimaryButton';
import { AppTheme, useAppTheme } from '../theme/ThemeContext';

interface ConfirmationModalProps {
  modalizeRef: RefObject<Modalize>;
  title: string;
  subtitle: string;
  onCancellPress: () => void;
  onOkPress: () => void;
  okText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  modalizeRef,
  title,
  subtitle,
  onCancellPress,
  onOkPress,
  okText,
  cancelText,
  icon,
  onOpen,
  onClose,
}) => {
  const theme = useAppTheme();
  const styles = ConfirmationModalStyles(theme);
  const { height, width } = useWindowDimensions();
  const isLandscape = height < width;
  return (
    <BottomDrawer
      adjustToContentHeight
      modalStyle={[styles.modal, isLandscape && { marginHorizontal: 250 }]}
      onOpen={onOpen}
      onClose={onClose}
      FooterComponent={
        <View style={[styles.modalFooter, isLandscape && { alignItems: 'center' }]}>
          <PrimaryButton
            text={okText ?? t('remove')}
            onPress={onOkPress}
            style={{ width: '100%' }}
            type="PRIMARY"
          />
          <PrimaryButton
            text={cancelText ?? t('cancel')}
            onPress={onCancellPress}
            style={{ width: '100%' }}
            type="SECONDARY"
          />
        </View>
      }
      modalRef={modalizeRef}
    >
      <View style={styles.content}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={styles.modalHeader}>{title}</Text>
        <Text style={styles.successDescription}>{subtitle}</Text>
      </View>
    </BottomDrawer>
  );
};

export default ConfirmationModal;

const ConfirmationModalStyles = (theme: AppTheme) =>
  StyleSheet.create({
    modal: {
      backgroundColor: theme["background-basic-color-1"],
      borderRadius: 15,
      paddingBottom: 20,
    },
    modalHeader: {
      textAlign: "center",
      fontSize: theme["text-heading-3-font-size"],
      fontFamily: theme["font-poppins-bold"],
      color: theme["text-basic-color"],
      marginBottom: 10,
    },
    content: {
      paddingHorizontal: 20,
      backgroundColor: "transparent",
    },
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
    successDescription: {
      fontFamily: theme["font-poppins-regular"],
      fontSize: 14,
      textAlign: "center",
      color: theme["text-hint-color"],
      marginBottom: 20,
    },
    modalFooter: {
      gap: 10,
      paddingHorizontal: 20,
      paddingBottom: 20,
      backgroundColor: "transparent",
    },
  });

 