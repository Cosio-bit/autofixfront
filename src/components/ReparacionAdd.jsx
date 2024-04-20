import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import reparacionService from "../services/reparacion.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";



const AddReparacion = () => {
  const [idVehiculo, setIdVehiculo] = useState(""); // Patente en lugar de rut, según la entidad
  const [fechaHoraIngreso, setFechaHoraIngreso] = useState("");
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
      //Actualizar Datos Empelado
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
    } else {
      //Crear nuevo empleado
      reparacionService
        .create(reparacion)
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
    }
  };
  useEffect(() => {
    if (id) {
      setTitleReparacionForm("Editar reparacion");
      reparacionService
        .get(id)
        .then((reparacion) => {
          setIdVehiculo(reparacion.data.patente);
          setFechaHoraIngreso(reparacion.data.fechaHoraIngreso);
          setFechaHoraSalida(reparacion.data.fechaHoraSalida);
          setFechaHoraRetiro(reparacion.data.fechaHoraRetiro);
          setTipoReparacion(reparacion.data.tipoReparacion);
          setMontoTotal(reparacion.data.montoTotal);
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitleReparacionForm("Nueva Reparacion");
    }
  }, [id]);
  

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
            label="Patente"
            value={idVehiculo}
            variant="standard"
            onChange={(e) => setIdVehiculo(e.target.value)}
            helperText="Ej. ABC123"
            InputLabelProps={{ style: { color: "#f0f0f0" } }}
            InputProps={{ style: { color: "#f0f0f0" } }}
            />
        </FormControl>

        <FormControl fullWidth>
            <TextField
            id="fechaHoraIngreso"
            label="Fecha y Hora de Ingreso"
            value={fechaHoraIngreso}
            variant="standard"
            onChange={(e) => setFechaHoraIngreso(e.target.value)}
            InputLabelProps={{ style: { color: "#f0f0f0" } }}
            InputProps={{ style: { color: "#f0f0f0" } }}
            />
        </FormControl>

        <FormControl fullWidth>
            <TextField
            id="fechaHoraSalida"
            label="Fecha y Hora de Salida"
            value={fechaHoraSalida}
            variant="standard"
            onChange={(e) => setFechaHoraSalida(e.target.value)}
            InputLabelProps={{ style: { color: "#f0f0f0" } }}
            InputProps={{ style: { color: "#f0f0f0" } }}
            />
        </FormControl>

        <FormControl fullWidth>
            <TextField
            id="fechaHoraRetiro"
            label="Fecha y Hora de Retiro"
            value={fechaHoraRetiro}
            variant="standard"
            onChange={(e) => setFechaHoraRetiro(e.target.value)}
            InputLabelProps={{ style: { color: "#f0f0f0" } }}
            InputProps={{ style: { color: "#f0f0f0" } }}
            />
        </FormControl>

        <FormControl fullWidth>
            <TextField
            id="tipoReparacion"
            label="Tipo de Reparación"
            value={tipoReparacion}
            variant="standard"
            onChange={(e) => setTipoReparacion(e.target.value)}
            InputLabelProps={{ style: { color: "#f0f0f0" } }}
            InputProps={{ style: { color: "#f0f0f0" } }}
            />
        </FormControl>

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

export default AddReparacion;