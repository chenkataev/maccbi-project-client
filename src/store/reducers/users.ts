import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    name: string;
    email: string;
    age: number;
}

interface State {
    users: User[];
}

const initialState: State = {
    users: []
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsers(state) {

        },
        updateUsers(state, action?: PayloadAction<User[] | undefined>) {
            if (action === undefined) {
                return;
            }
            else if(action.payload === undefined){
                return
            }
            else{
                state.users = action.payload;
            }

        },
        addUser(state, action: PayloadAction<User>) {
            const { name, email, age } = action.payload
            state.users.push({ name, email, age });
        },
        deleteUser(state, action: PayloadAction<string>) {
            const userIndex = state.users.findIndex(user => user.email === action.payload)
            state.users.slice(userIndex, 1);
        },
    }
});

export const {
    updateUsers,
    addUser,
    deleteUser,
} = userSlice.actions

export default userSlice.reducer