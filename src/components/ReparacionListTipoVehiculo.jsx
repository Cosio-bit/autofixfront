import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import reparacionService from "../services/reparacion.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

// URL de la imagen de Internet
const backgroundImageUrl = "https://imgs.search.brave.com/2s2NZU7sv94_N-AIsDMpNQ_9VQLAIjYqll8aUf5tE_I/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9yZXRy/by1yZWQtY2FyLXN5/bnRod2F2ZS1wb3N0/ZXItdmFwb3J3YXZl/LXN1bnNldC1uZW9u/LWdyYWRpZW50LWJh/Y2tncm91bmQtcmV0/cm8tcmVkLWNhci1z/eW50aHdhdmUtcG9z/dGVyLXZhcG9yd2F2/ZS0yNjIwNDgzMDAu/anBn";
// eslint-disable-next-line react/prop-types
const ReparacionList = () => {
  const [reparaciones, setReparaciones] = useState([]);
  const { tipoVehiculo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    init(tipoVehiculo); // Pasamos el parámetro tipoVehiculo cuando está presente
  }, [tipoVehiculo]); // Dependencias del efecto
  
  const init = () => {
    //si es numero entonces es idVehiculo, si no es tipoVehiculo
    
      if (tipoVehiculo) {
      reparacionService
        .getByTipoVehiculo(tipoVehiculo)
        .then((response) => {
          console.log(`Mostrando listado de todas las reparaciones de la tipoVehiculo ${tipoVehiculo}.`, response.data);
          setReparaciones(response.data);
        })
        .catch((error) => {
          console.error(
            `Se ha producido un error al intentar mostrar listado de todas las reparaciones de la tipoVehiculo ${tipoVehiculo}.`,
            error
          );
        });
    } else {
      reparacionService
        .getAll()
        .then((response) => {
          console.log("Mostrando listado de todos las reparaciones.", response.data);
          setReparaciones(response.data);
        })
        .catch((error) => {
          console.error(
            "Se ha producido un error al intentar mostrar listado de todas las reparaciones.",
            error
          );
        });
    }
  };

  const calcularMontoTotalAcomulado = (reparacionesData) => {
    let sumaMontos = 0;
    reparacionesData.forEach((reparacion) => {
      sumaMontos += reparacion.montoTotal;
    });
    return sumaMontos; // Retorna la suma de montos
  };

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
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                fechaHoraIngreso
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                tipoReparacion
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                montoTotal
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                fechaHoraSalida
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                fechaHoraRetiro
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                idVehiculo
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reparaciones.map((reparacion) => (
              <TableRow
                key={reparacion.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{reparacion.fechaHoraIngreso}</TableCell>
                <TableCell align="left">{reparacion.tipoReparacion}</TableCell>
                <TableCell align="left">{reparacion.montoTotal}</TableCell>
                <TableCell align="left">{reparacion.fechaHoraSalida}</TableCell>
                <TableCell align="left">{reparacion.fechaHoraRetiro}</TableCell>
                <TableCell align="left">{reparacion.idVehiculo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell align="right" colSpan={6} sx={{ fontWeight: "bold" }}>
                Monto Total Acumulado:
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {calcularMontoTotalAcomulado(reparaciones)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/vehiculo/list")}
          style={{ marginLeft: "0.5rem" }}
        >
          Lista de Vehiculos
        </Button>
      </TableContainer>
    </div>
  );
};

export default ReparacionList;
