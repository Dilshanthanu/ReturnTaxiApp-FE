import React, { ReactNode, Ref } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import { Modalize, ModalizeProps } from "react-native-modalize";
import { AppTheme, useAppTheme, useThemeSettings } from "../theme/ThemeContext";

interface BottomDrawerProps extends ModalizeProps {
  modalRef: Ref<Modalize>;
  children: ReactNode;
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  modalRef,
  children,
  ...props
}) => {
  const theme = useAppTheme();
  const { themeName } = useThemeSettings();
  const styles = bottomDrawerStyles(theme);
  const backgroundColor =
    themeName === "dark" ? "#152E40" : theme["background-basic-color-1"];

    return (
        <Modalize
            disableScrollIfPossible={false}
            adjustToContentHeight={true}
            {...props}
            onOpen={() => props.onOpen?.()}
            onClose={() => props.onClose?.()}
            ref={modalRef}
            modalStyle={[{ backgroundColor }, props.modalStyle]}
            handleStyle={{ backgroundColor: theme['color-primary-600'] }}
            FooterComponent={
        props.FooterComponent ? (
          <View style={styles.footerComponent}>{props.FooterComponent}</View>
        ) : undefined
      }
      HeaderComponent={props.HeaderComponent && props.HeaderComponent}
      scrollViewProps={{ keyboardShouldPersistTaps: "handled" }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View
          style={[
            styles.modalBody,
            { paddingTop: props.HeaderComponent ? 24 : 34 },
          ]}
        >
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modalize>
  );
};

export default BottomDrawer;

const bottomDrawerStyles = (_theme: AppTheme) =>
  StyleSheet.create({
    modalBody: {
      marginHorizontal: 16,
      paddingBottom: 14,
    },
    footerComponent: {
      marginHorizontal: 16,
      paddingVertical: 20,
    },
    // modalStyles: {
    //   borderTopStartRadius: 14,
    //   borderTopEndRadius: 14,
    //   overflow: 'hidden',
    // },
  });
