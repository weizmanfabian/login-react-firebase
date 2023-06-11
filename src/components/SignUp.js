import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../data/Firebase'
import { cargos } from '../data/api';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


const SignUp = ({ cargoARegistrar, pathBack }) => {

    const initialFormSignUp = {
        nombre: '',
        cc: '',
        cargo: cargoARegistrar,
        user: '',
        pass: ''
    }

    const [form, setForm] = useState(initialFormSignUp);
    const [title, setTitle] = useState('Registrar');
    const [nameBtn, setnameBtn] = useState('Guardar');
    const [misCargos, setMisCargos] = useState([]);

    useEffect(() => {
        const unsubscribe = async () => {
            setMisCargos(cargos.filter((v) => v === cargoARegistrar))
        }
        return () => unsubscribe()
    }, [])

    const handleChange = (e) => {
        const { value, name } = e.target
        setForm({ ...form, [name]: value })
    }

    const submitSignUp = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, form.user, form.pass)
            .then((success) => {
                set(ref(db, `users/${success.user.uid}`), {
                    ...form,
                    id: success.user.uid
                });
                const user = success.user;
                console.log(user)
                // ...
                setForm(initialFormSignUp)
                Swal.fire(
                    'Gerente Registrado!',
                    'Precione el botón!',
                    'success'
                )
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
                Swal.fire(
                    'Ocurrió un error!',
                    errorMessage,
                    'error'
                )
                // ..
            });
    }

    return (
        <div className='container align-items-center w-50' >
            <div className="card" >
                <div className="card-header">
                    <h5 className="card-title">{title} usuario</h5>
                </div>
                <form className='row p-4'>
                    <div className="card-body">
                        <div className="col-md-12">
                            <label htmlFor="nombre" className="form-label">Nombre:</label>
                            <input type="text" className="form-control" id="nombre" name='nombre' value={form.nombre} onChange={handleChange} required />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="cc" className="form-label">CC:</label>
                            <input type="text" className="form-control" id="cc" name='cc' value={form.cc} onChange={handleChange} required />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="cargo" className="form-label" >Cargo:</label>
                            <select
                                className="form-select"
                                aria-label="Cargo"
                                id='cargo'
                                name="cargo"
                                value={form.cargo}
                                onChange={handleChange}
                                required>
                                {misCargos.map((v, i) => <option key={i} value={v}>{v}</option>)}
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="user" className="form-label">Email:</label>
                            <input type="email" className="form-control" id="user" name='user' value={form.user} onChange={handleChange} required />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="pass" className="form-label">Contraseña:</label>
                            <input type="password" className="form-control" id="pass" name='pass' value={form.pass} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="card-footer text-end">
                        <Link className='btn btn-secondary mx-2' to={pathBack}>Cancelar</Link>
                        <button className='btn btn-primary' onClick={submitSignUp}>{nameBtn}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
