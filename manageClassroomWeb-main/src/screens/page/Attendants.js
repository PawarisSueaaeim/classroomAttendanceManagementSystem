import React from "react";
import { useState, useEffect } from "react";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryPie,
  VictoryStack,
  VictoryPortal,
  VictoryLabel,
} from "victory";
const url = require("../components/urlConfig");

const moment = require("moment");

function Attandents(props) {
  const [studentNameModal, setStudentNameModal] = useState("");
  const [studentIDModal, setStudentIDModal] = useState("");
  const [teacherIDState, setTeacherIDState] = useState(null);
  const [attClassState, setAttClassState] = useState({});
  const [attClassStudent, setAttClassStudent] = useState([]);
  const [addStudentName, setAddStudentName] = useState(null);
  const [addStudentID, setAddStudentID] = useState(null);
  const [checkList, setCheckList] = useState([]);
  const [weekDup, setWeekDup] = useState([]);
  const [studentStatChart, setStudentStatChart] = useState({});

  useEffect(() => {
    var teacherID = localStorage.getItem("teacherID");
    setTeacherIDState(teacherID);
  }, []);

  useEffect(() => {
    const fetchAttendance = async () => {
      await attClassAPI(
        teacherIDState,
        props.location.state.detailClass,
        props.location.state.selectedDate
      );
    };

    if (teacherIDState != null) fetchAttendance();
  }, [teacherIDState]);

  const onChangeTextStudentID = (event) => {
    setAddStudentID(event.target.value);
    console.log(event.target.value);
  };
  const onChangeTextStudentName = (event) => {
    setAddStudentName(event.target.value);
    console.log(event.target.value);
  };

  const attClassAPI = async (teacherID, uqID, date) => {
    await fetch(url.endpointWebApp + "/attendance", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attClassUqID: uqID,
        attClassTeacherID: teacherID,
        attClassCurrentDate: date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAttClassState(data);
        setWeekDup(data.duplicatedDay);
        console.log(data.duplicatedDay);
        setAttClassStudent(data.statistics);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeStudentList = async (uqID, teacherID, studentID) => {
    await fetch(url.endpointWebApp + "/removeStudentList", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherID: teacherID,
        uqID: uqID,
        studentID: studentID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const studentStat = async (uqID, studentID, teacherID) => {
    await fetch(url.endpointWebApp + "/studentReport", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherID: teacherID,
        uqID: uqID,
        studentID: studentID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCheckList(data.myData);
        setStudentStatChart(data.studentStat);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const checkAll = async (teacherId, uqID, date) => {
    console.log(teacherId, uqID, date);
    await fetch(url.endpointWebApp + "/checkAllStudent", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherID: teacherId,
        uqID: uqID,
        date: date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const uncheckAll = async (teacherId, uqID, date) => {
    console.log(teacherId, uqID, date);
    await fetch(url.endpointWebApp + "/uncheckAllStudent", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherID: teacherId,
        uqID: uqID,
        date: date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const checkStudent = async (uqID, date, studentID, teacherID) => {
    console.log(studentID);
    await fetch(url.endpointWebApp + "/checkStudent", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherID: teacherID,
        uqID: uqID,
        studentID: studentID,
        date: date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addStudent = async (uqID, studentID, studentName, teacherID) => {
    await fetch(url.endpointWebApp + "/addStudent", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherID: teacherID,
        uqID: uqID,
        studentID: studentID,
        studentName: studentName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const uncheckStudent = async (uqID, date, studentID, teacherID) => {
    console.log(studentID);
    await fetch(url.endpointWebApp + "/uncheckStudent", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherID: teacherID,
        uqID: uqID,
        studentID: studentID,
        date: date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const head = ["????????????????????????????????????", "????????????????????????????????????", "????????????????????????????????????????????????", "???????????????"];

  return (
    <div className="container-fluid pt-4">
      <div className="box">
        <h3 className="head_text">????????????????????????????????????????????????</h3>
        <div className="row mt-5">
          <div className="col-5">
            <div className="box_subject">
              <tr>
                <td>
                  <tr>
                    <th className="p-1">????????????????????????: {attClassState.name}</th>
                    <th className="p-1">????????????????????????: {attClassState.id}</th>
                  </tr>
                  <tr>
                    <tr>
                      <td>
                        <th>?????????:</th>
                        <th>
                          {weekDup[0] == true ? (
                            <td className="m-1 p-1">????????????????????? </td>
                          ) : null}
                          {weekDup[1] == true ? (
                            <td className="m-1 p-1">?????????????????? </td>
                          ) : null}
                          {weekDup[2] == true ? (
                            <td className="m-1 p-1">?????????????????? </td>
                          ) : null}
                          {weekDup[3] == true ? (
                            <td className="m-1 p-1">????????? </td>
                          ) : null}
                          {weekDup[4] == true ? (
                            <td className="m-1 p-1">???????????????????????? </td>
                          ) : null}
                          {weekDup[5] == true ? (
                            <td className="m-1 p-1">??????????????? </td>
                          ) : null}
                          {weekDup[6] == true ? (
                            <td className="m-1 p-1">??????????????? </td>
                          ) : null}
                        </th>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <th>
                          ????????????: {attClassState.startTime} -{" "}
                          {attClassState.endTime}
                        </th>
                      </td>
                    </tr>
                  </tr>
                  <tr>
                    <th>
                      ??????????????????:{" "}
                      {moment(attClassState.currentDate)
                        .format("DD/MM/YYYY")
                        .toString()}
                    </th>
                  </tr>
                  <tr>
                    <th>???????????????????????????: {attClassState.desc}</th>
                    <th className="pl-5">
                      {attClassState.present}
                      <HiIcons.HiUser style={{ color: "green" }} />
                      {attClassState.absent}
                      <HiIcons.HiUser style={{ color: "red" }} />
                    </th>
                  </tr>
                </td>
              </tr>
            </div>
            <div className="att_pei">
              <VictoryPie
                data={[
                  {
                    x: `??????????????????????????? ${attClassState.present} ??????`,
                    y: attClassState.present,
                  },
                  {
                    x: `???????????????????????????????????? ${attClassState.absent} ??????`,
                    y: attClassState.absent,
                  },
                ]}
                width={300}
                colorScale={["green", "red"]}
              />
            </div>
          </div>
          <div className="col">
            <div className="att_css">
              <VictoryChart domainPadding={{ x: 20 }}>
                <VictoryStack
                  colorScale={["green", "red"]}
                  style={{
                    data: { width: 20 },
                    labels: { padding: -20 },
                  }}
                  labelComponent={
                    <VictoryPortal>
                      <VictoryLabel />
                    </VictoryPortal>
                  }
                >
                  <VictoryBar
                    data={attClassState.statEachDate}
                    x="date"
                    y="present"
                    labels={({ datum }) => (datum.present ? datum.present : "")}
                    style={{ labels: { fill: "white" } }}
                  />
                  <VictoryBar
                    data={attClassState.statEachDate}
                    x="date"
                    y="absent"
                    labels={({ datum }) => (datum.absent ? datum.absent : "")}
                    style={{ labels: { fill: "white" } }}
                  />
                </VictoryStack>
                <VictoryAxis
                  label="??????-???????????????-?????????"
                  style={{
                    axisLabel: { padding: 30 },
                    tickLabels: { fontSize: 8, padding: 5 },
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  label="???????????????????????????????????????"
                  style={{
                    axisLabel: { padding: 40 },
                  }}
                />
              </VictoryChart>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="row">
            <div className="col">
              <td className="col-8">
                <h3 className="head_text">?????????????????????????????????????????????</h3>
              </td>
              <td className="col-1"></td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger mx-2"
                  onClick={async () => {
                    await uncheckAll(
                      attClassState.teacherID,
                      attClassState.uqID,
                      attClassState.currentDate
                    );
                    await attClassAPI(
                      teacherIDState,
                      props.location.state.detailClass,
                      props.location.state.selectedDate
                    );
                  }}
                >
                  ???????????????????????????????????????????????????????????????
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    await checkAll(
                      attClassState.teacherID,
                      attClassState.uqID,
                      attClassState.currentDate
                    );
                    await attClassAPI(
                      teacherIDState,
                      props.location.state.detailClass,
                      props.location.state.selectedDate
                    );
                  }}
                >
                  ?????????????????????????????????????????????
                </button>
              </td>
            </div>
          </div>
          <div className="col mt-3 box">
            <table className="table table-secondary table-striped">
              <thead>
                {head.map((h, idx) => (
                  <th key={idx}>{h}</th>
                ))}
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="????????????????????????????????????"
                      aria-label="Student ID"
                      onChange={(evt) => onChangeTextStudentID(evt)}
                    ></input>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="???????????? - ?????????????????????"
                      aria-label="Name"
                      onChange={(evt) => onChangeTextStudentName(evt)}
                    ></input>
                  </td>
                  <td className="col-2"></td>
                  <td className="col-2"></td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-success mx-1"
                      onClick={async (e) => {
                        await addStudent(
                          attClassState.uqID,
                          addStudentID,
                          addStudentName,
                          teacherIDState
                        );
                        await attClassAPI(
                          teacherIDState,
                          props.location.state.detailClass,
                          props.location.state.selectedDate
                        );
                      }}
                    >
                      ???????????????
                    </button>
                  </td>
                </tr>
                {attClassStudent.map((t, idx) => (
                  <tr key={idx}>
                    <td>{t.studentUqID}</td>
                    <td>{t.studentName}</td>
                    {t.timestamp == null ? (
                      <td>???????????????????????????????????????????????????</td>
                    ) : (
                      <td>{t.timestamp}</td>
                    )}
                    {t.isChecked ? (
                      <td>
                        <button
                          className="btn btn-success mx-1"
                          onClick={async (e) => {
                            await uncheckStudent(
                              attClassState.uqID,
                              attClassState.currentDate,
                              t.studentID,
                              teacherIDState
                            );
                            await attClassAPI(
                              teacherIDState,
                              props.location.state.detailClass,
                              props.location.state.selectedDate
                            );
                          }}
                        >
                          ???????????????????????????????????????????????????
                        </button>
                        <HiIcons.HiUser style={{ color: "green" }} />
                      </td>
                    ) : (
                      <td>
                        <button
                          className="btn btn-warning mx-1"
                          onClick={async (e) => {
                            await checkStudent(
                              attClassState.uqID,
                              attClassState.currentDate,
                              t.studentID,
                              teacherIDState
                            );
                            await attClassAPI(
                              teacherIDState,
                              props.location.state.detailClass,
                              props.location.state.selectedDate
                            );
                          }}
                        >
                          ????????????????????????
                        </button>
                        <HiIcons.HiUser style={{ color: "red" }} />
                      </td>
                    )}
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger mx-1"
                        onClick={async () => {
                          await removeStudentList(
                            attClassState.uqID,
                            attClassState.teacherID,
                            t.studentID
                          );
                          await attClassAPI(
                            teacherIDState,
                            props.location.state.detailClass,
                            props.location.state.selectedDate
                          );
                        }}
                      >
                        ??????
                      </button>
                      <button
                        className="btn btn-primary mx-1"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={async (e) => {
                          setStudentNameModal(t.studentName);
                          setStudentIDModal(t.studentUqID);
                          await studentStat(
                            attClassState.uqID,
                            t.studentID,
                            teacherIDState
                          );
                        }}
                      >
                        ??????????????????????????????????????????????????????
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title head_text" id="exampleModalLabel">
                {studentNameModal} {studentIDModal}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="att_pei">
                <VictoryPie
                  data={[
                    { x: "???????????????????????????", y: studentStatChart.present },
                    { x: "?????????", y: studentStatChart.absent },
                  ]}
                  width={300}
                  colorScale={["green", "red"]}
                  labels={({ datum }) => `${datum.x}: ${datum.y}`}
                />
              </div>
              <tbody>
                <h3 className="head_text pt-3">??????????????????????????????????????????</h3>
                {checkList.map((t, idx) => (
                  <tr className="check_list ml-3" key={idx}>
                    {t.date} ???????????????{" "}
                    {t.classStatus == -1 ? (
                      <td>
                        ??????????????????????????????
                        <BsIcons.BsStopwatchFill
                          style={{ color: "#FFCC33" }}
                          className="mx-1"
                        />
                      </td>
                    ) : t.isChecked ? (
                      <td>
                        {t.timestamp}
                        <MdIcons.MdCheckCircle
                          style={{ color: "green" }}
                          className="mx-1"
                        />
                      </td>
                    ) : (
                      <td>
                        ?????????????????????????????????????????????
                        <HiIcons.HiMinusCircle
                          style={{ color: "red" }}
                          className="mx-1"
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                ?????????
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attandents;
