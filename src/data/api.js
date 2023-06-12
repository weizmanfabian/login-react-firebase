import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "./Firebase";

export const saveLocalStorage = (data, key) => {
  localStorage[key] = JSON.stringify(data)
}

export const getFromLocalStorage = (key) => localStorage[key] ? JSON.parse(localStorage[key]) : []

export const cargos = [
  'Gerente',
  'Operario'
]

