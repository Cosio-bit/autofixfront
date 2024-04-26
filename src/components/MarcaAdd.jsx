import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import marcaService from "../services/marca.service.js";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import DropdownTipoMarca from './TipoMarca.jsx';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';


const AddMarca = () => {
  const [nombre, setNombre] = useState(""); // Patente en lugar de rut, según la entidad
  const [fechaBono, setFechaBono] = useState("");
  const [descuento, setDescuento] = useState(0); // Asumiendo que nroAsientos es un número
  const [cantidadBonos, setCantidadBonos] = useState(0); // Asumiendo que kilometraje es un número
  const { id } = useParams();
  const [titleMarcaForm, setTitleMarcaForm] = useState("");
  const navigate = useNavigate();

  const saveMarca = (e) => {
    e.preventDefault();

    const marca = { 
      nombre,
      fechaBono,
      descuento,
      cantidadBonos,
      id };
      
    if (id) {
      //Actualizar Datos Empelado
      marcaService
        .update(marca)
        .then((response) => {
          console.log("marca ha sido actualizado.", response.data);
          navigate("/marca/list");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar actualizar datos del marca.",
            error
          );
        });
    } else {
      //Crear nuevo empleado
      marcaService
        .create(marca)
        .then((response) => {
          console.log("marca ha sido añadido.", response.data);
          navigate("/marca/list");
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
      setTitleMarcaForm("Editar Marca");
      marcaService
        .get(id)
        .then((marca) => {
          setNombre(marca.data.nombre);
          setFechaBono(marca.data.fechaBono);
          setDescuento(marca.data.descuento);
          setCantidadBonos(marca.data.cantidadBonos);
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitleMarcaForm("Nuevo Marca");
    }
  }, [id]);


  const handleNombreChange = (nombre) => {
    setNombre(nombre);
  }

  const handleDateChangeBono = (date) => {
    setFechaBono(date);
};

const handleSetCurrentDateTimeBono = () => {
    const currentDateTime = Date.now();
    setFechaBono(currentDateTime);
};


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
      <h3 style={{ marginBottom: "20px", color: "white" }}>{titleMarcaForm}</h3>
      <hr style={{ width: "100%", border: "none", borderBottom: "1px solid #fff", marginBottom: "20px" }} />
      <hr />
      <form>

        <DropdownTipoMarca onChange={handleNombreChange} />

        <FormControl fullWidth>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ flex: '1' }}>
                    <Datetime
                        inputProps={{ style: { color: "#f0f0f0" } }}
                        value={fechaBono}
                        onChange={handleDateChangeBono}
                        dateFormat="YYYY-MM-DD"
                        timeFormat={false}
                        locale="es"
                    />
                </div>
                <div>
                    <Button variant="contained" color="primary" onClick={handleSetCurrentDateTimeBono}>
                        Establecer actual
                    </Button>
                </div>
            </div>
        </FormControl>


        <FormControl fullWidth>
          <TextField
            id="descuento"
            label="descuento"
            type="number"
            value={descuento}
            variant="standard"
            onChange={(e) => setDescuento(e.target.value)}
            InputLabelProps={{ style: { color: "#f0f0f0" } }}
            InputProps={{ style: { color: "#f0f0f0" } }}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="cantidadBonos"
            label="cantidadBonos"
            type="number"
            value={cantidadBonos}
            variant="standard"
            onChange={(e) => setCantidadBonos(e.target.value)}
            InputLabelProps={{ style: { color: "#f0f0f0" } }}
            InputProps={{ style: { color: "#f0f0f0" } }}
          />
        </FormControl>

        <FormControl>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => saveMarca(e)}
            style={{ marginLeft: "0.5rem" }}
            startIcon={<SaveIcon />}
          >
            Guardar
          </Button>
        </FormControl>
      </form>
      <hr />
      <Link to="/marca/list">Volver a la Lista</Link>
    </Box>
  );
};

export default AddMarca;