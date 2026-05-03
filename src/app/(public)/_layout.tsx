import { Stack } from "expo-router";

export default function PublicLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        options={{
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetCornerRadius: 20,
          sheetAllowedDetents: [0.9, 1],
          sheetLargestUndimmedDetentIndex: "none",
          sheetInitialDetentIndex: 0,
        }}
        name="index"
      />
      <Stack.Screen
        options={{
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetCornerRadius: 20,
          sheetAllowedDetents: [0.9, 1],
          sheetLargestUndimmedDetentIndex: "none",
          sheetInitialDetentIndex: 0,
        }}
        name="login"
      />
      <Stack.Screen
        options={{
          presentation: "formSheet",
          sheetGrabberVisible: true,
          sheetCornerRadius: 20,
          sheetAllowedDetents: [0.9, 1],
          sheetLargestUndimmedDetentIndex: "none",
          sheetInitialDetentIndex: 0,
        }}
        name="explore"
      />
      <Stack.Screen name="(signup)/signup" />
    </Stack>
  );
}
