import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@ui-kitten/components";
import { FileText, X } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { AppTheme } from "@/src/theme/ThemeContext";
import { ChatAttachment } from "@/src/utils/chatAttachments";

type Props = {
  file: ChatAttachment | null;
  onRemove: () => void;
};

export default function AttachmentPreview({ file, onRemove }: Props) {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();
  if (!file) return null;
  const isImage = file?.mimeType?.startsWith("image");
  return (
    <View style={styles.container}>
      {isImage ? (
        <Image source={{ uri: file.uri }} style={styles.image} />
      ) : (
        <View style={styles.fileRow}>
          <FileText size={28} color={theme["text-basic-color"]} />
          <Text numberOfLines={1} style={styles.fileName}>
            {file.name ?? t("file")}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
        <X size={16} color={theme["background-basic-color-1"]} />
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: 10,
      borderTopWidth: 1,
      borderColor: theme["color-basic-50"],
      backgroundColor: theme["color-basic-100"],
      position: "relative",
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 8,
    },
    fileRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    fileName: {
      marginLeft: 8,
      maxWidth: 200,
      color: theme["text-basic-color"],
    },
    removeBtn: {
      position: "absolute",
      top: 6,
      right: 6,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme["text-basic-color"],
      alignItems: "center",
      justifyContent: "center",
    },
  });
