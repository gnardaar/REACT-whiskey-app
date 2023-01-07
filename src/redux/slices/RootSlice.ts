import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        distiller: 'Distiller',
        age: 'Age',
        percent: 'Percent',
        color: 'Color',
    },
    reducers: {
        chooseDistiller: (state, action) => { state.distiller = action.payload},
        chooseAge: (state, action) => { state.age = action.payload},
        choosePercent: (state, action) => { state.percent = action.payload},
        choosecolor: (state, action) => { state.color = action.payload},
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseDistiller, chooseAge, choosePercent, choosecolor } = rootSlice.actions;

// A reducer is like an event listener that handles the events based on the kind of event it receives