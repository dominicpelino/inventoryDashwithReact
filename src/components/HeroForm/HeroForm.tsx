import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { 
    chooseName,
    chooseAlias,
    chooseSpecies,
    chooseDescription,
    choosePowers,
    chooseSpeed,
    chooseStrength 
} from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface HeroFormProps {
    id?:string;
    data?:{}
}

interface HeroState {
    name: string;
    price: string;
}

export const HeroForm = (props:HeroFormProps) => {
    const dispatch = useDispatch();
    let { heroData, getData } = useGetData();
    const store = useStore()
    
    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data.name} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(chooseAlias(data.alias))
            dispatch(chooseSpecies(data.species))
            dispatch(chooseDescription(data.description))
            dispatch(choosePowers(data.powers))
            dispatch(chooseSpeed(data.max_speed))
            dispatch(chooseStrength(data.max_strength))
            console.log(store.getState())

            await serverCalls.create(store.getState())
            window.location.reload();
            event.target.reset();
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Hero Name</label>
                    <Input {...register('name')} name="name" placeholder='Super Hero' />
                </div>
                <div>
                    <label htmlFor="alias">Alias</label>
                    <Input {...register('alias')} name="alias" placeholder="Clark Kent"/>
                </div>
                <div>
                    <label htmlFor="species">Species</label>
                    <Input {...register('species')} name="species" placeholder="Kryptonian"/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="Man of Steel"/>
                </div>
                <div>
                    <label htmlFor="powers">Dimensions</label>
                    <Input {...register('powers')} name="powers" placeholder="Fly"/>
                </div>
                <div>
                    <label htmlFor="max_speed">Max Speed</label>
                    <Input {...register('max_speed')} name="max_speed" placeholder="100 mph"/>
                </div>
                <div>
                    <label htmlFor="max_strength">Max Strength</label>
                    <Input {...register('max_strength')} name="max_strength" placeholder="1 Ton Lift"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}