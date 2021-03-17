import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Storage from '../helpers/Storage';
import { encrypt, decrypt } from '../helpers/crypto';
import { v4 as uuidv4 } from 'uuid';

const bip39 = require('bip39');

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async (password, thunkAPI) => {
    try {
      const id = uuidv4();
      const at = Date.now();
      const name = 'Account 1';
      const walletMnemonic = bip39.generateMnemonic();

      const wallet = { id, name, mnemonic: walletMnemonic, at, imported: false };

      const { encrypted: encryptedWallets, keySalt } = await encrypt(
        JSON.stringify([wallet]),
        password
      );

      await Storage.setItem('EncryptedWallet', encryptedWallets);
      await Storage.setItem('LastkeySalt', keySalt);

      return encryptedWallets;
    } catch (error) {
      console.dir(error)
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const loginUser = createAsyncThunk(
//   'users/loginUser',
//   async (password, thunkAPI) => {
//     try {
//       const userKeySalt = await Storage.getItem('LastkeySalt');
//       const encryptedWallet = await Storage.getItem('EncryptedWallet');

//       const decryptedwallet = await decrypt(encryptedWallet, password, userKeySalt);

//       if (!decryptedwallet) {
//         throw new Error('Incorrect password. Try again.');
//       }

//       await Storage.setItem('UserLogged', true);
//       await Storage.setItem('LastLoginAt', Date.now());

//       const payload = { decryptedwallet: JSON.parse(decryptedwallet), at: Date.now() };

//       return payload;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const importFromSeed = createAsyncThunk(
//   'users/importFromSeed',
//   async ({ seedPhrase }, thunkAPI) => {
//     try {
//       const id = uuidv4();
//       const at = Date.now();
//       const name = 'Account 1';
//       const walletMnemonic = seedPhrase;

//       const wallet = { id, name, mnemonic: walletMnemonic, at, imported: true };

//       const { encrypted: encryptedWallets, keySalt } = await encrypt(
//         JSON.stringify([wallet]),
//         seedPhrase.toString()
//       );

//       await Storage.setItem('EncryptedWallet', encryptedWallets);
//       await Storage.setItem('LastkeySalt', keySalt);

//       return encryptedWallets;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const loginWithSeedPhrase = createAsyncThunk(
//   'users/loginWithSeedPhrase',
//   async ({ seedPhrase }, thunkAPI) => {
//     try {
//       const userKeySalt = await Storage.getItem('LastkeySalt');
//       const encryptedWallet = await Storage.getItem('EncryptedWallet');

//       const decryptedwallet = await decrypt(encryptedWallet, seedPhrase.toString(), userKeySalt);

//       if (!decryptedwallet) {
//         throw new Error('Incorrect seed. Try again.');
//       }

//       await Storage.setItem('UserLogged', true);
//       await Storage.setItem('LastLoginAt', Date.now());

//       const payload = { decryptedwallet: JSON.parse(decryptedwallet), at: Date.now() };

//       return payload;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    encryptedWallet: null,
    decryptedWallet: null,
    unlockedAt: null
  },
  reducers: {
    clearState: (state, action) => {
      console.log('state being cleaned')
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isFetching = false;
      state.isError = false;
      state.encryptedWallet = action.payload;

      console.log('signup fulfilled state action payload is success is fetching and is error', action.payload, state.isSuccess, state.isFetching, state.isError) //This need to be a state that persists through application lifecicle (maybe insert at background)
    
      return state;
    },
    [signupUser.pending]: (state, action) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;

      console.log('changing state pending sign up action', action)
      console.log('state pedingi flalala', state.isFetching)

      return state;
    },
    [signupUser.rejected]: (state, action) => {
      state.isError = true;
      state.isFetching = false;
      state.isSuccess = false;
      state.errorMessage = action.payload;

      console.log('changing state rejected action', action)
      
      return state;
    },
    // [loginUser.fulfilled]: (state, action) => {
    //   console.log('changing state fullfilled action', action)
    //   state.isFetching = false;
    //   state.isSuccess = true;
    //   state.decryptedwallet = action.payload.decryptedwallet;
    //   state.unlockedAt = action.payload.at;
    // },
    // [loginUser.rejected]: (state, action) => {
    //   console.log('changing state rejected')
    //   state.isFetching = false;
    //   state.isError = true;
    //   state.errorMessage = action.payload;

    // },
    // [loginUser.pending]: (state, action) => {
    //   console.log('changing state pending login')
    //   state.isFetching = true;
    // },
    // [importFromSeed.fulfilled]: (state, action) => {
    //   console.log('changing state import from seed create fullfilled')
    //   state.isSuccess = true;
    //   state.encryptedWallet = action.payload;
    // },
    // [importFromSeed.pending]: (state, action) => {
    //   console.log('changing state import from seed create pending')
    //   state.isFetching = false;
    // },
    // [importFromSeed.rejected]: (state, action) => {
    //   console.log('changing state import from seed create rejected')
    //   state.isFetching = false;
    //   state.isError = true;
    //   state.errorMessage = action.payload;
    // },
    // [loginWithSeedPhrase.fulfilled]: (state, action) => {
    //   console.log('changing state login with seed fullfilled')
    //   state.isFetching = false;
    //   state.isSuccess = true;
    //   state.decryptedwallet = action.payload.decryptedwallet;
    //   state.unlockedAt = action.payload.at;
    // },
    // [loginWithSeedPhrase.rejected]: (state, action) => {
    //   console.log('changing state rlogin with seed ejected', action.payload)
    //   state.isFetching = false;
    //   state.isError = true;
    //   state.errorMessage = action.payload;
    // },
    // [loginWithSeedPhrase.pending]: (state, action) => {
    //   console.log('changing state pending login with seed')
    //   state.isFetching = true;
    // },
  },
});

export const { clearState } = authSlice.actions;
export const selectUser = (state) => state.auth;

export default authSlice.reducer;
