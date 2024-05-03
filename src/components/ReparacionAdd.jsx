import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import reparacionService from "../services/reparacion.service";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import  DropdownTipoReparacion  from './TipoReparacion';



const AddReparacion = () => {
    const { idVehiculo } = useParams();
    const [vehiculoId, ] = useState(parseInt(idVehiculo)); // Parse idVehiculo as integer
    const [fechaHoraIngreso, setFechaHoraIngreso] = useState("");
    const [fechaHoraSalida, setFechaHoraSalida] = useState("");
    const [fechaHoraRetiro, setFechaHoraRetiro] = useState("");
    const [tipoReparacion, setTipoReparacion] = useState("");
    const [montoTotal, ] = useState(0); // Assuming montoTotal is a number
    const [titleReparacionForm, setTitleReparacionForm] = useState("");
    const [id] = useState(0); // According to the entity
    const navigate = useNavigate();

    

    const saveReparacion = (e) => {
        e.preventDefault();

        const reparacion = { 
            idVehiculo: vehiculoId, // Use vehiculoId instead of idVehiculo
            fechaHoraIngreso, 
            fechaHoraSalida, 
            fechaHoraRetiro, 
            tipoReparacion, 
            montoTotal,
            id
        };
        
        reparacionService
        Promise.all([
            reparacionService.create(reparacion) // Update repair's total amount
          ])
            .then((response) => {
                console.log("reparacion ha sido añadido.", response.data);
                navigate("/reparacion/list");
            })
            .catch((error) => {
                console.log(
                    "Ha ocurrido un error al intentar crear nueva reparacion.",
                    error
                );
            });
    };

    useEffect(() => {
        setTitleReparacionForm("Agregar reparacion");
    }, []);

    const handleDateChangeIngreso = (date) => {
        setFechaHoraIngreso(date);
    };

    const handleTimeChangeIngreso = (time) => {
        const nuevaFechaHoraIngreso= fechaHoraIngreso ? new Date(fechaHoraIngreso) : new Date(Date.now());
        nuevaFechaHoraIngreso.setHours(time.hours());
        nuevaFechaHoraIngreso.setMinutes(time.minutes());
        setFechaHoraIngreso(nuevaFechaHoraIngreso); // Establecer la nueva fecha y hora
    };
    

    const handleDateChangeSalida = (date) => {
        setFechaHoraSalida(date);
    };

    const handleTimeChangeSalida = (time) => {
        const nuevaFechaHoraSalida = fechaHoraSalida ? new Date(fechaHoraSalida) : new Date(Date.now()); // Crear una nueva fecha a partir de la fecha actual
        nuevaFechaHoraSalida.setHours(time.hours());
        nuevaFechaHoraSalida.setMinutes(time.minutes());
        setFechaHoraSalida(nuevaFechaHoraSalida); // Establecer la nueva fecha y hora
    };

    const handleDateChangeRetiro = (date) => {
        setFechaHoraRetiro(date);
    };


    const handleTimeChangeRetiro = (time) => {
        const nuevaFechaHoraRetiro = fechaHoraRetiro ? new Date(fechaHoraRetiro) : new Date(Date.now()); // Crear una nueva fecha a partir de la fecha actual
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
      <hr />
      <form>
    <FormControl fullWidth>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        
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

        
        <FormControl>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => saveReparacion(e)}
            style={{ marginLeft: "0.5rem" }}
            startIcon={<SaveIcon />}
          >
            Guardar
          </Button>
        </FormControl>
      </form>
      <hr />
      <Link to="/reparacion/list">Volver a la Lista</Link>
    </Box>
  );
};

export default AddReparacion;