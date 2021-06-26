import React from 'react';
import Login from '../components/Login';
import RegisterUser from '../components/RegisterUser';

const LoginReg = (props) => {
    const { user, setUser} = props;

    return (
        <div>
            <div className="login">
                <Login user={user} setUser={setUser} />
            </div>
            <hr />
            <div className="register">
                <RegisterUser />
            </div>
        
        </div>
    )
}

export default LoginReg;
