
export const saveLocalStorage = (data, key) => {
  localStorage[key] = JSON.stringify(data)
}

export const getFromLocalStorage = (key) => localStorage[key] ? JSON.parse(localStorage[key]) : []

export const cargos = [
  'Gerente',
  'Operario'
]