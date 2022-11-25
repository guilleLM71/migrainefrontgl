import React, { Component } from "react";
import swal from "sweetalert";
import preguntas from "../preguntas";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {
  CircularProgress,
  Button,
  TextField,
  Link,
  Grid,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  TableFooter,
  TablePagination,
} from "@material-ui/core";

import { makeStyles, withStyles, lighten } from "@material-ui/styles";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import Doctor from "./Doctor";

const axios = require("axios");
const roles = [];
const resps = [];
const respsV = [];
const sintomashead = [
  "EDAD",
  "DURACION(dias)",
  "FRECUENCIA(#/mes)",
  "LUGAR",
  "CARACTERISTICA",
  "INTENSIDAD",
  "NAUSEAS",
  "VOMITO",
  "FONOFOBIA",
  "FOTOFOBIA",
  "N° PROBLEMAS VISUALES",
  "N° PROBLEMAS SENSORIALES",
  "DISFASIA",
  "ISARTRIA",
  "VERTIGO",
  "TINITUS",
  "HIPOACUSIA",
  "DIPLOPIA",
  "DEFECTOS VISUALES",
  "ATAXIA",
  "PERDIDA DE CONCIENCIA",
  "PARESTESIA",
  "DPF",
];

let map = new Map();

export default class Paciente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pacientes: [],
      loading: false,
      abiertomodaldiag: false,
      abiertomodaltrat: false,
      abiertomodaleditar: false,
      abiertomodalsintomas: false,
      abiertomodalcrearpaciente: false,

      preguntaActual: 0,
      respuestas: [],
      entrada: "",
      entradarespuesta: "",
      hiden: "inline",
      hiden2: "none",
      hidem3: "inline",
      terminardiag: false,

      respuestasValor: [],
      entradaValor: "",
      prediccion: "",

      loadingDiag: false,

      iduser: "",
      ci: "",
      nombre: "",
      sintomas: [],
      diagnostico: "",

      rowxpagina: 5,
      pagina: 0,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ pagina: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
    this.setState({ pagina: 0 });
  };

  predecir = async (e) => {
    const sints = this.state.respuestas.map((x) => parseInt(x));

    this.setState({ loadingDiag: true });
    await fetch("https://web-production-9492.up.railway.app/predict", {
      method: "POST",
      body: JSON.stringify({ Sintomas: [sints] }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(async (response) => {
        const datos = await response.json();
        console.log(datos);
        console.log(datos["pred"]);

        if (datos["pred"] === 6) {
          this.setState({ prediccion: "Aura tipica sin migraña" });
        }
        if (datos["pred"] === 5) {
          this.setState({ prediccion: "Aura tipica con migraña" });
        }
        if (datos["pred"] === 2) {
          this.setState({ prediccion: "migraña sin aura" });
        }
        if (datos["pred"] === 1) {
          this.setState({ prediccion: "Migraña hemipléjica familiar" });
        }
        if (datos["pred"] === 7) {
          this.setState({ prediccion: "Migraña cronica" });
        }
        if (datos["pred"] === 0) {
          this.setState({ prediccion: "Aura de tipo basilar" });
        }

        if (datos["pred"] === 3) {
          this.setState({
            prediccion:
              "Posiblemente no tengas migraña y sea otro tipo de cefalea casual",
          });
        }

        if (datos["pred"] === 4) {
          this.setState({ prediccion: "Migraña hemiplejica esporadica" });
        }
        this.setState({ loadingDiag: false });
        swal({
          text: "Diagnostico aprox : " + this.state.prediccion,
          icon: "success",
          type: "success",
        });

        this.setState({ terminardiag: true });
      })
      .catch(async (err) => console.log(await err));

    this.setState({ hidem3: "none" });
  };

  componentDidMount = async () => {
    console.log("renderpacientes...");
    await this.renderpacientes();
    console.log("terminado...");
  };
  renderpacientes = async () => {
    this.setState({ loading: true });

    await axios
      .post(
        `https://apimigraine.herokuapp.com/api/pacient/pacientes`,
        { iddoc: this.props.userid },
        { headers: { "x-access-token": this.props.token } }
      )
      .then((res) => {
        console.log("entro aqui");
        this.setState({ pacientes: res.data.pacientes });
        console.log(this.state.pacientes);
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log("error aqui");
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
      });
  };

  abrilmodalsintomas = async (idpac) => {
    this.setState({ abiertomodalsintomas: !this.state.abiertomodalsintomas });
    this.setState({ iduser: idpac });
    console.log(this.state.abiertomodalsintomas);

    let token = localStorage.getItem("token");
    await axios
      .get(`https://apimigraine.herokuapp.com/api/pacient/paciente/` + idpac, {
        headers: {
          "Content-type": "application/json",
          "x-access-token": token,
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({ sintomas: res.data.sintomas });
        for (let i = 0; i < this.state.sintomas.length; i++) {
          map.set(sintomashead[i], this.state.sintomas[i]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //this.setState({ loading: false })
  };

  abrilmodalcrearpaciente = async (idpac) => {
    this.setState({
      abiertomodalcrearpaciente: !this.state.abiertomodalcrearpaciente,
    });
  };

  registrarpaciente = async () => {
    let token = localStorage.getItem("token");

    this.setState({ loading: true });

    await axios
      .post(
        `https://apimigraine.herokuapp.com/api/pacient/doctor`,
        {
          ci: this.state.ci,
          nombre: this.state.nombre,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        console.log("entro aqui");
        this.renderpacientes();
        swal({
          text: res.data.title,
          icon: "success",
          type: "success",
        });
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log("error aqui");
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error",
        });
      });

    this.setState({ abiertomodalcrearpaciente: false });
  };

  abrilmodaldiagnostico = async (idpac) => {
    this.setState({ abiertomodaldiag: !this.state.abiertomodaldiag });
    this.setState({ iduser: idpac });
    console.log(this.state.abiertomodaldiag);
  };

  updatediagnosticopac = async () => {
    let iduser = this.state.iduser;
    let token = localStorage.getItem("token");

    console.log(this.state.prediccion);
    console.log(token);

    const headers = {
      "content-type": "application/json",
      "x-access-token": token,
    };

    this.setState({ loading: true });
    await axios
      .put(
        `https://apimigraine.herokuapp.com/api/pacient/pacientes/` + iduser,
        JSON.stringify({
          sintomas: this.state.respuestasValor,
          diagnostico: this.state.prediccion,
        }),
        {
          headers: {
            "Content-type": "application/json",
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.renderpacientes();
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ loading: false });
    swal({
      text: "Diagnostico terminado",
      icon: "success",
      type: "success",
    });

    this.setState({ abiertomodaldiag: false });
  };

  abrilmodaltratamiento = async (idpac) => {
    this.setState({ abiertomodaltrat: !this.state.abiertomodaltrat });
    console.log(this.state.abiertomodaltrat);
  };

  abrilmodaleditarpac = async (idpac) => {
    this.setState({ abiertomodaleditar: !this.state.abiertomodaleditar });
    this.setState({ iduser: idpac });
    let token = localStorage.getItem("token");
    await axios
      .get(`https://apimigraine.herokuapp.com/api/pacient/paciente/` + idpac, {
        headers: {
          "Content-type": "application/json",
          "x-access-token": token,
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({ ci: res.data.ci });
        this.setState({ nombre: res.data.nombre });
      })
      .catch((err) => {
        console.log(err);
      });

    //this.setState({ loading: false })

    console.log(this.state.abiertomodaleditar);
  };

  editarpaciente = async () => {
    let iduser = this.state.iduser;
    let token = localStorage.getItem("token");

    console.log(token);

    this.setState({ loading: true });
    await axios
      .put(
        `https://apimigraine.herokuapp.com/api/pacient/paciente/` + iduser,
        JSON.stringify({
          _id: iduser,
          ci: this.state.ci,
          nombre: this.state.nombre,
        }),
        {
          headers: {
            "Content-type": "application/json",
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.renderpacientes();
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ loading: false });
    swal({
      text: "Actulizado",
      icon: "success",
      type: "success",
    });

    this.setState({ abiertomodaldiag: false });
  };

  borrarpaciente = async (idpac) => {
    this.setState({ iduser: idpac });
    let token = localStorage.getItem("token");

    console.log(token);

    await axios
      .delete(
        `https://apimigraine.herokuapp.com/api/pacient/paciente/${idpac}`,
        {
          headers: {
            "Content-type": "application/json",
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.renderpacientes();
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ loading: false });
    swal({
      text: "Eliminado",
      icon: "success",
      type: "success",
    });
  };

  render() {
    const modalStyles = {
      position: "absolute",
      top: "50%",
      left: "50%",
      maxWidth: "100%",
      transform: "translate(-50%, -50%)",
    };

    const modalStylesdiag = {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "300%",
      transform: "translate(-50%, -50%)",
    };

    const modalStyleseditar = {
      position: "absolute",
      top: "50%",
      left: "50%",
      maxWidth: "100%",
      transform: "translate(-50%, -50%)",
    };

    const classes = makeStyles({
      root: {
        position: "relative",
      },
      top: {
        color: "#eef3fd",
      },
      bottom: {
        color: "#6798e5",
        animationDuration: "550ms",
        position: "absolute",
        left: 0,
      },
    });
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <div style={{ marginTop: "100px" }}>
          <div>
            <h2>Pacientes</h2>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <Button
              onClick={() => {
                this.abrilmodalcrearpaciente();
              }}
              className="button_style"
                          variant="contained"
                          color="primary"
                          size="small"
            >
              <i><FaIcons.FaRegistered></FaIcons.FaRegistered> Registrar Paciente</i>
            </Button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">CI</TableCell>
                  <TableCell align="center">NOMBRE</TableCell>
                  <TableCell align="center">DIAGNOSTICO</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.pacientes.map((paciente) => {
                  return (
                    <TableRow key={paciente._id}>
                      <TableCell>{paciente.ci}</TableCell>
                      <TableCell>{paciente.nombre}</TableCell>
                      <TableCell>{paciente.diagnostico}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            this.abrilmodalsintomas(paciente._id);
                          }}
                                                  
                          className="button_style"
                          variant="contained"
                          color="primary"
                          size="small"
                          


                        >
                          <i className="material-icons">Sintomas</i>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            this.abrilmodaldiagnostico(paciente._id);
                          }}
                          className="button_style"
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          <i className="material-icons">Diagnosticar</i>
                        </Button>
                        <Button
                          onClick={() => {
                            this.abrilmodaltratamiento(paciente._id);
                          }}
                          className="button_style"
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ margin: "4px" }}
                        >
                          <i className="material-icons">Tratamiento</i>
                        </Button>
                        <Button
                          onClick={() => {
                            this.abrilmodaleditarpac(paciente._id);
                          }}
                          className="button_style"
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          <i><FaIcons.FaEdit></FaIcons.FaEdit> Editar</i>
                        </Button>
                        <Button
                          onClick={() => {
                            this.borrarpaciente(paciente._id);
                          }}
                          className="button_style"
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          <i> <FaIcons.FaEraser></FaIcons.FaEraser> Borrar</i>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Modal
            show={this.state.abiertomodaldiag}
            style={{ modalStylesdiag, color: "#000" }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
      
          >
            <ModalHeader style={{ color: "#000" }}>
              Realiza un diagnostico{" "}
            </ModalHeader>
            <ModalBody>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                width="auto"
                style={{ width: "auto" }}
              >
                <div className="app " style={{ width: "auto", color: "#fff" }}>
                  <div className="lado-izquierdo ">
                    <div className="numero-pregunta">
                      <span> Pregunta {this.state.preguntaActual + 1} de</span>{" "}
                      {preguntas.length}
                    </div>
                    <div className="titulo-pregunta">
                      {preguntas[this.state.preguntaActual].titulo}
                    </div>
                    <div>
                      <button
                        disabled={this.state.entradarespuesta === ""}
                        style={{ display: this.state.hiden }}
                        onClick={() => {
                          if (
                            this.state.preguntaActual >=
                            preguntas.length - 1
                          ) {
                            console.log(this.state.preguntaActual);
                            console.log(preguntas.length - 1);

                            resps.push(this.state.entrada);
                            this.setState({ respuestas: resps });

                            respsV.push(this.state.entradaValor);
                            this.setState({ respuestasValor: respsV });

                            console.log(resps);
                            console.log(this.state.respuestas);
                            console.log(this.state.respuestasValor);

                            this.setState({ entrada: "" });
                            this.setState({ entradarespuesta: "" });
                            this.setState({ entradaValor: "" });

                            this.setState({ hiden: "none" });
                            this.setState({ hiden2: "inline" });
                            this.setState({ terminardiag: true });

                            this.predecir();
                          } else {
                            this.setState({
                              preguntaActual: this.state.preguntaActual + 1,
                            });
                            console.log(this.state.preguntaActual);
                            console.log(preguntas.length - 1);

                            resps.push(this.state.entrada);
                            this.setState({ respuestas: resps });

                            respsV.push(this.state.entradaValor);
                            this.setState({ respuestasValor: respsV });

                            console.log(resps);
                            console.log(this.state.respuestas);
                            console.log(this.state.respuestasValor);

                            this.setState({ entrada: "" });
                            this.setState({ entradarespuesta: "" });
                            this.setState({ entradaValor: "" });
                          }
                        }}
                      >
                        Continuar
                      </button>

                      <br></br>
                    </div>
                  </div>
                  <div className="lado-derecho">
                    {preguntas[this.state.preguntaActual].respuesta.map(
                      (respuestas) => {
                        {
                          //console.log(preguntas[this.state.preguntaActual].titulo)
                          // console.log(preguntas[this.state.preguntaActual].tipopregunta)
                          //console.log(respuestas)
                          if (
                            preguntas[this.state.preguntaActual]
                              .tipopregunta === "input"
                          ) {
                            //console.log(this.state.entrada);
                            return (
                              <TextField
                                key={preguntas[this.state.preguntaActual].id}
                                id="standard-number"
                                type="number"
                                autoComplete="off"
                                name="entrada"
                                value={this.state.entrada}
                                onChange={(e) => {
                                  this.onChange(e);
                                  this.setState({
                                    entradarespuesta: e.target.value,
                                  });
                                  this.setState({
                                    entradaValor: e.target.value,
                                  });
                                }}
                                placeholder="respuesta"
                                required
                                color="secondary"
                                focused
                                style={{
                                  borderRadius: 4,
                                  position: "relative",
                                  backgroundColor: "#fcfcfb",
                                  border: "1px solid",
                                  fontSize: 15,
                                  width: "auto",
                                  padding: "10px 10px",
                                }}
                              />
                            );
                          }

                          if (
                            preguntas[this.state.preguntaActual]
                              .tipopregunta === "button"
                          ) {
                            return (
                              <button
                                name={respuestas.textoRespuesta}
                                value={respuestas.value}
                                onClick={(event) => {
                                  this.setState({
                                    entrada: event.target.value,
                                  });
                                  this.setState({
                                    entradaValor: event.target.name,
                                  });
                                  this.setState({
                                    entradarespuesta: respuestas.textoRespuesta,
                                  });
                                  // console.log(respuestas.value)
                                }}
                              >
                                {respuestas.textoRespuesta}
                              </button>
                            );
                          }
                        }
                      }
                    )}

                    <div className="">
                      <p1>Respuesta: </p1>
                      <span>{this.state.entradarespuesta}</span>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                {this.state.loadingDiag ? (
                  <>
                    {" "}
                    <div>Diagnosticando...</div>
                    <br />
                    <br />
                    <CircularProgress
                      variant="indeterminate"
                      disableShrink
                      className={classes.bottom}
                      size={24}
                      thickness={4}
                    />{" "}
                  </>
                ) : null}

                {this.state.loading ? (
                  <>
                    {" "}
                    <div>Espere...</div>
                    <br />
                    <br />
                    <CircularProgress
                      variant="indeterminate"
                      disableShrink
                      className={classes.bottom}
                      size={24}
                      thickness={4}
                    />{" "}
                  </>
                ) : null}
              </Grid>
            </ModalBody>

            <ModalFooter>
              <Button
                color="primary"
                onClick={() => {
                  this.updatediagnosticopac();
                }}
              >
                Terminar
              </Button>

              <Button color="secondary" onClick={this.abrilmodaldiagnostico}>
                Cerrar
              </Button>
            </ModalFooter>
          </Modal>
          <Modal
            show={this.state.abiertomodaltrat}
            style={{ modalStyles, color: "#000" }}
          >
            <ModalHeader style={{ color: "#000" }}>
              Realiza un tratamiento{" "}
            </ModalHeader>
            <ModalBody></ModalBody>

            <ModalFooter>
              <Button color="primary">Terminar</Button>

              <Button color="secondary" onClick={this.abrilmodaltratamiento}>
                Cerrar
              </Button>
            </ModalFooter>
          </Modal>
          <Modal
            show={this.state.abiertomodaleditar}
            style={{ modalStyles, color: "#000" }}
          >
            <ModalHeader style={{ color: "#000" }}>
              Editar paciente{" "}
            </ModalHeader>
            <ModalBody>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <div>
                  <div>
                    <h2>Editar paciente</h2>
                  </div>

                  <div>
                    <TextField
                      id="standard-basic"
                      type="text"
                      autoComplete="off"
                      name="ci"
                      value={this.state.ci}
                      onChange={this.onChange}
                      placeholder="ci"
                      required
                    />
                    <br />
                    <br />

                    <TextField
                      id="standard-basic"
                      type="text"
                      autoComplete="off"
                      name="nombre"
                      value={this.state.nombre}
                      onChange={this.onChange}
                      placeholder="nombre"
                      required
                    />
                    <br />
                    <br />

                    <Button
                      className="button_style"
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={this.editarpaciente}
                    >
                      Actulizar
                    </Button>
                    <br />
                    <br />
                    {this.state.loading ? (
                      <>
                        {" "}
                        <div>Espere...</div>
                        <br />
                        <br />{" "}
                        <CircularProgress
                          variant="indeterminate"
                          disableShrink
                          className={classes.bottom}
                          size={24}
                          thickness={4}
                        />
                      </>
                    ) : null}
                  </div>
                </div>
              </Grid>
            </ModalBody>

            <ModalFooter>
              <Button color="primary">Terminar</Button>

              <Button
                color="secondary"
                onClick={() => {
                  this.setState({ abiertomodaleditar: false });
                }}
              >
                Cerrar
              </Button>
            </ModalFooter>
          </Modal>
          <Modal
            show={this.state.abiertomodalsintomas}
            style={{ modalStyles, color: "#000" }}
          >
            <ModalHeader style={{ color: "#000" }}>Sintomas</ModalHeader>
            <ModalBody>
              <TableContainer
                style={{ width: "auto", color: "#000" }}
                component={Paper}
              >
                <Table
                  style={{ color: "#000" }}
                  sx={{ minWidth: "450px" }}
                  aria-label="simple table"
                >
                  {sintomashead
                    .slice(
                      this.state.pagina * this.state.rowxpagina,
                      this.state.pagina * this.state.rowxpagina +
                        this.state.rowxpagina
                    )
                    .map((cellsintoma) => {
                      return (
                        <TableRow>
                          <TableCell>{cellsintoma}</TableCell>
                          <TableCell>{map.get(cellsintoma)}</TableCell>
                        </TableRow>
                      );
                    })}

                  <TableFooter style={{ color: "#000" }}>
                    <TableRow style={{ color: "#000" }}>
                      <TablePagination
                        rowsPerPageOptions={0}
                        colSpan={3}
                        count={sintomashead.length}
                        rowsPerPage={this.state.rowxpagina}
                        page={this.state.pagina}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </ModalBody>

            <ModalFooter>
              <Button
                color="secondary"
                onClick={() => {
                  this.setState({ abiertomodalsintomas: false });
                }}
              >
                Cerrar
              </Button>
            </ModalFooter>
          </Modal>
          <Modal
            show={this.state.abiertomodalcrearpaciente}
            style={{ modalStyles, color: "#000" }}
          >
            <ModalHeader style={{ color: "#000" }}>
              Registrar Paciente{" "}
            </ModalHeader>
            <ModalBody>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <TextField
                  id="standard-basic"
                  type="text"
                  autoComplete="off"
                  name="ci"
                  value={this.state.ci}
                  onChange={this.onChange}
                  placeholder="ci"
                  required
                />
                <br />
                <br />
                <TextField
                  id="standard-basic"
                  type="text"
                  autoComplete="off"
                  name="nombre"
                  value={this.state.nombre}
                  onChange={this.onChange}
                  placeholder="nombre"
                  required
                />
                <br />
                <br />
                <Button
                  className="button_style"
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={
                    this.state.username === "" && this.state.password === ""
                  }
                  onClick={this.registrarpaciente}
                >
                  Registrar
                </Button>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <br />
                <br />
                {this.state.loading ? (
                  <>
                    {" "}
                    <div>Espere...</div>
                    <br />
                    <br />{" "}
                    <CircularProgress
                      variant="indeterminate"
                      disableShrink
                      className={classes.bottom}
                      size={24}
                      thickness={4}
                    />
                  </>
                ) : null}
              </Grid>
            </ModalBody>

            <ModalFooter>
              <Button color="secondary" onClick={this.abrilmodalcrearpaciente}>
                Cerrar
              </Button>
            </ModalFooter>
          </Modal>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <br />
          {this.state.loading ? (
            <>
              {" "}
              <div>Espere...</div>
              <br />
              <br />{" "}
              <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.bottom}
                size={24}
                thickness={4}
              />
            </>
          ) : null}
        </div>
      </Grid>
    );
  }
}
