import { useState } from "react";
import {
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Grid,
  Checkbox,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { validator } from "../src/helpers/formValidator";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";
import classesList from "../src/const/classesList";
const App = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userDob, setUserDob] = useState(new Date("1990-08-18T21:11:54"));
  const [courseCatalog, setCourseCatalog] = useState(classesList);
  const allAreasOfStudy = classesList.map((course) => course.topic);
  const uniqueAreasOfStudy = [...new Set(allAreasOfStudy)];
  const areasOfStudyChecked = {};
  for (let topic of uniqueAreasOfStudy) {
    areasOfStudyChecked[topic] = false;
  }
  const [areasOfStudyCheckbox, setAreasOfStudyCheckbox] =
    useState(areasOfStudyChecked);
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [finalClassesChosen, setFinalClassesChosen] = useState(null);
  const handleDateChange = (newValue) => {
    setUserDob(newValue);
  };
  const handleUserName = (e) => {
    const { name, value } = e.target;
    setUserName(value);
  };
  const handleUserEmail = (e) => {
    const { name, value } = e.target;
    setUserEmail(value);
  };
  const handleBlurUserName = (e) => {
    const { name: fieldName } = e.target;
    const failedFields = validator(userName, fieldName);
    setErrors(() => ({
      ...errors,
      ["userName"]: Object.values(failedFields)[0],
    }));
  };
  const handleBlurUserEmail = (e) => {
    const { name: fieldName } = e.target;
    const failedFields = validator(userEmail, fieldName);
    setErrors(() => ({
      ...errors,
      ["userEmail"]: Object.values(failedFields)[0],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const json = {
      fullName: userName,
      email: userEmail,
      dob: userDob.toString().slice(4, 16),
      areasOfStudy: areasOfStudyChecked,
      classes: finalClassesChosen,
    };
    console.log(json);
    setOpenModal(!openModal);
  };
  const handleOpen = () => {
    setOpenModal(!openModal);
    const filteredClasses = courseCatalog.filter(
      (item) => item.classChosen == true
    );
    setFinalClassesChosen(filteredClasses);
  };
  const updateAreaOfStudyChecked = (topicName, checkedStatus) => {
    const newState = { ...areasOfStudyCheckbox };
    newState[topicName] = checkedStatus;
    setAreasOfStudyCheckbox(newState);
  };
  const updateCourseChecked = (courseId, checkedStatus) => {
    const clickedCourseIndex = courseCatalog.findIndex(
      (course) => course.uuid === courseId
    );
    if (clickedCourseIndex === -1) {
      return;
    }
    const newCourseInfo = [...courseCatalog];
    newCourseInfo[clickedCourseIndex].classChosen = checkedStatus;
    setCourseCatalog(newCourseInfo);
  };
  const isCourseSelectable = (courseId) => {
    if (topicAlreadyChosen(courseId) || chosenDatesOverlapped(courseId)) {
      return false;
    } else {
      return true;
    }
  };
  const chosenDatesOverlapped = (courseId) => {
    const currentCourse = courseCatalog.find(
      (course) => course.uuid === courseId
    );
    const currentStart = currentCourse.startDateValue;
    const currentEnd = currentCourse.endDateValue;
    const filteredCourses = courseCatalog.filter((course) => {
      return course.classChosen == true && course.uuid !== courseId;
    });
    for (let selectedCourse of filteredCourses) {
      const selectedStart = selectedCourse.startDateValue;
      const selectedEnd = selectedCourse.endDateValue;
      if (datesOverlap(currentStart, currentEnd, selectedStart, selectedEnd)) {
        return true;
      }
    }
    return false;
  };
  const datesOverlap = (start1, end1, start2, end2) => {
    let isOverlapped;
    if (
      (start1 >= start2 && start1 < end2) ||
      (end1 >= start2 && end1 < end2) ||
      (start1 <= start2 && end1 >= end2)
    ) {
      isOverlapped = true;
    } else {
      isOverlapped = false;
    }
    return isOverlapped;
  };
  const topicAlreadyChosen = (courseId) => {
    const courseTopic = courseCatalog.find(
      (course) => course.uuid === courseId
    ).topic;
    const selectedSameTopicCourses = courseCatalog.filter(
      (course) =>
        course.uuid != courseId &&
        course.classChosen &&
        course.topic === courseTopic
    );
    if (selectedSameTopicCourses.length) {
      return true;
    } else {
      return false;
    }
  };
  const isValidForm =
    Object.values(errors).filter((error) => typeof error !== "undefined")
      .length === 0;
  return (
    <>
      <div
        style={{
          margin: "auto",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "50%",
        }}
      >
        <form role="form" onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "4rem 2rem",
              }}
            >
              <h1>Media Alpha Form</h1>
              <TextField
                value={userName}
                name="userName"
                title={"Please enter your full name"}
                onChange={handleUserName}
                style={{ marginTop: "1rem" }}
                placeholder={`Enter your full name`}
                error={
                  errors.userName
                    ? "Please enter your full name with no special characters"
                    : false
                }
                helperText={
                  errors.userName
                    ? "Please Enter your full name with no special characters"
                    : false
                }
                onBlur={handleBlurUserName}
                required
              />
              <TextField
                value={userEmail}
                name="userEmail"
                title={"Please enter a valid email"}
                onChange={handleUserEmail}
                style={{ margin: "1rem 0" }}
                placeholder={`someone@gmail.com`}
                error={
                  errors.userEmail
                    ? "Please enter a valid email address"
                    : false
                }
                helperText={
                  errors.userEmail ? "Please enter a valid email" : false
                }
                onBlur={handleBlurUserEmail}
                required
              />
              <DesktopDatePicker
                label="Date of Birth"
                style={{ marginTop: "1rem" }}
                inputFormat="MM/DD/yyyy"
                value={userDob}
                defaultValue={null}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <FormGroup>
                <h3 style={{ marginTop: "1.5rem", textAlign: "center" }}>
                  {`Areas of study (multiple allowed)`}
                </h3>
                <Grid container>
                  {uniqueAreasOfStudy.map((topic, index) => {
                    return (
                      <Grid
                        item
                        md={3}
                        xs={12}
                        style={{
                          display: "inline",
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={topic}
                              value={areasOfStudyCheckbox[topic]}
                              checked={areasOfStudyCheckbox[topic]}
                              onChange={(e) =>
                                updateAreaOfStudyChecked(
                                  topic,
                                  e.target.checked
                                )
                              }
                            />
                          }
                          label={topic}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </FormGroup>
              <FormGroup>
                <h3 style={{ marginTop: "1.5rem", textAlign: "center" }}>
                  Class schedule. One class allowed per area of study. Class
                  will take place every day during the date range.
                </h3>
                <Grid container>
                  {courseCatalog.map((course, index) => {
                    const {
                      topic,
                      startDateText,
                      endDateText,
                      classChosen,
                      uuid,
                    } = course;
                    return (
                      <>
                        <Grid
                          item
                          md={12}
                          xs={12}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={topic}
                                value={classChosen}
                                checked={classChosen}
                                disabled={!isCourseSelectable(uuid)}
                                onChange={(e) => {
                                  updateCourseChecked(uuid, e.target.checked);
                                }}
                              />
                            }
                            label={`${topic}: ${startDateText} - ${endDateText}`}
                          />
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </FormGroup>
            </div>
            <hr style={{ margin: "2rem" }} />
            <Button
              style={{
                backgroundColor: !isValidForm ? "gray" : "green",
                color: "white",
                height: "3rem",
              }}
              onClick={handleOpen}
              disabled={!isValidForm}
            >
              <h4 style={{ padding: "1rem" }}>Submit</h4>
            </Button>
            <Modal
              open={openModal}
              onClose={() => setOpenModal(!openModal)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                style={{
                  maxHeight: "calc(100vh - 210px)",
                  overflowY: "auto",
                  position: "absolute",
                  textAlign: "center",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  backgroundColor: "white",
                  padding: "2rem",
                  border: "2px solid #000",
                  boxShadow: "24",
                  pt: 2,
                  px: 4,
                  pb: 3,
                }}
              >
                <Typography id="modal-modal-title" component="h5">
                  <b>
                    {" "}
                    Are you sure you want to submit? Please review your
                    information below to ensure every thing is correct before
                    submitting
                  </b>
                </Typography>
                <hr style={{ margin: "1rem 0" }} />
                <Typography
                  id="modal-modal-title"
                  style={{ marginTop: "1rem" }}
                >
                  <b>Full Name:</b> {userName}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  style={{ marginTop: "1rem" }}
                >
                  <b>Email:</b> {userEmail}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  style={{ marginTop: "1rem" }}
                >
                  <b>Date of Birth:</b> {userDob.toString().slice(4, 16)}
                </Typography>
                {finalClassesChosen &&
                  finalClassesChosen.map((item, index) => {
                    const { topic, startDateText, endDateText } = item;
                    return (
                      <Typography
                        id="modal-modal-description"
                        style={{ margin: "1rem 0" }}
                      >
                        <b>Class:</b>{" "}
                        {`${topic}: ${startDateText} - ${endDateText}`}
                      </Typography>
                    );
                  })}
                <Button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    height: "3rem",
                  }}
                  onClick={() => setOpenModal(!openModal)}
                >
                  <h4 style={{ padding: "1rem" }}>Cancel</h4>
                </Button>
                <Button
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    height: "3rem",
                    marginLeft: "1rem",
                  }}
                  onClick={handleSubmit}
                >
                  <h4 style={{ padding: "1rem" }}>Submit</h4>
                </Button>
              </Box>
            </Modal>
          </LocalizationProvider>
        </form>
      </div>
    </>
  );
};
export default App;
