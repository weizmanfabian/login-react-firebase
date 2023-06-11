import React from 'react'

const MostrarTable = ({ title, data }) => {
    return (
        <div className='container align-items-center'>
            <div className="card">
                <div className="card-header">
                    {title}
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">CC</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Cargo</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((v, i) => (
                                <tr key={i}>
                                    <th scope="row">{v.cc}</th>
                                    <td>{v.nombre}</td>
                                    <td>{v.cargo}</td>
                                    <td>
                                        <button className='btn btn-warning'>Editar</button>
                                        <button className='btn btn-danger'>Eliminar</button>
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
