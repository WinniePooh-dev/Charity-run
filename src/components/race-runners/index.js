import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewField, addNewItem } from '../../redux/actions';
import { Button } from '../button';
import Table from '../table';
import Form from '../form';
import { Pagination } from '../pagination';

const RaceRunners = () => {
    const runners = useSelector(state => state.runners);
    const dispatch = useDispatch();

    const [ showFormDialog, setShowFormDialog ] = useState(false);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ perPage ] = useState(10);
    const [ currentItems, setCurrentItems ] = useState([]);

    const handleShowFormDialog = show => {
        setShowFormDialog(show)
    }

    const onSubmit = (item) => {
        dispatch(addNewItem(runners, item));
    }

    useEffect(() => {
        dispatch(addNewField(runners));
    }, [])

    useEffect(() => {
        setCurrentItems(runners.slice(currentPage * perPage - perPage, currentPage * perPage))
    }, [runners, currentPage])

    const paginate = (event, page) => {
        event.preventDefault();
        setCurrentPage(page);
    };

    return (
        <Fragment>
            <Table headers = {getHeaders(Object.keys(runners[0]))} 
                   items = {currentItems}
                   />
            <Form className={'race-app-form'}
                  title={'Race app form'}
                  index={0}
                  show={showFormDialog}
                  onClose={handleShowFormDialog}
                  onSubmit={onSubmit}/>
            <Button type={'add'} title={'Add new runner'} isOpen={handleShowFormDialog}/>
            <Pagination itemsPerPage={perPage}
                        totalItems={runners.length}
                        paginate={paginate}
                        currentPage={currentPage}/>
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