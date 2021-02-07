import React from 'react';
import { useDispatch } from 'react-redux';
import { getFormFields } from '../../redux/actions';

import './styles.scss';

export const Button = ({ title, isOpen, type }) => {
    const dispatch = useDispatch();

    const handleOpen = () => {
        if(type === 'add') {
            isOpen(true);
            dispatch(getFormFields())
        }
    }
    return <button type={ type && type } className={'btn'} onClick={handleOpen}>{title}</button>
}