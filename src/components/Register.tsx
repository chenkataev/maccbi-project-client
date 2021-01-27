/** @jsx jsx */
import React, { FC, useState } from 'react';
import { css, jsx } from '@emotion/react';
import { TextField, Button } from '@material-ui/core';
import { addUser, User } from '../store/reducers/users';
import { useDispatch, useSelector } from 'react-redux';

const Register: FC = () => {

  const dispatch = useDispatch()
  const users = useSelector((state: any) => state.usersReducer.users);

  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    age: 0
  });

  const validateEmail = (email: string) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
  }

  const nameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({
      ...user,
      name: e.target.value
    })
  }

  const emailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({
      ...user,
      email: e.target.value
    })
  }

  const ageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const year = parseInt(e.target.value.substring(0, 4))
    const userAge = 2021 - year;
    setUser({
      ...user,
      age: userAge
    })
  }

  const registerClicked = async () => {
    if (user !== undefined && validateEmail(user.email)) {
      if(users.find((storeUser: User) => storeUser.email === user.email)){
        alert("user already exist ;)")
      }
      if(user.name === ''){
        alert("don't forget to write your name ;)")
      }
      if (user.age === 0) {
        alert("choose Date of birth")
      }
      else {
        dispatch(addUser(user));
      }
    }
  }

  const container = css`  
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10%;
    `;

  const inputStyle = css`
    width: 20%;
    margin-bottom: 1.5%;
    `;

  const signInButton = css`
    width: 20%;
    height: 40px;
`;
  return (
    <div css={container}>
      <TextField onChange={nameChange} label="Name" variant="outlined" css={inputStyle} />
      <TextField onChange={emailChange} label="Email" variant="outlined" css={inputStyle} />
      <TextField onChange={ageChange} type="date" label="Birthday" defaultValue="2000-05-24" css={inputStyle} InputLabelProps={{
        shrink: true,
      }} />
      <Button type="submit" variant="contained" color="primary" css={signInButton} onClick={registerClicked}>
        Register
      </Button>
    </div>
  )
}
export default Register;