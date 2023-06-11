
export const login = async (form) => {
  try {
    const res = ''//await axios.post(`${urlServer}/login`, form)
    return res
  } catch (err) {
    console.log(`err call login in api ${err}`);
  }
}

export const saveLocalStorage = (data, key) => {
  localStorage[key] = JSON.stringify(data)
}

export const getFromLocalStorage = (key) => localStorage[key] ? JSON.parse(localStorage[key]) : []

export const cargos = [
  'Gerente',
  'Operario'
]