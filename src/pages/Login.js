
import React, { useState } from 'react';
import Swal from 'sweetalert2'
import { auth } from '../data/Firebase'
import { signInWithEmailAndPassword } from "firebase/auth";

//import '../assets/css/login.css'

const Login = ({ setUser }) => {


    const initialFormLogin = {
        user: '',
        pass: ''
    }


    const [form, setForm] = useState(initialFormLogin);

    const handleChange = (e) => {
        const { value, name } = e.target
        setForm({ ...form, [name]: value })
    }

    const submitLogin = async (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, form.user, form.pass)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                setUser(user)
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                Swal.fire(
                    'Ocurrió un error!',
                    errorMessage,
                    'error'
                )
            });
    }

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login" onSubmit={submitLogin}>
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input type="email" value={form.user} onChange={handleChange} name='user' className="login__input" placeholder="User name / Email" />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input type="password" value={form.pass} onChange={handleChange} name='pass' className="login__input" placeholder="Password" />
                        </div>
                        <button className="button login__submit" >
                            <span className="button__text">Log In Now</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>
                    </form>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
    );
}

export default Login;