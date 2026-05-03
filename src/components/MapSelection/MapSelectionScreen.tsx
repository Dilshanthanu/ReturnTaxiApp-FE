import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import { Check, ChevronLeft, Locate, MapPin } from "lucide-react-native";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import MapView, { Marker, Region } from "react-native-maps";
import { Modalize } from "react-native-modalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddressSearchField from "@/src/components/AddressSearch";
import BottomDrawer from "@/src/components/BottomDrawer";
import {
  DEFAULT_LATITUDE_DELTA,
  DEFAULT_LONGITUDE_DELTA,
} from "@/src/constants/Const";
import { mapDarkStyle } from "@/src/constants/MapStyle";
import { useLoaderContext } from "@/src/contexts/LoaderContext";
import { useToastContext } from "@/src/contexts/ToastContext";
import {
  AppTheme,
  useAppTheme,
  useThemeSettings,
} from "@/src/theme/ThemeContext";

export interface SelectedLocation {
  latitude: number;
  longitude: number;
  address?: string;
}

interface MapSelectionScreenProps {
  initialLocation?: SelectedLocation;
  onConfirm: (location: SelectedLocation) => void;
  onBack: () => void;
}

const MapSelectionScreen: React.FC<MapSelectionScreenProps> = ({
  initialLocation,
  onConfirm,
  onBack,
}) => {
  const { themeName } = useThemeSettings();
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = getStyles(theme, insets);
  const { t } = useTranslation();
  const mapRef = useRef<MapView>(null);
  const modalizeRef = useRef<Modalize>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocation | null>(initialLocation || null);

  const [region, setRegion] = useState<Region>({
    latitude: initialLocation?.latitude || 6.7691833,
    longitude: initialLocation?.longitude || 79.8867937,
    latitudeDelta: DEFAULT_LATITUDE_DELTA,
    longitudeDelta: DEFAULT_LONGITUDE_DELTA,
  });
  const { showLoader, hideLoader } = useLoaderContext();
  const { show } = useToastContext();

  useEffect(() => {
    if (!initialLocation) {
      getCurrentLocation();
    } else {
      const newRegion = {
        latitude: initialLocation.latitude,
        longitude: initialLocation.longitude,
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA,
      };
      setRegion(newRegion);
      setSelectedLocation(initialLocation);
      setSelectedLocation(initialLocation);
      setTimeout(() => {
        mapRef.current?.animateToRegion(newRegion, 1000);
      }, 500);
    }
  }, [initialLocation?.latitude, initialLocation?.longitude]);

  const getCurrentLocation = async () => {
    try {
      showLoader();
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        show(
          t("location_permission_denied") || "Location permission denied",
          "error",
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = location.coords;
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA,
      };

      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);

      let address = undefined;
      try {
        const geoCode = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        if (geoCode && geoCode.length > 0) {
          const place = geoCode[0];
          const addressParts = [
            place.street,
            place.city || place.subregion,
            place.region,
          ].filter(Boolean);
          if (addressParts.length > 0) {
            address = addressParts.join(", ");
          }
        }
      } catch (geocodeError) {
        console.log("Error reverse geocoding", geocodeError);
      }

      setSelectedLocation({ latitude, longitude, address });
    } catch (error: any) {
      console.log("Error getting location", error);
      show(
        t("error_fetching_location") || "Turn on device location and try again",
        "error",
      );
    } finally {
      hideLoader();
    }
  };

  const onMapPress = async (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const newRegion = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: DEFAULT_LATITUDE_DELTA,
      longitudeDelta: DEFAULT_LONGITUDE_DELTA,
    };
    setRegion(newRegion);
    let address = undefined;
    try {
      const geoCode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (geoCode && geoCode.length > 0) {
        const place = geoCode[0];
        const addressParts = [
          place.street,
          place.city || place.subregion,
          place.region,
        ].filter(Boolean);
        if (addressParts.length > 0) {
          address = addressParts.join(", ");
        }
      }
    } catch (geocodeError) {
      console.log("Error reverse geocoding", geocodeError);
    }

    setSelectedLocation({ latitude, longitude, address });
  };

  const onMapSearch = (loc: any) => {
    if (loc.latitude && loc.longitude) {
      const newRegion = {
        latitude: loc.latitude,
        longitude: loc.longitude,
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA,
      };

      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);

      setSelectedLocation({
        latitude: loc.latitude,
        longitude: loc.longitude,
        address: loc.address,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        showsUserLocation={false}
        showsMyLocationButton={false}
        userInterfaceStyle={themeName}
        customMapStyle={themeName === "dark" ? mapDarkStyle : []}
        region={region}
        onPress={onMapPress}
        zoomEnabled
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
          />
        )}
      </MapView>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} color={theme["text-basic-color"]} />
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <AddressSearchField
            onSelect={onMapSearch}
            placeholder={t("search_location")}
          />
        </View>
      </View>
      <View style={styles.myLocationContainer}>
        <TouchableOpacity
          style={styles.myLocationButton}
          onPress={getCurrentLocation}
          activeOpacity={0.8}
        >
          <Locate size={24} color={theme["color-primary-500"]} />
        </TouchableOpacity>
      </View>

      <BottomDrawer
        modalRef={modalizeRef}
        handlePosition="inside"
        modalStyle={styles.modalStyle}
        withOverlay={false}
        alwaysOpen={140}
      >
        <View style={[styles.contentContainer]}>
          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <MapPin size={24} color={theme["color-primary-500"]} />
            </View>
            <View style={styles.textColumn}>
              <Text style={styles.titleText}>{t("select_location")}</Text>
              <Text style={styles.subtitleText} numberOfLines={1}>
                {selectedLocation?.address || t("tap_map_instruction")}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.confirmIconButton,
                (!selectedLocation ||
                  selectedLocation.latitude === undefined ||
                  selectedLocation.longitude === undefined) &&
                styles.disabledConfirmBtn,
              ]}
              disabled={
                !selectedLocation ||
                selectedLocation.latitude === undefined ||
                selectedLocation.longitude === undefined
              }
              onPress={() => selectedLocation && onConfirm(selectedLocation)}
            >
              <Check size={24} color={theme["text-control-color"]} />
            </TouchableOpacity>
          </View>
        </View>
      </BottomDrawer>
    </View>
  );
};

export default observer(MapSelectionScreen);

const getStyles = (theme: AppTheme, insets: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme["background-basic-color-1"],
    },
    headerContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: insets.top + 10,
      paddingBottom: 10,
      zIndex: 10,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: theme["background-basic-color-1"],
      justifyContent: "center",
      alignItems: "center",
      marginRight: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    searchWrapper: {
      flex: 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    myLocationContainer: {
      position: "absolute",
      bottom: 160, // Sit just above the alwaysOpen height
      right: 0,
      zIndex: 20,
    },
    myLocationButton: {
      alignSelf: "flex-end",
      marginRight: 20,
      marginBottom: 16,
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme["background-basic-color-1"],
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
    modalStyle: {
      borderTopLeftRadius: 14,
      borderTopRightRadius: 14,
      overflow: "hidden",
    },
    contentContainer: {
      paddingHorizontal: 20,
      paddingTop: 12,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    iconCircle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme["color-primary-100"],
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    textColumn: {
      flex: 1,
    },
    titleText: {
      fontSize: theme["text-heading-3-font-size"],
      color: theme["text-basic-color"],
      fontFamily: theme["font-poppins-semibold"],
    },
    subtitleText: {
      fontSize: theme["text-caption-1-font-size"],
      color: theme["text-hint-color"],
      fontFamily: theme["font-poppins-regular"],
    },
    confirmIconButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme["color-primary-500"],
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 10,
    },
    disabledConfirmBtn: {
      backgroundColor: theme["color-basic-400"],
    },
  });
