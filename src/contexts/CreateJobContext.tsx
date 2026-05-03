import React, { createContext, useContext, useState, ReactNode } from "react";

interface LocationCoords {
  lat?: number;
  lng?: number;
}

interface CreateJobContextType {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (desc: string) => void;
  address: string;
  setAddress: (address: string) => void;
  buildingName: string;
  setBuildingName: (name: string) => void;
  floorNumber: string;
  setFloorNumber: (floor: string) => void;
  landmark: string;
  setLandMark: (landmark: string) => void;
  locationCoords: LocationCoords;
  setLocationCoords: (coords: LocationCoords) => void;
  tip: string;
  setTip: (tip: string) => void;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  setRegion: (region: any) => void;
  isScheduleEnabled: boolean;
  setIsScheduleEnabled: (enabled: boolean) => void;
  date: Date;
  setDate: (date: Date) => void;
  images: string[];
  setImages: (images: string[]) => void;
  resetForm: () => void;
}

const defaultRegion = {
  latitude: 6.7691833,
  longitude: 79.8867937,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const CreateJobContext = createContext<CreateJobContextType | undefined>(
  undefined,
);

export const CreateJobProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [buildingName, setBuildingName] = useState<string>("");
  const [floorNumber, setFloorNumber] = useState<string>("");
  const [landmark, setLandMark] = useState<string>("");
  const [locationCoords, setLocationCoords] = useState<LocationCoords>({});
  const [tip, setTip] = useState<string>("");
  const [region, setRegion] = useState(defaultRegion);
  const [isScheduleEnabled, setIsScheduleEnabled] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [images, setImages] = useState<string[]>([]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setAddress("");
    setBuildingName("");
    setFloorNumber("");
    setLandMark("");
    setLocationCoords({});
    setTip("");
    setRegion(defaultRegion);
    setIsScheduleEnabled(false);
    setDate(new Date());
    setImages([]);
  };

  return (
    <CreateJobContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        address,
        setAddress,
        buildingName,
        setBuildingName,
        floorNumber,
        setFloorNumber,
        landmark,
        setLandMark,
        locationCoords,
        setLocationCoords,
        tip,
        setTip,
        region,
        setRegion,
        isScheduleEnabled,
        setIsScheduleEnabled,
        date,
        setDate,
        images,
        setImages,
        resetForm,
      }}
    >
      {children}
    </CreateJobContext.Provider>
  );
};

export const useCreateJobContext = () => {
  const context = useContext(CreateJobContext);
  if (context === undefined) {
    throw new Error(
      "useCreateJobContext must be used within a CreateJobProvider",
    );
  }
  return context;
};
