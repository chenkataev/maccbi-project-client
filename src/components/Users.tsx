/** @jsx jsx */
import React, { FC, useEffect, useState } from 'react';
import { css, jsx } from '@emotion/react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TableSortLabel } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../store/reducers/users';
import useSortableData from '../hooks/useSortableData';



const Users: FC = () => {

    const storeUsers = useSelector((state: any) => state.usersReducer.users);
    const { users, requestSort, sortConfig } = useSortableData(storeUsers, 'email');

    interface Headers {
        key: keyof User,
        label: string;
    }

    const headers: Headers[] = [
        {
            key: 'name',
            label: 'Name'
        },
        {
            key: 'email',
            label: 'Email'
        },
        {
            key: 'age',
            label: 'Age'
        }
    ]

    const tableContainer = css`
        display: flex;
        margin-left: 34%;
        align-items: center;
        margin-top: 10%;
        width: 30%;
    `;

    return (
        <div css={tableContainer}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map(header => (
                            <TableCell key={header.key}>
                                <TableSortLabel
                                    active={sortConfig.key === header.key}
                                    direction={sortConfig.key === header.key ? sortConfig.direction : 'asc'}
                                    onClick={() => requestSort(header.key)}
                                >
                                    {header.label}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user: User) => (
                        <TableRow key={user.name}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.age}</TableCell>
                            <TableCell>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div >
    )
}

export default Users;