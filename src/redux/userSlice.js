// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const fetchUserData = createAsyncThunk(
//   "user/fetchUserData",
//   async () => {
//     try {
//       const storedName = await AsyncStorage.getItem("userName");
//       const storedImage = await AsyncStorage.getItem("profileImage");
//       return {
//         userName: storedName || "Guest",
//         profileImage: storedImage
//           ? { uri: storedImage }
//           : require("../assets/woman.png"),
//       };
//     } catch (error) {
//       console.error("Error fetching user data", error);
//       return {
//         userName: "Guest",
//         profileImage: require("../assets/woman.png"),
//       };
//     }
//   }
// );

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     userName: "Guest",
//     profileImage: require("../assets/woman.png"),
//   },
//   reducers: {
//     updateUserName: (state, action) => {
//       state.userName = action.payload;
//       AsyncStorage.setItem("userName", action.payload);
//     },
//     updateProfileImage: (state, action) => {
//       state.profileImage = { uri: action.payload };
//       AsyncStorage.setItem("profileImage", action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchUserData.fulfilled, (state, action) => {
//       state.userName = action.payload.userName;
//       state.profileImage = action.payload.profileImage;
//     });
//   },
// });

// export const { updateUserName, updateProfileImage } = userSlice.actions;
// export default userSlice.reducer;
