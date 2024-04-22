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
  const [idVehiculo, setIdVehiculo] = useState(""); //  según la entidad
  const [fechaHoraIngreso, setFechaHoraIngreso] = useState(new Date());
  const [fechaHoraSalida, setFechaHoraSalida] = useState("");
  const [fechaHoraRetiro, setFechaHoraRetiro] = useState("");
  const [tipoReparacion, setTipoReparacion] = useState("");
  const [montoTotal, setMontoTotal] = useState(0); // Asumiendo que nroAsientos es un número
  const { id } = useParams();
  const [titleReparacionForm, setTitleReparacionForm] = useState("");
  const navigate = useNavigate();

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
      //Actualizar Datos
      reparacionService
        .update(reparacion)
        .then((response) => {
          console.log("reparacion ha sido actualizado.", response.data);
          navigate("/reparacion/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar actualizar datos del reparacion.",
            error
          );
        });
    }
  };
  useEffect(() => {
    if (id) {
      setTitleReparacionForm("Editar reparacion");
      reparacionService
        .get(id)
        .then((reparacion) => {
          setIdVehiculo(reparacion.data.idVehiculo);
          setFechaHoraIngreso(reparacion.data.fechaHoraIngreso);
          setFechaHoraSalida(reparacion.data.fechaHoraSalida);
          setFechaHoraRetiro(reparacion.data.fechaHoraRetiro);
          setTipoReparacion(reparacion.data.tipoReparacion);
          setMontoTotal(reparacion.data.montoTotal);
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    }
  }, [id]);


    const handleDateChangeIngreso = (date) => {
        setFechaHoraIngreso(date);
    };

    const handleSetCurrentDateTimeIngreso = () => {
        const currentDateTime = new Date();
        setFechaHoraIngreso(currentDateTime);
    };

    const handleTimeChangeIngreso = (time) => {
        const newDate = fechaHoraIngreso.setHours(time.hours(), time.minutes(), 0, 0);
        setFechaHoraIngreso(newDate);
    };

    const handleDateChangeSalida = (date) => {
        setFechaHoraSalida(date);
    };

    const handleSetCurrentDateTimeSalida = () => {
        const currentDateTime = new Date();
        setFechaHoraSalida(currentDateTime);
    };

    const handleTimeChangeSalida = (time) => {
        const newDate = fechaHoraSalida.setHours(time.hours(), time.minutes(), 0, 0);
        setFechaHoraSalida(newDate);
    };

    const handleDateChangeRetiro = (date) => {
        setFechaHoraRetiro(date);
    };

    const handleSetCurrentDateTimeRetiro = () => {
        const currentDateTime = new Date();
        setFechaHoraRetiro(currentDateTime);
    };

    const handleTimeChangeRetiro = (time) => {
        const newDate = fechaHoraRetiro.setHours(time.hours(), time.minutes(), 0, 0);
        setFechaHoraRetiro(newDate);
    };

    const handleTipoReparacionChange = (tipoReparacion) => {
        setTipoReparacion(tipoReparacion);
    }

  

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
      style={{
        backgroundColor: "#1c3e4a",
        padding: "50px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        color: "#f0f0f0"
    }}>
      <h3 style={{ marginBottom: "20px", color: "white" }}>{titleReparacionForm}</h3>
      <hr style={{ width: "100%", border: "none", borderBottom: "1px solid #fff", marginBottom: "20px" }} />
      <hr />
      <form>
        <FormControl fullWidth>
            <TextField
            id="idVehiculo"
            label="id vehiculo"
            value={idVehiculo}
            variant="standard"
            onChange={(e) => setIdVehiculo(e.target.value)}
            helperText="Ej. ABC123"
            InputLabelProps={{ style: { color: "#f0f0f0" } }}
            InputProps={{ style: { color: "#f0f0f0" } }}
            />
        </FormControl>

        <FormControl fullWidth>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
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
                <div>
                    <Button variant="contained" color="primary" onClick={handleSetCurrentDateTimeIngreso}>
                        Establecer actual
                    </Button>
                </div>
            </div>
        </FormControl>

        <FormControl fullWidth>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
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
                <div>
                    <Button variant="contained" color="primary" onClick={handleSetCurrentDateTimeSalida}>
                        Establecer actual
                    </Button>
                </div>
            </div>
        </FormControl>

        <FormControl fullWidth>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
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
                <div>
                    <Button variant="contained" color="primary" onClick={handleSetCurrentDateTimeRetiro}>
                        Establecer actual
                    </Button>
                </div>
            </div>
        </FormControl>

        <DropdownTipoReparacion onChange={handleTipoReparacionChange} />

        <FormControl fullWidth>
            <TextField
            id="montoTotal"
            label="Monto Total"
            type="number"
            value={montoTotal}
            variant="standard"
            onChange={(e) => setMontoTotal(e.target.value)}
            InputLabelProps={{ style: { color: "#f0f0f0" } }}
            InputProps={{ style: { color: "#f0f0f0" } }}
            />
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
            Guardar
          </Button>
        </FormControl>
      </form>
      <hr />
      <Link to="/reparacion/list">Volver a la Lista</Link>
    </Box>
  );
};

export default EditReparacion;