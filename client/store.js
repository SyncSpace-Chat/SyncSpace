import { create } from "zustand";
import { persist } from "zustand/middleware";

//JUNAID
// SLICE OF THE STORE, JUST TO CHANGE DARK MODE ON TWO PAGES. USING ZUSTAND PERSIST MIDDLEWARE, PERSISTS USER PREFERENCE THROUGH RELOAD/REFRESH
const darkModeStore = create(
  persist(
    (set) => ({
      HuH: false,
      toggleHuH: () => set((state) => ({ HuH: !state.HuH })),
    }),
    { name: "darkModePreference" }
  )
);

const userCredentialsStore = create((set) => ({
  username: "",
  password: "",
  setUsername: (newusername) => set({ username: newusername }),
  setPassword: (newpassword) => set({ password: newpassword }),
}));

const isLoggedInStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: () => set((state) => ({ isLoggedIn: !state.isLoggedIn })),
}));

const channelStore = create((set) => ({
  currentChannel: "General",
  userChannels: [],
  channels: [],
  setCurrentChannel: (newChannel) => set({ currentChannel: newChannel }),
  setUserChannels: (channelsArray) => {
    const newArray = [];
    for (let channel of channelsArray) {
      newArray.push(channel);
    }
    return set({ userChannels: newArray });
  },
  setChannels: (channelsArray) => {
    const newArray = [];
    for (let channel of channelsArray) {
      newArray.push(channel);
    }
    return set({ channels: newArray });
  },
  newChannel: "",
  setNewChannel: (newlyAddedChannel) => set({ newChannel: newlyAddedChannel }),
}));

export { darkModeStore, userCredentialsStore, isLoggedInStore, channelStore };
