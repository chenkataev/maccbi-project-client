import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    isLoading: boolean;
}

const initialState: State = {
    isLoading: false
}

const mainAppSlice = createSlice({
    name: 'mainApp',
    initialState,
    reducers: {
        updateIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    }
});

export const {
    updateIsLoading
} = mainAppSlice.actions

export default mainAppSlice.reducer