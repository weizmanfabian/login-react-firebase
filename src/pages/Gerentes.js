import React from 'react'
import MostrarTable from '../components/MostrarTable'
import { Link } from 'react-router-dom'

const Gerentes = () => {
    return (
        <div className='container'>
            <Link className="btn btn-primary mx-2" to="/app/gerentes/registrar">Registrar</Link>
            <MostrarTable title='Gerentes' data={[]} />
        </div>
    )
}

export default Gerentes
