import React, { RefObject, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@ui-kitten/components";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { FolderUp, Upload } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Modalize } from "react-native-modalize";
import BottomDrawer from "@/src/components/BottomDrawer";
import MediaPickerButtons from "@/src/components/MediaPickerButtons";
import ModalHeader from "@/src/components/ModalHeader/ModalHeader";
import { useToastContext } from "@/src/contexts/ToastContext";
import { AppTheme } from "@/src/theme/ThemeContext";
import { ModalHeaderProps } from "@/src/types/common/components";

interface Props extends ModalHeaderProps {
  modalRef: RefObject<Modalize | null>;
  description: string;
  onSelect: (uri: string) => void;
  imageUri?: string;
}

const DocumentUploadModal: React.FC<Props> = ({
  modalRef,
  title,
  description,
  onSelect,
  imageUri,
  handleClosePress,
  handleClearPress,
}) => {
  const theme = useTheme() as AppTheme;
  const styles = makeStyles(theme);
  const { t } = useTranslation();
  const { show } = useToastContext();
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleCapture = async () => {
    try {
      const { status: existingStatus } =
        await ImagePicker.getCameraPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        show(t("camera_permission_required"), "error");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        onSelect(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Capture document failed:", error);
      show(t("error_picking_image"), "error");
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        onSelect(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Pick image from gallery failed:", error);
      show(t("error_picking_image"), "error");
    }
  };

  return (
    <BottomDrawer
      modalRef={modalRef}
      HeaderComponent={
        <ModalHeader
          title={title}
          handleClosePress={handleClosePress}
          handleClearPress={handleClearPress}
          subTitle={description}
        />
      }
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7}>
            {imageUri || imageUri === "" ? (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: imageUri }}
                  style={styles.previewImage}
                  contentFit="cover"
                  transition={200}
                  onLoadStart={() => setIsImageLoading(true)}
                  onLoad={() => setIsImageLoading(false)}
                  onError={() => setIsImageLoading(false)}
                />
                {isImageLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator
                      size="large"
                      color={theme["color-primary-500"]}
                    />
                  </View>
                )}
              </View>
            ) : (
              <>
                <View style={styles.folderIconContainer}>
                  <FolderUp color={theme["color-warning-500"]} size={48} />
                  <View style={styles.arrowIconContainer}>
                    <View style={styles.arrowBg}>
                      <Upload
                        color={theme["background-basic-color-1"]}
                        size={14}
                      />
                    </View>
                  </View>
                </View>
                <Text style={styles.uploadText}>{t("upload_files")}</Text>
              </>
            )}
          </TouchableOpacity>
          <MediaPickerButtons
            onCameraPress={handleCapture}
            onGalleryPress={handlePickImage}
            iconSize={48}
            plusBadgeSize={14}
            fontSize={16}
          />
        </View>
      </View>
    </BottomDrawer>
  );
};

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: "100%",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme["color-basic-200"],
    },
    backText: {
      color: theme["color-danger"],
      fontFamily: theme["font-poppins-semibold"],
      fontSize: theme["text-paragraph-1-font-size"],
      width: 60,
    },
    title: {
      fontFamily: theme["font-poppins-bold"],
      fontSize: theme["text-heading-1-font-size"],
      color: theme["color-basic-700"],
      textAlign: "center",
      flex: 1,
    },
    content: {
      paddingTop: 8,
      paddingBottom: 24,
      alignItems: "center",
    },
    description: {
      fontFamily: theme["font-poppins-semibold"],
      fontSize: theme["text-paragraph-2-font-size"],
      color: theme["text-hint-color"],
      textAlign: "center",
      marginBottom: 32,
    },
    uploadBox: {
      width: "100%",
      height: 400,
      borderWidth: 2,
      borderColor: theme["color-primary-600"],
      backgroundColor: theme["color-basic-100"] || theme["color-basic-100"],
      borderStyle: "dashed",
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 32,
      overflow: "hidden",
    },
    imageContainer: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    previewImage: {
      width: "100%",
      height: "100%",
    },
    folderIconContainer: {
      position: "relative",
      marginBottom: 12,
    },
    arrowIconContainer: {
      position: "absolute",
      bottom: 0,
      right: -8,
      backgroundColor: "white",
      borderRadius: 12,
      padding: 2,
    },
    arrowBg: {
      backgroundColor: theme["color-primary-500"],
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    uploadText: {
      fontFamily: theme["font-poppins-semibold"],
      fontSize: theme["text-paragraph-1-font-size"],
      color: theme["text-hint-color"],
    },
    maxSizeText: {
      fontFamily: theme["font-poppins-regular"],
      fontSize: theme["text-caption-1-font-size"],
      color: theme["text-hint-color"],
      marginTop: 4,
    },
    // buttonGroup and children removed redundant styles
    actionCard: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 10,
    },
    verticalDivider: {
      width: 1,
      height: "80%",
      backgroundColor: theme["color-basic-200"],
    },
    iconWrapper: {
      position: "relative",
      marginBottom: 12,
    },
    // plusBadge removed redundant styles
    cardLabel: {
      fontSize: 16,
      fontFamily: theme["font-poppins-medium"],
      color: theme["color-basic-600"],
    },
  });

export default DocumentUploadModal;
