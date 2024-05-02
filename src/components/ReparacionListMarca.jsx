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
  const { marca } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    init(marca); // Pasamos el parámetro marca cuando está presente
  }, [marca]); // Dependencias del efecto
  
  const init = () => {
    //si es numero entonces es idVehiculo, si no es marca
    
      if (marca) {
      reparacionService
        .getByMarca(marca)
        .then((response) => {
          console.log(`Mostrando listado de todas las reparaciones de la marca ${marca}.`, response.data);
          setReparaciones(response.data);
        })
        .catch((error) => {
          console.error(
            `Se ha producido un error al intentar mostrar listado de todas las reparaciones de la marca ${marca}.`,
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
  const calcularTiempoPromedio = (reparacionesData) => {
    let sumaTiempos = 0;
    reparacionesData.forEach((reparacion) => {
      if (reparacion.fechaHoraSalida && reparacion.fechaHoraIngreso) {
        sumaTiempos += new Date(reparacion.fechaHoraSalida) - new Date(reparacion.fechaHoraIngreso);
      }
    });
    const totalReparaciones = reparacionesData.length;
    const tiempoPromedio = totalReparaciones > 0 ? sumaTiempos / totalReparaciones : 0;
    return tiempoPromedio;
  };
  

   // Función para formatear el tiempo neto
   const formatTiempoNeto = (tiempoNeto) => {
    const dias = Math.floor(tiempoNeto / (1000 * 60 * 60 * 24));
    const horas = Math.floor((tiempoNeto % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((tiempoNeto % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((tiempoNeto % (1000 * 60)) / 1000);
    let tiempoFormateado = '';
    if (dias > 0) tiempoFormateado += dias + " días ";
    if (horas > 0) tiempoFormateado += horas + " horas ";
    if (minutos > 0) tiempoFormateado += minutos + " minutos ";
    if (segundos > 0) tiempoFormateado += segundos + " segundos ";
    return tiempoFormateado;
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
       
        <br /> <br />
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
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Tiempo Neto
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
                <TableCell align="right">
                  {reparacion.fechaHoraSalida && reparacion.fechaHoraIngreso ?
                    formatTiempoNeto(new Date(reparacion.fechaHoraSalida) - new Date(reparacion.fechaHoraIngreso)) 
                    : null
                  }
                </TableCell>
                <TableCell align="left">{reparacion.idVehiculo}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell align="right" colSpan={6} sx={{ fontWeight: "bold" }}>
                Tiempo Promedio:
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {formatTiempoNeto(calcularTiempoPromedio(reparaciones))}
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