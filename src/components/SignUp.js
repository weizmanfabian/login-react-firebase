import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../data/Firebase'
import { cargos } from '../data/api';
import Swal from 'sweetalert2';
import { collection, doc, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useNavigate, Link, useParams } from 'react-router-dom';
import UseForm from '../hooks/useForm';

const SignUp = ({ cargoARegistrar, pathBack }) => {

    const navigate = useNavigate();
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    const regexOnlyNubers = /^\d+$/;
    const regexOnlyNubersPositives = /^\+?(1|[1-9]\d*)$/;
    const regexLengthNumberPhone = "(?=^.{7,10}$)(^\w+\s*(-?)(\s*\w+\s*)(\w+)$)"

    let { id } = useParams();
    id = id || 0;

    let isEqualsJson = (obj1, obj2) => {
        let keys1 = Object.keys(obj1);
        let keys2 = Object.keys(obj2);
        //return true when the two json has same length and all the properties has same value key by key
        return keys1.length === keys2.length && Object.keys(obj1).every(key => obj1[key] == obj2[key]);
    }

    const initialFormSignUp = {
        nombre: '',
        cc: '',
        cargo: cargoARegistrar,
        user: ''
    };

    const onValidate = (form) => {
        let errors = {};
        if (!form.nombre.trim()) {
            errors.nombre = `Este campo no debe estar vacío`;
        }
        if (!form.cc.trim()) {
            errors.cc = `Este campo no debe estar vacío`;
        } else if (!regexOnlyNubersPositives.test(form.cc)) {
            errors.cc = `Solo debe escribir números positivos`;
            return;
        } else if (form.cc.length < 7 || form.cc.length > 10) {
            errors.cc = `Escriba números entre 7 y 10 caracteres`;
        }
        if (!form.cargo.trim()) {
            errors.cargo = `Este campo no debe estar vacío`;
        }
        if (!form.user.trim()) {
            errors.user = `Este campo no debe estar vacío`;
        } else if (!regexEmail.test(form.user)) {
            errors.user = `Escriba un correo válido`;
        }
        if (!pass.trim()) {
            errors.pass = `Este campo no debe estar vacío`;
        } else if (!regexPassword.test(pass)) {
            errors.pass = `Escriba una contraseña válida
            - Minimo 6 caracteres
            - Maximo 15
            - Al menos una letra mayúscula
            - Al menos una letra minucula
            - Al menos un dígito
            - No espacios en blanco
            - Al menos 1 caracter especial`;
        }
        return errors;
    }

    const { form, errors, loading, handleChange, handleSubmit, setForm, setErrors } = UseForm(initialFormSignUp, onValidate);

    const [title, setTitle] = useState('Registrar');
    const [nameBtn, setnameBtn] = useState('Guardar');
    const [pass, setPass] = useState('');

    const init = () => {
        const q = query(collection(db, "users"), where("id", "==", id));
        onSnapshot(q, (querySnapshot) => {
            setForm(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0])
        });
    }

    const validateErros = () => {
        let errs = onValidate(form);
        setErrors(errs);
    }

    useEffect(() => {
        const val = () => {
            if (id === 0) {
                setTitle('Registrar');
            } else {
                setTitle('Actualizar');
                init();
            }
        }
        return () => val();
    }, []);

    const submitSignUp = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, form.user, pass)
            .then(async (success) => {
                await setDoc(doc(db, `users/${success.user.uid}`), {
                    ...form,
                    id: success.user.uid
                });
                //setForm(initialFormSignUp)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${cargoARegistrar} creado exitosamente...`,
                    showConfirmButton: false,
                    timer: 4000,
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
                    timer: 4000,
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
        e.preventDefault();
        if (id === 0) {
            handleSubmit(e, submitSignUp(e));
        } else {
            handleSubmit(e, update(e));
        }
    }

    return (
        // <div className='container align-items-center w-50' >
        <div className=' container align-items-center justify-content-center w-50 '>
            <div className="card" >
                <div className="card-header text-center">
                    <h5 className="card-title">{title} {cargoARegistrar}</h5>
                </div>
                {/* <form className='row p-4 needs-validation' novalidate onSubmit={handleSubmit} > */}
                <form className="row g-3 needs-validation" noValidate>
                    <div className="card-body">
                        <div className={`form-group  col-sm-12 mb-2`}>
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className={`form-control ${errors.nombre ? 'is-invalid' : form.nombre.length > 0 ? 'is-valid' : ''}`}
                                id="nombre"
                                name='nombre'
                                value={form.nombre}
                                onChange={handleChange}
                                onKeyUp={validateErros}
                                required />
                            <div className={'invalid-feedback'}>
                                {errors.nombre}
                            </div>
                        </div>
                        <div className={`form-group  col-sm-12 mb-2`}>
                            <label htmlFor="cc" className="form-label">CC:</label>
                            <input
                                type="number"
                                className={`form-control ${errors.cc ? 'is-invalid' : form.cc.length > 0 ? 'is-valid' : ''}`}
                                id="cc"
                                name='cc'
                                value={form.cc}
                                onChange={handleChange}
                                onKeyUp={validateErros}
                                required />
                            <div className={'invalid-feedback'}>
                                {errors.cc}
                            </div>
                        </div>
                        {id !== 0 && <div className={`form-group  col-sm-12 mb-2`}>
                            <label htmlFor="validationTooltip04" className="form-label">Cargo:</label>
                            <select
                                className={`form-control ${errors.cargo ? 'is-invalid' : form.cargo.length > 0 ? 'is-valid' : ''}`}
                                id='cargo'
                                name="cargo"
                                defaultValue={form.cargo}
                                onChange={handleChange}
                                onKeyUp={validateErros}
                                required>
                                <option selected disabled value="">Seleccione...</option>
                                {cargos.map((v, i) => <option key={i} value={v}>{v}</option>)}
                            </select>
                            <div className={'invalid-feedback'}>
                                {errors.cargo}
                            </div>
                        </div>}
                        <div className={`form-group  col-sm-12 mb-2`}>
                            <label htmlFor="user" className="form-label">Email:</label>
                            <input
                                type="email"
                                className={`form-control ${errors.user ? 'is-invalid' : form.user.length > 0 ? 'is-valid' : ''}`}
                                id="user"
                                name='user'
                                value={form.user}
                                onChange={handleChange}
                                onKeyUp={validateErros}
                                required />
                            <div className={'invalid-feedback'}>
                                {errors.user}
                            </div>
                        </div>
                        {id === 0 && <div className={`form-group  col-sm-12 mb-2`}>
                            <label htmlFor="pass" className="form-label">Password:</label>
                            <input
                                type="password"
                                className={`form-control ${errors.pass ? 'is-invalid' : pass.length > 0 ? 'is-valid' : ''}`}
                                id="pass"
                                name='pass'
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                onKeyUp={validateErros}
                                required />
                            <div className={'invalid-feedback'}>
                                {errors.pass}
                            </div>
                        </div>}
                    </div>
                    <div className="card-footer text-end mt-2">
                        <Link className='btn btn-secondary mx-2' to={pathBack}>Cancelar</Link>
                        <button
                            className='btn btn-primary'
                            onClick={submitForm}
                            disabled={Object.entries(errors).length > 0 || isEqualsJson(initialFormSignUp, form)}
                        >{nameBtn}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
