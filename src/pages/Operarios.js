import React, { useEffect, useState } from 'react'
import MostrarTable from '../components/MostrarTable'
import { Link, useLocation } from 'react-router-dom'
import { app, auth, db } from '../data/Firebase'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";

const User = ({ cargoARegistrar }) => {
    //Creating the reference (The path in db you are trying to read/write/update)

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
            <Link className="btn btn-primary mx-2 my-1" to='/app/operarios/addEdit'>Registrar</Link>
            <MostrarTable title='Operarios' data={data} urlEdit='/app/operarios/addEdit' />
        </div>
    )
}

export default User
