import { create } from "zustand";
import { Location } from "../../../infrastructure/interfaces/location.interface";
import { getCurrentLocation } from "../../../actions/location/location";


interface LocationStore {
    // properties
    lastKnowLocation: Location | null;


    // methods
    getLocation: () => Promise<Location | null>;
}


export const useLocationStore = create<LocationStore>()((set, get) => ({

    lastKnowLocation: null,

    getLocation: async () => {
        const location = await getCurrentLocation();
        set({ lastKnowLocation: location });
        return location;
    }

}))