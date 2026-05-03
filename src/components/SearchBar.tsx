import React from "react";
import { Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "@ui-kitten/components";
import {  ListFilter, Search } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import Chip from "./Chip";
import InputField from "./Input";
import { AppTheme } from "../theme/ThemeContext";

interface FilterChip {
  label: string;
  key: string;
  onRemove: () => void;
}

interface Props extends React.ComponentProps<typeof InputField> {
  onPress?: () => void;
  onSearch?: () => void;
  onAdvancedSearch?: () => void;
  activeFilters?: FilterChip[];
}

const SearchBar: React.FC<Props> = ({
  onAdvancedSearch,
  activeFilters,
  ...rest
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();
  return (
    <View>
      <Pressable style={styles.container} onPress={rest.onPress}>
        <View style={{ flex: 1 }}>
          <InputField
            placeholder={t('search_here')}
            style={styles.input}
            accessoryRight={
              <TouchableOpacity onPress={rest.onSearch} style={styles.iconContainer}>
                <Search color={theme['color-basic-500']} />
              </TouchableOpacity>
            }
            {...rest}
          />
        </View>
        {onAdvancedSearch && (
          <View style={styles.filterButtonContainer}>
            <TouchableOpacity onPress={onAdvancedSearch} style={styles.filterButton} testID="advanced-search-button">
              <ListFilter color={theme['color-basic-500']} size={24} />
            </TouchableOpacity>
          </View>
        )}
      </Pressable>
      {activeFilters && activeFilters.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer} contentContainerStyle={styles.chipsContent}>
          {activeFilters.map((filter) => (
            <Chip
            status="primary"
              key={filter.key}
              label={filter.label}
              onDelete={filter.onRemove}
              
              variant="filled"
              size="small"
              style={{ marginRight: 8 }}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SearchBar;

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      marginBottom: 18,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 18,
      paddingRight: 18,
      paddingTop: 10,
      paddingBottom: 10,
      // backgroundColor: theme["color-primary-50"],
    },
    input: {
      borderRadius: 50,
      backgroundColor: theme["background-basic-color-1"],
      borderColor: theme["color-secondary-500"],
    },
    iconContainer: {
      height: "100%",
      minWidth: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    filterButton: {
      height: 48,
      width: 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterButtonContainer: {
      paddingLeft: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    chipsContainer: {
      paddingHorizontal: 18,
      marginBottom: 10,
    },
    chipsContent: {
      alignItems: 'center',
    }
  });
