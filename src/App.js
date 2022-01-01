import { useState } from "react";
import "./App.css";
import {
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Grid,
  Checkbox,
} from "@mui/material";
import { validator } from "../src/helpers/formValidator";
import useFormFields from "../src/hooks/useFormFields";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterMoment";

const classesList = [
  {
    topic: "Arts",
    startDateText: "May 10th",
    startDateValue: 5.1,
    endDateText: "June 10th",
    endDateValue: 6.1,
    classChosen: false,
    uuid: "arts_1",
  },
  {
    topic: "Arts",
    startDateText: "July 11th",
    startDateValue: 7.11,
    endDateText: "August 11th",
    endDateValue: 8.11,
    classChosen: false,
    uuid: "arts_2",
  },
  {
    topic: "Literature",
    startDateText: "July 11th",
    startDateValue: 7.11,
    endDateText: "October 11th",
    endDateValue: 10.11,
    classChosen: false,
    uuid: "literature_1",
  },
  {
    topic: "Music",
    startDateText: "June 9th",
    startDateValue: 6.09,
    endDateText: "July 9th",
    endDateValue: 5.1,
    classChosen: false,
    uuid: "music_1",
  },
  {
    topic: "Music",
    startDateText: "August 9th",
    startDateValue: 8.09,
    endDateText: "September 9th",
    endDateValue: 9.09,
    classChosen: false,
    uuid: "music_2",
  },
  {
    topic: "Sports",
    startDateText: "July 23rd",
    startDateValue: 7.23,
    endDateText: "August 23rd",
    endDateValue: 8.23,
    classChosen: false,
    uuid: "sports_1",
  },
  {
    topic: "Sports",
    startDateText: "August 26th",
    startDateValue: 8.26,
    endDateText: "September 26th",
    endDateValue: 9.26,
    classChosen: false,
    uuid: "sports_2",
  },
];
const App = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userDob, setUserDob] = useState(new Date("2014-08-18T21:11:54"));
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
  const [isSubmited, setIsSubmited] = useState(false);

  const submit = () => {
    console.log(" Submited");
  };

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
    const { name: fieldName } = e.target;
    setIsSubmited(true);
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
    console.log("Is Overlapped? ", isOverlapped);
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
              <h1>Class Form</h1>
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
                                onChange={
                                  (e) => {
                                    console.log(e);
                                    updateCourseChecked(uuid, e.target.checked)
                                  }
                 
                                }
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
              // type="submit"
              onClick={() => setIsSubmited(!isSubmited)}
              // disabled={true}
            >
              <h4 style={{ padding: "1rem" }}>Submit</h4>
            </Button>
            {isSubmited && (
              <div>
                <p>{userName}</p>
                <p>{userEmail}</p>
              </div>
            )}
          </LocalizationProvider>
        </form>
      </div>
    </>
  );
};
export default App;
