import React from "react";
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@ui-kitten/components";
import { Search, X } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { AppTheme } from "@/src/theme/ThemeContext";

interface LocationData {
  address: string | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
}

interface AddressSearchProps {
  onSelect: (location: LocationData) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

export default function AddressSearchField({
  onSelect,
  placeholder,
  style,
}: AddressSearchProps) {
  const theme = useTheme() as AppTheme;
  const styles = createThemedStyles(theme);
  const [isFocused, setIsFocused] = React.useState(false);
  const { t } = useTranslation();
  const API_KEY_PLACES = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;
  const ref =
    React.useRef<React.ElementRef<typeof GooglePlacesAutocomplete>>(null);
  const [listDisplayed, setListDisplayed] = React.useState<"auto" | boolean>(
    false,
  );
  const [searchKey, setSearchKey] = React.useState(0);

  return (
    <GooglePlacesAutocomplete
      key={searchKey}
      ref={ref}
      listViewDisplayed={listDisplayed}
      keepResultsAfterBlur={false}
      textInputProps={{
        onFocus: () => {
          setIsFocused(true);
        },
        onBlur: () => {
          setIsFocused(false);
        },
        onChangeText: (text) => {
          setListDisplayed(text ? "auto" : false);
        },
        placeholderTextColor: theme["text-hint-color"],
      }}
      placeholder={placeholder || t("search", { prop: t("your_address") })}
      debounce={400}
      fetchDetails={true}
      onPress={(data, details) => {
        const address = details?.formatted_address;
        const lat = details?.geometry.location.lat;
        const lng = details?.geometry.location.lng;

        onSelect({
          address,
          latitude: lat,
          longitude: lng,
        });
        ref.current?.blur();
        setListDisplayed(false);
      }}
      query={{
        key: API_KEY_PLACES,
        language: "en",
        components: "country:lk",
      }}
      enablePoweredByContainer={false}
      renderLeftButton={() => (
        <View style={styles.iconContainer}>
          <Search size={20} color={theme["text-hint-color"]} />
        </View>
      )}
      renderRightButton={() => (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            onSelect({
              address: undefined,
              latitude: undefined,
              longitude: undefined,
            });
            setListDisplayed(false);
            setSearchKey((prev) => prev + 1);
          }}
        >
          <X size={20} color={theme["text-hint-color"]} />
        </TouchableOpacity>
      )}
      styles={{
        container: styles.container,
        textInputContainer: [
          styles.textInputContainer,
          style,
          isFocused && { borderColor: theme["color-primary-500"] },
        ],
        textInput: styles.textInput,
        listView: styles.listView,
        row: styles.row,
        description: styles.description,
      }}
    />
  );
}

const createThemedStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {},
    textInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      minHeight: 50,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme["input-border-color"],
      backgroundColor: theme["input-background-color"],
    },
    textInput: {
      color: theme["text-basic-color"],
      fontFamily: theme["font-poppins-regular"],
      backgroundColor: "transparent",
      paddingHorizontal: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginTop: 0,
      flex: 1,
      paddingVertical: 0,
      height: 48,
    },
    iconContainer: {
      marginRight: 8,
      justifyContent: "center",
      alignItems: "center",
      height: 48,
    },
    listView: {
      position: "absolute",
      top: 60,
      zIndex: 1000,
      elevation: 1000,
      backgroundColor: theme["background-basic-color-2"],
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme["input-border-color"],
    },
    row: {
      backgroundColor: "transparent",
      padding: 13,
      height: 44,
      flexDirection: "row",
    },
    description: {
      color: theme["text-basic-color"],
      fontFamily: theme["font-poppins-regular"],
    },
  });
