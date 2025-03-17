// // filepath: /C:/Users/User/Desktop/פרקטיקום/ReactClient/src/redux/slices/imageSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface ImageState {
//   images: any[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ImageState = {
//   images: [],
//   loading: false,
//   error: null,
// };

// const imageSlice = createSlice({
//   name: 'images',
//   initialState,
//   reducers: {
//     fetchImagesStart(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchImagesSuccess(state, action: PayloadAction<any[]>) {
//       state.loading = false;
//       state.images = action.payload;
//     },
//     fetchImagesFailure(state, action: PayloadAction<string>) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const { fetchImagesStart, fetchImagesSuccess, fetchImagesFailure } = imageSlice.actions;
// export default imageSlice.reducer;


// filepath: /C:/Users/User/Desktop/פרקטיקום/ReactClient/src/redux/slices/imageSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '../store';

interface ImageState {
  images: any[];
  loading: boolean;
  error: string | null;
  uploadSuccess: boolean | null;
  uploading: boolean;
}

const initialState: ImageState = {
  images: [],
  loading: false,
  error: null,
  uploadSuccess: null,
  uploading: false,
};

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    fetchImagesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchImagesSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.images = action.payload;
    },
    fetchImagesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    uploadFileStart(state) {
      state.uploading = true;
      state.uploadSuccess = null;
      state.error = null;
    },
    uploadFileSuccess(state) {
      state.uploading = false;
      state.uploadSuccess = true;
    },
    uploadFileFailure(state, action: PayloadAction<string>) {
      state.uploading = false;
      state.uploadSuccess = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchImagesStart,
  fetchImagesSuccess,
  fetchImagesFailure,
  uploadFileStart,
  uploadFileSuccess,
  uploadFileFailure,
} = imageSlice.actions;



export const uploadFile = (file: File) => async (dispatch: AppDispatch) => {
  dispatch(uploadFileStart());
  const formData = new FormData();
  formData.append('file', file);

  try {
    const currentChallengeResponse = await axios.get('http://localhost:5131/api/Challenge/current');
    const challengeId = currentChallengeResponse.data;
    const userId = localStorage.getItem('userId');

    if (!userId || !challengeId) {
      throw new Error("User ID or Challenge ID is missing");
    }

    await axios.post(`http://localhost:5131/api/Upload/upload-file/${userId}/${challengeId}`, formData
    // , {
    //   headers: { "Content-Type": "multipart/form-data" },
    // }
);

    dispatch(uploadFileSuccess());
    const imagesResponse = await axios.get('http://localhost:5131/api/Image');
    dispatch(fetchImagesSuccess(imagesResponse.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(uploadFileFailure(error.response?.data?.message || error.message));
    } else {
      dispatch(uploadFileFailure((error as Error).message));
    }
  }
};


export const fetchImages = (challengeId: number) => async (dispatch: AppDispatch) => {
    dispatch(fetchImagesStart());
    try {
      const response = await axios.get(`http://localhost:5131/api/Image/${challengeId}`);
      dispatch(fetchImagesSuccess(response.data));
    } catch (error) {
      dispatch(fetchImagesFailure((error as Error).message));
    }
  };

export default imageSlice.reducer;