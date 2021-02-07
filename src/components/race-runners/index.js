import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewField, addNewItem } from '../../redux/actions';
import { Button } from '../button';
import Table from '../table';
import Form from '../form';

const RaceRunners = () => {
    const runners = useSelector(state => state.runners);
    const dispatch = useDispatch();

    const [ showFormDialog, setShowFormDialog ] = useState(false);

    const handleShowFormDialog = show => {
        setShowFormDialog(show)
    }

    const onSubmit = (item) => {
        dispatch(addNewItem(runners, item));
    }

    useEffect(() => {
        dispatch(addNewField(runners))
    }, [])

    return (
        <Fragment>
            <Table headers = {getHeaders(Object.keys(runners[0]))} 
                   items = {runners}
                   />
            <Form className={'race-app-form'}
                  title={'Race app form'}
                  index={0}
                  show={showFormDialog}
                  onClose={handleShowFormDialog}
                  onSubmit={onSubmit}/>
            <Button type={'add'} title={'Add new runner'} isOpen={handleShowFormDialog}/>
        </Fragment>
    )
}

const getHeaders = keys => {
    keys.shift();
    const headers = [];
    keys.forEach(header => {
        headers.push(header);
    });
    return headers;
}

export default RaceRunners;