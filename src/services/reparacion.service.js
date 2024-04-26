import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/reparaciones/');
}

const create = data => {
    return httpClient.post('/api/v1/reparaciones/crearReparacion', data);
}

const getFromVehiculo = idVehiculo => {
    return httpClient.get(`/api/v1/reparaciones/${idVehiculo}`);
}

const get = id => {
    return httpClient.get(`/api/v1/reparaciones/reparacion/${id}`);
}


const updateMonto = (id) => {
    return httpClient.put(`/api/v1/reparaciones/reparacion/${id}/monto`);
}

const update = data => {
    return httpClient.put('/api/v1/reparaciones/reparacion', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/reparaciones/reparacion/${id}`);
}
export default { getAll, create, getFromVehiculo, get, updateMonto, update, remove };