import React, { useEffect, useState } from 'react'
import MostrarTable from '../components/MostrarTable'
import { Link } from 'react-router-dom'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from '../data/Firebase';
import { findAll, findByKey } from '../data/api';

const Gerentes = ({ cargoARegistrar }) => {
    const [data, setData] = useState([]);

    const q = query(collection(db, "users"), where("cargo", "==", cargoARegistrar));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

    useEffect(() => {
        return () => unsubscribe()
    }, [])

    return (
        <div className='container'>
            <Link className="btn btn-primary mx-2 my-1" to="/app/gerentes/addEdit">Registrar</Link>
            <MostrarTable title='Gerentes' data={data} urlEdit='/app/gerentes/addEdit' />
        </div>
    )
}

export default Gerentes
