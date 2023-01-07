import React from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import {chooseDistiller, chooseAge, choosePercent, choosecolor  } from '../../redux/slices/RootSlice';
import { Input } from '../SharedComponents/Input';
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';

import { useGetData } from '../../custom-hooks';


interface BoozeFormProps {
    id?:string;
    data?:{}
}

interface boozeState {
    distiller: string;
    age: string;
    percent: string;
    color: string;
}

export const WhiskeyForm = (props:BoozeFormProps) => {
    const dispatch = useDispatch();
    const store = useStore();
    const distiller = useSelector<boozeState>(state => state.distiller);
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => {
        console.log(props.id)
        // The ! is for strictly typed Typescript stuff
        if(props.id!){
            server_calls.update(props.id!, data);
            console.log(`Updated:${data} ${props.id}`);
            console.log(data);
            setTimeout( () => {window.location.reload()}, 1000);
            event.target.reset();
        } else {
            // Dispatch basically updates our state / Redux store
            dispatch(chooseDistiller(data.distiller));
            dispatch(chooseAge(data.age));
            dispatch(choosePercent(data.percent));
            dispatch(choosecolor(data.color));
            server_calls.create(store.getState());
            setTimeout( () => {window.location.reload()}, 1000)
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="distiller">distiller</label>
                    <Input {...register('distiller')} name="distiller" placeholder='distiller'/>
                </div>
                <div>
                    <label htmlFor="age">age</label>
                    <Input {...register('age')} name="age" placeholder='age'/>
                </div>
                <div>
                    <label htmlFor="percent">Condition</label>
                    <Input {...register('percent')} name="percent" placeholder="percent"/>
                </div>
                <div>
                    <label htmlFor="color">Year</label>
                    <Input {...register('color')} name="color" placeholder='color'/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}
