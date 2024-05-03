import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import reparacionService from "../services/reparacion.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import  DropdownTipoReparacion  from './TipoReparacion';

const EditReparacion = () => {
  const [idVehiculo, setIdVehiculo] = useState("");
  const [fechaHoraIngreso, setFechaHoraIngreso] = useState(null);
  const [fechaHoraSalida, setFechaHoraSalida] = useState(null);
  const [fechaHoraRetiro, setFechaHoraRetiro] = useState(null);
  const [tipoReparacion, setTipoReparacion] = useState("");
  const [montoTotal, setMontoTotal] = useState(0);
  const { id } = useParams();
  const [titleReparacionForm, setTitleReparacionForm] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  // URL de la imagen de Internet
//const backgroundImageUrl = "https://imgs.search.brave.com/2s2NZU7sv94_N-AIsDMpNQ_9VQLAIjYqll8aUf5tE_I/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9yZXRy/by1yZWQtY2FyLXN5/bnRod2F2ZS1wb3N0/ZXItdmFwb3J3YXZl/LXN1bnNldC1uZW9u/LWdyYWRpZW50LWJh/Y2tncm91bmQtcmV0/cm8tcmVkLWNhci1z/eW50aHdhdmUtcG9z/dGVyLXZhcG9yd2F2/ZS0yNjIwNDgzMDAu/anBn";


  useEffect(() => {
    if (id) {
      setTitleReparacionForm("Editar reparacion");
      reparacionService
        .get(id)
        .then((reparacion) => {
          const data = reparacion.data;
          setIdVehiculo(data.idVehiculo || "");
          setFechaHoraIngreso(data.fechaHoraIngreso ? new Date(data.fechaHoraIngreso) : null);
          setFechaHoraSalida(data.fechaHoraSalida ? new Date(data.fechaHoraSalida) : null);
          setFechaHoraRetiro(data.fechaHoraRetiro ? new Date(data.fechaHoraRetiro) : null);
          setTipoReparacion(data.tipoReparacion || "");
          setMontoTotal(data.montoTotal || 0);
          setLoading(false); // Set loading to false when data is fetched
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
          setLoading(false); // Set loading to false on error as well
        });
    }
  }, [id]); // Moved id from dependency array of second useEffect

  useEffect(() => {
    if (id) {
      setTitleReparacionForm("Editar reparacion");
    }
  }, [id]); // Added second useEffect for setting titleReparacionForm

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while data is being fetched
  }

  const saveReparacion = (e) => {
    e.preventDefault();

    const reparacion = {
      idVehiculo,
      fechaHoraIngreso,
      fechaHoraSalida,
      fechaHoraRetiro,
      tipoReparacion,
      montoTotal,
      id
    };

    if (id) {
      // Actualizar Datos
      Promise.all([
        reparacionService.update(reparacion), // Update repair data
        reparacionService.updateMonto(reparacion) // Update repair's total amount
      ])
        .then((responses) => {
          const [updateResponse, updateMontoResponse] = responses;
          console.log("Reparacion ha sido actualizado.", updateResponse.data);
          console.log("Monto de reparacion ha sido actualizado.", updateMontoResponse.data);
    
        alert(updateMontoResponse.data);

        //reload page
        window.location.reload();

          
        })
        .catch((error) => {
          console.log(
            "An error occurred while trying to update repair data.",
            error
          );
        });
    }
    
  };    


  const handleDateChangeIngreso = (date) => {
    setFechaHoraIngreso(date);
};


const handleTimeChangeIngreso = (time) => {
    const nuevaFechaHoraIngreso = new Date(fechaHoraIngreso); // Crear una nueva fecha a partir de la fecha actual
    nuevaFechaHoraIngreso.setHours(time.hours());
    nuevaFechaHoraIngreso.setMinutes(time.minutes());
    setFechaHoraIngreso(nuevaFechaHoraIngreso); // Establecer la nueva fecha y hora
};


const handleDateChangeSalida = (date) => {
    setFechaHoraSalida(date);
};


const handleTimeChangeSalida = (time) => {
    const nuevaFechaHoraSalida = new Date(fechaHoraSalida); // Crear una nueva fecha a partir de la fecha actual
    nuevaFechaHoraSalida.setHours(time.hours());
    nuevaFechaHoraSalida.setMinutes(time.minutes());
    setFechaHoraSalida(nuevaFechaHoraSalida); // Establecer la nueva fecha y hora
};

const handleDateChangeRetiro = (date) => {
    setFechaHoraRetiro(date);
};


const handleTimeChangeRetiro = (time) => {
    const nuevaFechaHoraRetiro = new Date(fechaHoraRetiro); // Crear una nueva fecha a partir de la fecha actual
    nuevaFechaHoraRetiro.setHours(time.hours());
    nuevaFechaHoraRetiro.setMinutes(time.minutes());
    setFechaHoraRetiro(nuevaFechaHoraRetiro); // Establecer la nueva fecha y hora
};

const handleTipoReparacionChange = (tipoReparacion) => {
    setTipoReparacion(tipoReparacion);
}

  

  return (   <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    component="form"
    style={{
      backgroundColor: "#8c9eff", // Very pale lilac background color
      minHeight: "100vh", // Ensure the same height as the previous container
      padding: "20px",
      color: "#000", // Adjust text color to black
    }}
  >
    <h3 style={{ marginBottom: "20px", color: "#000" }}>{titleReparacionForm}</h3>
    <hr style={{ width: "100%", border: "none", borderBottom: "1px solid black", marginBottom: "20px" }} />
    {/* Additional content goes here */}
      <form>
        <FormControl fullWidth>
            <TextField
            id="idVehiculo"
            label="id vehiculo"
            value={idVehiculo}
            variant="standard"
            onChange={(e) => setIdVehiculo(e.target.value)}
            helperText="Ej. ABC123"
            InputLabelProps={{ style: { color: "#000" } }}
            InputProps={{ style: { color: "#000" } }}
            />
        </FormControl>

        <FormControl fullWidth>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <h2 style={{ color: '#333', margin: '0' }}>Fecha de Ingreso</h2>
                <div style={{ flex: '1' }}>
                    <Datetime
                        inputProps={{ style: { color: "#f0f0f0" } }}
                        value={fechaHoraIngreso}
                        onChange={handleDateChangeIngreso}
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        locale="es"
                    />
                </div>
                <div>
                    <Datetime
                        inputProps={{ style: { color: "#f0f0f0" } }}
                        value={fechaHoraIngreso}
                        onChange={handleTimeChangeIngreso}
                        dateFormat={false}
                        timeFormat="HH:mm"
                        locale="es"
                    />
                </div>
              
            </div>
        </FormControl>

        <FormControl fullWidth>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <h2 style={{ color: '#333', margin: '0' }}>Fecha de Salida</h2>
                <div style={{ flex: '1' }}>
                    <Datetime
                       inputProps={{ style: { color: "#f0f0f0" } }}
                        value={fechaHoraSalida}
                        onChange={handleDateChangeSalida}
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        locale="es"
                    />
                </div>
                <div>
                    <Datetime
                        inputProps={{ style: { color: "#f0f0f0" } }}
                        value={fechaHoraSalida}
                        onChange={handleTimeChangeSalida}
                        dateFormat={false}
                        timeFormat="HH:mm"
                        locale="es"
                    />
                </div>
               
            </div>
        </FormControl>

        <FormControl fullWidth>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <h2 style={{ color: '#333', margin: '0' }}>Fecha de Retiro</h2>
                <div style={{ flex: '1' }}>
                    <Datetime
                        inputProps={{ style: { color: "#f0f0f0" } }}
                        value={fechaHoraRetiro}
                        onChange={handleDateChangeRetiro}
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        locale="es"
                    />
                </div>
                <div>
                    <Datetime
                        inputProps={{ style: { color: "#f0f0f0" } }}
                        value={fechaHoraRetiro}
                        onChange={handleTimeChangeRetiro}
                        dateFormat={false}
                        timeFormat="HH:mm"
                        locale="es"
                    />
                </div>
                
            </div>
        </FormControl>

        <DropdownTipoReparacion onChange={handleTipoReparacionChange} />

        <FormControl fullWidth>
          <div >
            <TextField
            id="montoTotal"
            label="Monto Total"
            type="number"
            value={montoTotal}
            variant="standard"
            onChange={(e) => setMontoTotal(e.target.value)}
            InputLabelProps={{ style: { color: "#000" } }}
            InputProps={{ style: { color: "#000" } }}
            />
          </div>
        </FormControl>


        <FormControl>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => saveReparacion(e)}
            style={{ marginLeft: "0.5rem" }}
            startIcon={<SaveIcon />}
          >
            Guardar cambios y recalcular monto
          </Button>
        </FormControl>

      </form>
      <hr />
      <Link to="/reparacion/list" style={{ color: "#000" }}>Volver a la Lista</Link>
    </Box>
  );
};

export default EditReparacion;