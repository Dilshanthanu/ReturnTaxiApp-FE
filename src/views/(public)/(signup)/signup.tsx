import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useTheme } from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import {
  User,
  UserCircle,
  MapPin,
  IdCard,
  Phone,
  Lock,
  ChevronLeft,
  Car,
  Tag,
  FileText,
  X,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Dropdown from "../../../components/Dropdown";
import InputField from "../../../components/Input";
import MediaPickerButtons from "../../../components/MediaPickerButtons";
import PrimaryButton from "../../../components/PrimaryButton";
import { ThemedText } from "../../../components/themed-text";
import ThemedLayout from "../../../components/ThemedLayout";
import { AppTheme } from "../../../theme/ThemeContext";

const vehicleTypes = [
  { label: "Car", value: "car" },
  { label: "Van", value: "van" },
  { label: "Tuk Tuk", value: "tuktuk" },
  { label: "Motorcycle", value: "motorcycle" },
  { label: "SUV", value: "suv" },
];

const vehicleBrands = [
  { label: "Toyota", value: "toyota" },
  { label: "Suzuki", value: "suzuki" },
  { label: "Honda", value: "honda" },
  { label: "Nissan", value: "nissan" },
  { label: "Mitsubishi", value: "mitsubishi" },
  { label: "Bajaj", value: "bajaj" },
  { label: "TVS", value: "tvs" },
  { label: "Hyundai", value: "hyundai" },
  { label: "Micro", value: "micro" },
  { label: "Perodua", value: "perodua" },
];

export default function SignupScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useTheme() as AppTheme;

  const [role, setRole] = useState<"customer" | "driver">("customer");

  // Basic Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [idNo, setIdNo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  // Driver Specific Info
  const [vehicleNo, setVehicleNo] = useState("");
  const [vehicleType, setVehicleType] = useState<
    string | number | (string | number)[] | undefined
  >(undefined);
  const [brand, setBrand] = useState<
    string | number | (string | number)[] | undefined
  >(undefined);
  const [vehiclePhotos, setVehiclePhotos] = useState<string[]>([]);
  const [licensePhotos, setLicensePhotos] = useState<string[]>([]);

  const handlePickImage = async (
    type: "vehicle" | "license",
    useCamera: boolean,
  ) => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    };

    const result = useCamera
      ? await ImagePicker.launchCameraAsync(options)
      : await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      if (type === "vehicle") {
        setVehiclePhotos([...vehiclePhotos, result.assets[0].uri]);
      } else {
        setLicensePhotos([...licensePhotos, result.assets[0].uri]);
      }
    }
  };

  const removeImage = (type: "vehicle" | "license", index: number) => {
    if (type === "vehicle") {
      setVehiclePhotos(vehiclePhotos.filter((_, i) => i !== index));
    } else {
      setLicensePhotos(licensePhotos.filter((_, i) => i !== index));
    }
  };

  const handleSignup = () => {
    const data = {
      role,
      firstName,
      lastName,
      username,
      address,
      idNo,
      phoneNumber,
      password,
      ...(role === "driver" && {
        vehicleNo,
        vehicleType,
        brand,
        vehiclePhotos,
        licensePhotos,
      }),
    };
    console.log("Signup Data:", data);
  };

  return (
    <ThemedLayout style={styles.container}>
      <StatusBar style="auto" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerNav}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[
              styles.backBtn,
              { backgroundColor: theme["background-basic-color-2"] },
            ]}
          >
            <ChevronLeft size={24} color={theme["text-basic-color"]} />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.headerTextContainer}>
              <ThemedText type="title" style={styles.title}>
                {t("signup.title")}
              </ThemedText>
              <ThemedText
                style={[styles.subtitle, { color: theme["text-hint-color"] }]}
              >
                {t("signup.subtitle")}
              </ThemedText>
            </View>

            <View
              style={[
                styles.roleContainer,
                {
                  backgroundColor: theme["background-basic-color-2"],
                  borderColor: theme["color-basic-300"],
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.roleBtn,
                  role === "customer" && {
                    backgroundColor: theme["color-primary-500"],
                  },
                ]}
                onPress={() => setRole("customer")}
              >
                <ThemedText
                  style={[
                    styles.roleBtnText,
                    role === "customer"
                      ? { color: theme["text-control-color"] }
                      : { color: theme["text-hint-color"] },
                  ]}
                >
                  {t("signup.role_customer")}
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.roleBtn,
                  role === "driver" && {
                    backgroundColor: theme["color-primary-500"],
                  },
                ]}
                onPress={() => setRole("driver")}
              >
                <ThemedText
                  style={[
                    styles.roleBtnText,
                    role === "driver"
                      ? { color: theme["text-control-color"] }
                      : { color: theme["text-hint-color"] },
                  ]}
                >
                  {t("signup.role_driver")}
                </ThemedText>
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <InputField
                    label={t("signup.first_name")}
                    placeholder="John"
                    value={firstName}
                    onChangeText={setFirstName}
                    accessoryLeft={(props: any) => (
                      <User {...props} color={theme["color-basic-500"]} />
                    )}
                  />
                </View>
                <View style={{ width: 16 }} />
                <View style={{ flex: 1 }}>
                  <InputField
                    label={t("signup.last_name")}
                    placeholder="Doe"
                    value={lastName}
                    onChangeText={setLastName}
                    accessoryLeft={(props: any) => (
                      <User {...props} color={theme["color-basic-500"]} />
                    )}
                  />
                </View>
              </View>

              <InputField
                label={t("signup.username")}
                placeholder="johndoe"
                value={username}
                onChangeText={setUsername}
                accessoryLeft={(props: any) => (
                  <UserCircle {...props} color={theme["color-basic-500"]} />
                )}
              />
              <InputField
                label={t("signup.address")}
                placeholder="No 45, Colombo Rd"
                value={address}
                onChangeText={setAddress}
                accessoryLeft={(props: any) => (
                  <MapPin {...props} color={theme["color-basic-500"]} />
                )}
              />
              <InputField
                label={t("signup.id_no")}
                placeholder="19XXXXXXXXXX"
                value={idNo}
                onChangeText={setIdNo}
                accessoryLeft={(props: any) => (
                  <IdCard {...props} color={theme["color-basic-500"]} />
                )}
              />
              <InputField
                label={t("signup.phone")}
                placeholder="07XXXXXXXX"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                accessoryLeft={(props: any) => (
                  <Phone {...props} color={theme["color-basic-500"]} />
                )}
              />
              <InputField
                label={t("signup.password")}
                placeholder="********"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                accessoryLeft={(props: any) => (
                  <Lock {...props} color={theme["color-basic-500"]} />
                )}
              />

              {role === "driver" && (
                <View style={styles.driverForm}>
                  <View
                    style={[
                      styles.divider,
                      { backgroundColor: theme["color-basic-200"] },
                    ]}
                  />
                  <ThemedText
                    style={[
                      styles.sectionTitle,
                      { color: theme["color-primary-500"] },
                    ]}
                  >
                    Vehicle Details
                  </ThemedText>

                  <InputField
                    label={t("signup.vehicle_no")}
                    placeholder="WP KH-XXXX"
                    value={vehicleNo}
                    onChangeText={setVehicleNo}
                    accessoryLeft={(props: any) => (
                      <FileText {...props} color={theme["color-basic-500"]} />
                    )}
                  />

                  <Dropdown
                    label={t("signup.vehicle_type")}
                    data={vehicleTypes}
                    value={vehicleType}
                    onSelect={setVehicleType}
                    placeholder={t("signup.select_type")}
                    renderLeftIcon={() => (
                      <Car
                        size={20}
                        color={theme["color-basic-500"]}
                        style={{ marginRight: 8 }}
                      />
                    )}
                  />

                  <Dropdown
                    label={t("signup.brand")}
                    data={vehicleBrands}
                    value={brand}
                    onSelect={setBrand}
                    placeholder={t("signup.brand")}
                    renderLeftIcon={() => (
                      <Tag
                        size={20}
                        color={theme["color-basic-500"]}
                        style={{ marginRight: 8 }}
                      />
                    )}
                  />

                  <View style={styles.uploadSection}>
                    <ThemedText style={styles.inputLabel}>
                      {t("signup.vehicle_photos")}
                    </ThemedText>
                    <View style={styles.photoGrid}>
                      {vehiclePhotos.map((uri, index) => (
                        <View key={index} style={styles.photoWrapper}>
                          <Image source={{ uri }} style={styles.photoThumb} />
                          <TouchableOpacity
                            style={styles.removeBtn}
                            onPress={() => removeImage("vehicle", index)}
                          >
                            <X size={12} color="#FFF" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                    <MediaPickerButtons
                      onCameraPress={() => handlePickImage("vehicle", true)}
                      onGalleryPress={() => handlePickImage("vehicle", false)}
                      containerStyle={{ marginTop: 12 }}
                    />
                  </View>

                  <View style={styles.uploadSection}>
                    <ThemedText style={styles.inputLabel}>
                      {t("signup.driving_license")}
                    </ThemedText>
                    <View style={styles.photoGrid}>
                      {licensePhotos.map((uri, index) => (
                        <View key={index} style={styles.photoWrapper}>
                          <Image source={{ uri }} style={styles.photoThumb} />
                          <TouchableOpacity
                            style={styles.removeBtn}
                            onPress={() => removeImage("license", index)}
                          >
                            <X size={12} color="#FFF" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                    <MediaPickerButtons
                      onCameraPress={() => handlePickImage("license", true)}
                      onGalleryPress={() => handlePickImage("license", false)}
                      containerStyle={{ marginTop: 12 }}
                    />
                  </View>
                </View>
              )}

              <PrimaryButton
                text={t("signup.btn")}
                onPress={handleSignup}
                style={{ marginTop: 24 }}
              />
            </View>

            <View style={styles.footer}>
              <ThemedText style={styles.footerText}>
                {t("signup.already_account")}{" "}
              </ThemedText>
              <TouchableOpacity onPress={() => router.replace("/login")}>
                <ThemedText
                  style={[
                    styles.loginText,
                    { color: theme["color-primary-500"] },
                  ]}
                >
                  {t("signup.login")}
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  headerNav: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  headerTextContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  roleContainer: {
    flexDirection: "row",
    padding: 6,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 32,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  roleBtnText: {
    fontSize: 15,
    fontWeight: "700",
  },
  form: {
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 18,
  },
  driverForm: {
    marginTop: 24,
  },
  divider: {
    height: 1,
    width: "100%",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 20,
  },
  uploadSection: {
    marginBottom: 24,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  photoWrapper: {
    position: "relative",
  },
  photoThumb: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  removeBtn: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#DC2626",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  footerText: {
    fontSize: 15,
  },
  loginText: {
    fontSize: 15,
    fontWeight: "700",
  },
});
