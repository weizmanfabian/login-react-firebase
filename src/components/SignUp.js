import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../data/Firebase'
import { cargos } from '../data/api';
import Swal from 'sweetalert2';
import { Link, Navigate } from 'react-router-dom';
import { collection, doc, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Toast } from 'bootstrap';

const SignUp = ({ cargoARegistrar, pathBack }) => {

    let navigate = useNavigate();

    let { id } = useParams()
    id = id || 0

    const initialFormSignUp = {
        nombre: '',
        cc: '',
        cargo: cargoARegistrar,
        user: ''
    }

    const [form, setForm] = useState(initialFormSignUp);
    const [title, setTitle] = useState('Registrar');
    const [nameBtn, setnameBtn] = useState('Guardar');
    const [misCargos, setMisCargos] = useState([]);
    const [pass, setPass] = useState('');

    const init = () => {
        const q = query(collection(db, "users"), where("id", "==", id));
        onSnapshot(q, (querySnapshot) => {
            setForm(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0])
        })
    }

    useEffect(() => {
        if (id === 0) {
            setTitle('Registrar')
        } else {
            setTitle('Actualizar')
            return () => init()
        }
    }, [])

    const handleChange = (e) => {
        const { value, name } = e.target
        setForm({ ...form, [name]: value })
    }

    const submitSignUp = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, form.user, pass)
            .then(async (success) => {
                await setDoc(doc(db, `users/${success.user.uid}`), {
                    ...form,
                    id: success.user.uid
                });
                const user = success.user;
                setForm(initialFormSignUp)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${cargoARegistrar} creado exitosamente...`,
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true
                });
                return navigate(pathBack);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
                Swal.fire(
                    'Ocurrió un error!',
                    errorMessage,
                    'error'
                )
            });
    }

    const update = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, 'users', id), form)
            .then((success) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${cargoARegistrar} actualizado...`,
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true
                });
                return navigate(pathBack);

            })
            .catch((error) => {
                const errorMessage = error.message;
                Swal.fire(
                    'Ocurrió un error!',
                    errorMessage,
                    'error'
                )
            })
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (id === 0) {
            submitSignUp(e)
        } else {
            update(e)
        }
    }

    return (
        <div className='container align-items-center w-50' >
            <div className="card" >
                <div className="card-header text-center">
                    <h5 className="card-title">{title} {cargoARegistrar}</h5>
                </div>
                <form className='row p-4'>
                    <div className="card-body">
                        <div className="col-md-12">
                            <label htmlFor="nombre" className="form-label">Nombre:</label>
                            <input type="text" className="form-control" id="nombre" name='nombre' value={form.nombre} onChange={handleChange} required />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="cc" className="form-label">CC:</label>
                            <input type="text" disabled={id == 0 ? false : true} className="form-control" id="cc" name='cc' value={form.cc} onChange={handleChange} required />
                        </div>
                        {id !== 0 && <div className="col-md-12">
                            <label htmlFor="cargo" className="form-label" >Cargo:</label>
                            <select
                                className="form-select"
                                aria-label="Cargo"
                                id='cargo'
                                name="cargo"
                                value={form.cargo}
                                onChange={handleChange}
                                required>
                                {cargos.map((v, i) => <option key={i} value={v}>{v}</option>)}
                            </select>
                        </div>}
                        <div className="col-md-12">
                            <label htmlFor="user" className="form-label">Email:</label>
                            <input type="email" className="form-control" id="user" name='user' value={form.user} onChange={handleChange} required />
                        </div>
                        {id === 0 && <div className="col-md-12">
                            <label htmlFor="pass" className="form-label">Contraseña:</label>
                            <input type="password" className="form-control" id="pass" name='pass' value={pass} onChange={(e) => setPass(e.target.value)} required />
                        </div>}
                    </div>
                    <div className="card-footer text-end">
                        <Link className='btn btn-secondary mx-2' to={pathBack}>Cancelar</Link>
                        <button className='btn btn-primary' onClick={submitForm}>{nameBtn}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
