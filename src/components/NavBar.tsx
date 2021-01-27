/** @jsx jsx */
import React, { FC, useEffect, useState } from 'react';
import { css, jsx } from '@emotion/react';
import { AppBar, Button } from '@material-ui/core';
import Register from './Register';
import Users from './Users';
import { useDispatch } from 'react-redux';
import { updateUsers } from '../store/reducers/users';

const NavBar: FC = () => {

    const [page, setPage] = useState(1);
    const dispatch = useDispatch()


    const getPage = (page: number) => {
        switch (page) {
            case 1:
                return <Register />
            case 2:
                return <Users />
            default:
                return;
        }
    }


    useEffect(() => {
        dispatch(updateUsers(undefined));
    }, [])

    const appBarStyle = css`
    display: flex;
    `;

    const buttonStyle = css`
    color: white;
    `;
    return (
        <div>
            <AppBar position='static'>
                <div css={appBarStyle}>
                    <Button css={buttonStyle} onClick={() => setPage(1)}>Register</Button>
                    <Button css={buttonStyle} onClick={() => setPage(2)}>Users</Button>
                </div>
            </AppBar>
            {getPage(page)}
        </div>
    )
}

export default NavBar;