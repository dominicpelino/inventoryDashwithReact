import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'classic hero',
        alias: 'fake name',
        species: 'human',
        description: 'powerful hero',
        powers: 'speed, strength',
        max_speed: '100mph',
        max_strength: '1 ton lift'
    },

    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        chooseAlias: (state, action) => { state.alias = action.payload},
        chooseSpecies: (state, action) => { state.species = action.payload},
        chooseDescription: (state, action) => { state.description = action.payload},
        choosePowers: (state, action) => { state.powers = action.payload},
        chooseSpeed: (state, action) => { state.max_speed = action.payload},
        chooseStrength: (state, action) => { state.max_strength = action.payload}

    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName, chooseAlias, chooseSpecies, chooseDescription, choosePowers, chooseSpeed, chooseStrength } = rootSlice.actions;