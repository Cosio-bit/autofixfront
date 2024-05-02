import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import vehiculoService from "../services/vehiculo.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DropdownTipoMarca from "./TipoMarca";
import DropdownTipoMotor from "./TipoMotor";
import DropdownTipoVehiculo from "./TipoVehiculo";

// URL de la imagen de Internet
const backgroundImageUrl = "https://imgs.search.brave.com/2s2NZU7sv94_N-AIsDMpNQ_9VQLAIjYqll8aUf5tE_I/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9yZXRy/by1yZWQtY2FyLXN5/bnRod2F2ZS1wb3N0/ZXItdmFwb3J3YXZl/LXN1bnNldC1uZW9u/LWdyYWRpZW50LWJh/Y2tncm91bmQtcmV0/cm8tcmVkLWNhci1z/eW50aHdhdmUtcG9z/dGVyLXZhcG9yd2F2/ZS0yNjIwNDgzMDAu/anBn";

const VehiculoList = () => {
  const [vehiculos, setVehiculos] = useState([]);

  const navigate = useNavigate();

  const init = () => {
    vehiculoService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los vehiculos.", response.data);
        setVehiculos(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los vehiculos.",
          error
        );
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    console.log("Printing id", id);
    const confirmDelete = window.confirm(
      "¿Esta seguro que desea borrar este vehiculo?"
    );
    if (confirmDelete) {
      vehiculoService
        .remove(id)
        .then((response) => {
          console.log("vehiculo ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar al vehiculo",
            error
          );
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/vehiculo/edit/${id}`);
  };

  const handleReparacionesVehiculo = (id) => {
    navigate(`/reparacion/list/${id}`);
  };

  const handleReparacionesMarca = (marca) => {
    navigate(`/reparacion/list/marca/${marca}`);
  };

  const handleReparacionesTipoMotor = (tipoMotor) => {
    navigate(`/reparacion/list/tipoMotor/${tipoMotor}`);
  };

  const handleReparacionesTipoVehiculo = (tipoVehiculo) => {
    navigate(`/reparacion/list/tipoVehiculo/${tipoVehiculo}`);
  };

  const handleAnadirReparacion = (id) => {
    navigate(`/reparacion/add/${id}`);
  }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <TableContainer component={Paper} style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
        <br />
        <Link
          to="/vehiculo/add"
          style={{ textDecoration: "none", marginBottom: "1rem" }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAddIcon />}
          >
            Añadir Vehiculo
          </Button>
        </Link>
        <br /> <br />
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                patente
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                marca
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                modelo
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Año de Fabricación
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Tipo de Vehículo
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Tipo de Motor
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Número de Asientos
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Kilometraje
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehiculos.map((vehiculo) => (
              <TableRow
                key={vehiculo.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{vehiculo.patente}</TableCell>
                <TableCell align="left">{vehiculo.marca}</TableCell>
                <TableCell align="left">{vehiculo.modelo}</TableCell>
                <TableCell align="left">{vehiculo.annoFabricacion}</TableCell>
                <TableCell align="left">{vehiculo.tipoVehiculo}</TableCell>
                <TableCell align="left">{vehiculo.tipoMotor}</TableCell>
                <TableCell align="right">{vehiculo.nroAsientos}</TableCell>
                <TableCell align="right">{vehiculo.kilometraje}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={() => handleEdit(vehiculo.id)}
                    style={{ marginLeft: "0.5rem" }}
                    startIcon={<EditIcon />}
                  >
                    Editar
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(vehiculo.id)}
                    style={{ marginLeft: "0.5rem" }}
                    startIcon={<DeleteIcon />}
                  >
                    Eliminar
                  </Button>

                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleReparacionesVehiculo(vehiculo.id)}
                    style={{ marginLeft: "0.5rem" }}
                    startIcon={<EditIcon />}
                  >
                    Reparaciones
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleAnadirReparacion(vehiculo.id)}
                    style={{ marginLeft: "0.5rem" }}
                    startIcon={<EditIcon />}
                  >
                    Añadir Reparación
                  </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/reparacion/list")}
          style={{ marginLeft: "0.5rem" }}
        >
          Lista de Reparaciones
        </Button>

        <DropdownTipoMarca onChange={handleReparacionesMarca} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleReparacionesMarca}
          style={{ marginLeft: "0.5rem" }}
        >
          Elegir marca de vehiculo para ver reparaciones
        </Button>

        <DropdownTipoMotor onChange={handleReparacionesTipoMotor} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleReparacionesTipoMotor}
          style={{ marginLeft: "0.5rem" }}
        >
          Elegir tipo de motor para ver reparaciones
        </Button>

        <DropdownTipoVehiculo onChange={handleReparacionesTipoVehiculo} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleReparacionesTipoVehiculo}
          style={{ marginLeft: "0.5rem" }}
        >
          Elegir tipo de vehiculo para ver reparaciones
        </Button>

      </TableContainer>
    </div>
  );
};

export default VehiculoList;
