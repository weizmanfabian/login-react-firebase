import React from 'react'
import MostrarTable from '../components/MostrarTable'
import { Link } from 'react-router-dom'

const Operarios = () => {
    return (
        <div className='container'>
            <Link className="btn btn-primary mx-2" to="/app/operarios/registrar">Registrar</Link>
            <MostrarTable title='Operarios' data={[]} />
        </div>
    )
}

export default Operarios
