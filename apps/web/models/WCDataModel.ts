export interface WCDataModel {
  id: number;
  name: string;
  address: string;
  rating: number;
  ratingCount: number;
  isFree: boolean;
  isUncrowded: boolean;
  isClean: boolean;
  latitude: number;
  longitude: number;
  status: "open" | "closed" | "maintenance";
}
