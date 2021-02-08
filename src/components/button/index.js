import React from 'react';
import { useDispatch } from 'react-redux';
import { getFormFields } from '../../redux/actions';
import classNames from "classnames";

import './styles.scss';

const className = classNames({
    'btn': true
});

export const Button = ({ title, isOpen, type }) => {
    const dispatch = useDispatch();

    const handleOpen = () => {
        if(type === 'add') {
            isOpen(true);
            dispatch(getFormFields())
        }
    }
    return <button type={ type && type } className={className} onClick={handleOpen}>{title}</button>
}