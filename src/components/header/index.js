import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortItems } from "../../redux/actions";
import Form from "../form";

import "./styles.scss";

const Header = ({ items }) => {
    const runners = useSelector(state => state.runners);
    const dispatch = useDispatch();

    const handleSort = e => {
        let current = e.sorting;
        let field;
        runners.forEach(runner => {
            field = Object.keys(runner).find(e => e === current)
        });
        dispatch(sortItems(sorting(items, field)))
    }

    return (
        <header className={'header'}>
            <h2>You are welcome!</h2>
            <Form className={'sorting'}
                  title={'sorting'}
                  label={'sort'}
                  modal={false}
                  index={1}
                  action={'submit'}
                  onSubmit={handleSort}
                  inline={true}/>
        </header>
    )
}

const sorting = (items, field) => {
    items.sort(function (a, b) {
        if (a[field] > b[field]) {
            return 1;
        }
        if (a[field] < b[field]) {
            return -1;
        }
        return 0;
    });
    return items;
}

export default Header;
