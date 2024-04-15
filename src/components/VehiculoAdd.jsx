import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import vehiculoService from "../services/vehiculo.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";




const AddVehiculo = () => {
  const [patente, setPatente] = useState(""); // Patente en lugar de rut, según la entidad
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [annoFabricacion, setAnnoFabricacion] = useState("");
  const [tipoVehiculo, setTipoVehiculo] = useState("");
  const [tipoMotor, setTipoMotor] = useState("");
  const [nroAsientos, setNroAsientos] = useState(0); // Asumiendo que nroAsientos es un número
  const [kilometraje, setKilometraje] = useState(0); // Asumiendo que kilometraje es un número
  const { id } = useParams();
  const [titleVehiculoForm, setTitleVehiculoForm] = useState("");
  const navigate = useNavigate();

  const saveVehiculo = (e) => {
    e.preventDefault();

    const vehiculo = { patente, marca, modelo, annoFabricacion, tipoVehiculo, tipoMotor, nroAsientos, kilometraje, id };
    if (id) {
      //Actualizar Datos Empelado
      vehiculoService
        .update(vehiculo)
        .then((response) => {
          console.log("vehiculo ha sido actualizado.", response.data);
          navigate("/vehiculo/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar actualizar datos del vehiculo.",
            error
          );
        });
    } else {
      //Crear nuevo empleado
      vehiculoService
        .create(vehiculo)
        .then((response) => {
          console.log("vehiculo ha sido añadido.", response.data);
          navigate("/vehiculo/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar crear nuevo empleado.",
            error
          );
        });
    }
  };
  useEffect(() => {
    if (id) {
      setTitleVehiculoForm("Editar Vehiculo");
      vehiculoService
        .get(id)
        .then((vehiculo) => {
          setPatente(vehiculo.data.patente);
          setMarca(vehiculo.data.marca);
          setModelo(vehiculo.data.modelo);
          setAnnoFabricacion(vehiculo.data.annoFabricacion);
          setTipoVehiculo(vehiculo.data.tipoVehiculo);
          setTipoMotor(vehiculo.data.tipoMotor);
          setNroAsientos(vehiculo.data.nroAsientos);
          setKilometraje(vehiculo.data.kilometraje);
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitleVehiculoForm("Nuevo Vehiculo");
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
      <h3 style={{ marginBottom: "20px", color: "white" }}>{titleVehiculoForm}</h3>
      <hr style={{ width: "100%", border: "none", borderBottom: "1px solid #fff", marginBottom: "20px" }} />
      <hr />
      <form>
        <FormControl fullWidth>
          <TextField
            id="patente"
            label="Patente"
            value={patente}
            variant="standard"
            onChange={(e) => setPatente(e.target.value)}
            helperText="Ej. ABC123"
            InputLabelProps={{ style: { color: "#f0f0f0" } }}
            InputProps={{ style: { color: "#f0f0f0" } }}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="marca"
            label="Marca"
            value={marca}
            variant="standard"
            onChange={(e) => setMarca(e.target.value)}
            InputLabelProps={{ style: { color: "#f0f0f0" } }}
            InputProps={{ style: { color: "#f0f0f0" } }}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="modelo"
            label="Modelo"
            value={modelo}
            variant="standard"
            onChange={(e) => setModelo(e.target.value)}
            InputLabelProps={{ style: { color: "#f0f0f0" } }}
            InputProps={{ style: { color: "#f0f0f0" } }}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="annoFabricacion"
            label="Año de Fabricación"
            value={annoFabricacion}
            variant="standard"
            onChange={(e) => setAnnoFabricacion(e.target.value)}
            InputLabelProps={{ style: { color: "#f0f0f0" } }}
            InputProps={{ style: { color: "#f0f0f0" } }}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="tipoVehiculo"
            label="Tipo de Vehículo"
            value={tipoVehiculo}
            variant="standard"
            onChange={(e) => setTipoVehiculo(e.target.value)}
            InputLabelProps={{ style: { color: "#f0f0f0" } }}
            InputProps={{ style: { color: "#f0f0f0" } }}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="tipoMotor"
            label="Tipo de Motor"
            value={tipoMotor}
            variant="standard"
            onChange={(e) => setTipoMotor(e.target.value)}
            InputLabelProps={{ style: { color: "#f0f0f0" } }}
            InputProps={{ style: { color: "#f0f0f0" } }}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="nroAsientos"
            label="Número de Asientos"
            type="number"
            value={nroAsientos}
            variant="standard"
            onChange={(e) => setNroAsientos(e.target.value)}
            InputLabelProps={{ style: { color: "#f0f0f0" } }}
            InputProps={{ style: { color: "#f0f0f0" } }}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="kilometraje"
            label="Kilometraje"
            type="number"
            value={kilometraje}
            variant="standard"
            onChange={(e) => setKilometraje(e.target.value)}
            InputLabelProps={{ style: { color: "#f0f0f0" } }}
            InputProps={{ style: { color: "#f0f0f0" } }}
          />
        </FormControl>

        <FormControl>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => saveVehiculo(e)}
            style={{ marginLeft: "0.5rem" }}
            startIcon={<SaveIcon />}
          >
            Guardar
          </Button>
        </FormControl>
      </form>
      <hr />
      <Link to="/vehiculo/list">Volver a la Lista</Link>
    </Box>
  );
};

export default AddVehiculo;