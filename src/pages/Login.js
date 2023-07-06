
import React, { useState } from 'react';
import Swal from 'sweetalert2'
import { auth, db } from '../data/Firebase'
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import hola from '../assets/img/AppliancesOnline.png'

import '../assets/css/login.css'
import { collection, onSnapshot, query, where } from 'firebase/firestore';

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
                const id = auth.currentUser.uid
                const q = query(collection(db, "users"), where("id", "==", id), where("cargo", "==", "Gerente"));
                onSnapshot(q, async (querySnapshot) => {
                    let us = await querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
                    if (!us) {
                        Swal.fire(
                            'Acceso denegado!',
                            'Usted no tiene permiso para acceder con el perfil que tiene',
                            'error'
                        )
                        setUser('')
                        signOut(auth).then(() => {
                        }).catch((error) => {
                            // An error happened.
                        });
                        return
                    } else {
                        setUser(us)
                    }
                })
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
        <div className="d-flex align-items-center py-4">
            <main className="form-signin m-auto" style={{ width: "500px" }}>
                <form onSubmit={submitLogin}>
                    <div className='d-flex justify-content-center'>
                        <img src={hola} className="img-fluid w-50" alt="..." />
                    </div>
                    {/* <img className="mb-4" src={hola} alt="" width="72" height="57" /> */}
                    <h1 className="h3 mb-3 fw-normal text-center">Please sign in</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="user" name='user' placeholder="name@example.com" onChange={handleChange} value={form.user} />
                        <label htmlFor="user">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="pass" name='pass' placeholder="Password" onChange={handleChange} value={form.pass} />
                        <label htmlFor="pass">Password</label>
                    </div>

                    <div className="form-check text-start my-3">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remember me
                        </label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-body-secondary text-center">&copy; 2023</p>
                </form>
            </main>
        </div>
    );
}

export default Login;