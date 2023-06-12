import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { db } from '../data/Firebase'

const MostrarTable = ({ title, data, urlEdit }) => {

    const deleteRow = async (e, v) => {
        Swal.fire({
            title: '¿Está seguro?',
            text: `Va a eliminar el usuario ${v.nombre}!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteDoc(doc(db, 'users', v.id))
                    .then((success) => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `Usuario eliminado...`,
                            showConfirmButton: false,
                            timer: 2000,
                            toast: true
                        });
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
        })
    }

    return (
        <div className='container align-items-center'>
            <div className="card ">
                <div className="card-header text-center">
                    {title}
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr className='text-center'>
                                <th scope="col">CC</th>
                                <th scope="col">Email</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Cargo</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((v, i) => (
                                <tr key={i}>
                                    <th scope="row">{v.cc}</th>
                                    <td>{v.user}</td>
                                    <td>{v.nombre}</td>
                                    <td>{v.cargo}</td>
                                    <td className='text-center'>
                                        <Link className='btn btn-warning mx-1' to={`${urlEdit}/${v.id}`} >Editar</Link>
                                        <Link className='btn btn-danger' onClick={(e) => deleteRow(e, v)} >Eliminar</Link>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MostrarTable
