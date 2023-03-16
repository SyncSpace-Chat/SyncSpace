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
  setusername: (newusername) => set({ username: newusername }),
  setpassword: (newpassword) => set({ password: newpassword }),
}));

const isLoggedInStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: () => set((state) => ({ isLoggedIn: !state.isLoggedIn })),
}));

const currentChannelStore = create((set) => ({
  currentChannel: "General",
  setCurrentChannel: (newChannel) => set({ currentChannel: newChannel }),
}));

const messagesStore = create();

//havent tested channels store
// const userChannelsStore = create(
//   persist((set) => ({
//     channels: [],
//     setChannels: (...args) =>
//       set(() => {
//         for (let arg of args) {
//           state.channels.push(arg);
//         }
//         channels: state.channels;
//       }),
//   }))
// );

export { darkModeStore, userCredentialsStore, isLoggedInStore, currentChannelStore };
