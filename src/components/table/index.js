import React, { Component } from 'react';

import './styles.scss';

export default class Table extends Component {
    render() {
        const { headers, items } = this.props;
        return (
            <table>
                <thead>
                    <tr>
                        {headers.map((header, idx) => {
                            return <th key={idx}>{header}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {Object.values(items).map(item => {
                        const { id, ...rest } = item;
                        return <tr key={id}>
                            {Object.entries(rest).map(([key, value]) => {
                                return <td aria-label={key} key={key}>{value}</td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
        )
    }
}