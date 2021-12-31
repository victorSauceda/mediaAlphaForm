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

let initAreaOfStudyState = [
  {
    name: "Sports",
    classOneStartDateValue: 7.23,
    classOneStartDateText: "July 23rd",
    classOneEndDateValue: 8.23,
    classOneEndDateText: "August 23rd",
    classTwoStartDateValue: 8.26,
    classTwoStartDateText: "August 26th",
    classTwoEndDateValue: 9.26,
    classTwoEndDateText: "September 26th",
    checked: false,
  },
  {
    name: "Arts",
    classOneStartDateValue: 5.1,
    classOneStartDateText: "May 10th",
    classOneEndDateValue: 6.1,
    classOneEndDateText: "June 10th",
    classTwoStartDateValue: 7.11,
    classTwoStartDateText: "July 11th",
    classTwoEndDateValue: 8.11,
    classTwoEndDateText: "August 11th",
    checked: false,
  },
  {
    name: "Literature",
    classOneStartDateValue: 7.11,
    classOneStartDateText: "July 11th",
    classOneEndDateValue: 10.11,
    classOneEndDateText: "October 11th",
    checked: false,
  },
  {
    name: "Music",
    classOneStartDateValue: 6.09,
    classOneStartDateText: "June 9th",
    classOneEndDateValue: 7.09,
    classOneEndDateText: "July 9th",
    classTwoStartDateValue: 8.09,
    classTwoStartDateText: "August 9th",
    classTwoEndDateValue: 9.09,
    classTwoEndDateText: "September 9th",
    checked: false,
  },
];
const initState = {
  fullName: "",
  email: "",
};

const App = () => {
  const [checkBoxState, setCheckBoxState] = useState(
    initAreaOfStudyState.map((i) => false)
  );
  const submit = () => {
    console.log(" Submited");
  };
  const { handleChange, handleBlur, stateValue, errors, handleSubmit } =
    useFormFields({
      initState,
      callback: submit,
      validator,
    });
  const { fullName, email, bday } = stateValue;
  const isCheckboxChecked = (index, checked) => {
    setCheckBoxState((checkBoxState) => {
      return checkBoxState.map((c, i) => {
        if (i === index) return checked;
        return c;
      });
    });
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
                value={email}
                name="fullName"
                title={"Please enter your full name"}
                onChange={handleChange}
                style={{ marginTop: "1rem" }}
                placeholder={`Enter your full name`}
                error={errors.email ? true : false}
                helperText={
                  errors.email ? "Please Enter your full name" : false
                }
                onBlur={handleBlur}
                required
              />

              <TextField
                value={email}
                name="email"
                title={"Please enter a valid email"}
                onChange={handleChange}
                style={{ margin: "1rem 0" }}
                placeholder={`someone@gmail.com`}
                error={errors.email ? true : false}
                helperText={errors.email ? "Please enter a valid email" : false}
                onBlur={handleBlur}
                required
              />
              <DesktopDatePicker
                label="Date of Birth"
                style={{ marginTop: "1rem" }}
                inputFormat="MM/dd/yyyy"
                // value={value}
                value="Value"
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <FormGroup>
                <h3 style={{ marginTop: "1.5rem", textAlign: "center" }}>
                  {`Areas of study (multiple allowed)`}
                </h3>
                <Grid container>
                  {initAreaOfStudyState.map((areaOfStudyItem, index) => {
                    const {
                      name,

                      checked,
                    } = areaOfStudyItem;
                    return (
                      <Grid
                        item
                        md={3}
                        xs={12}
                        style={{
                          display: "inline",
                          // verticalAlign: "middle",
                          // margin: "auto",
                          // alignItems: "flex-start",
                        }}
                      >
                        <FormControlLabel
                          style={
                            {
                              // display: "inline",
                              // verticalAlign: "middle",
                              // margin: "auto",
                              // alignItems: "flex-start",
                              //   justifyContent: "flex-start",
                              //   display: "flex",
                              //   flexDirection: "row",
                              //   margin: "auto",
                            }
                          }
                          control={
                            <Checkbox
                              name={name}
                              // style={{
                              //   justifyContent: "center",
                              //   display: "flex",
                              //   alignItems: "left",
                              // }}
                              value={checked}
                              checked={checkBoxState[index]}
                              onChange={(e) =>
                                isCheckboxChecked(index, e.target.checked)
                              }
                            />
                          }
                          label={name}
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
                  {initAreaOfStudyState.map((areaOfStudyItem, index) => {
                    const {
                      name,

                      classOneStartDateText,

                      classOneEndDateText,

                      classTwoStartDateText,

                      classTwoEndDateText,
                      checked,
                    } = areaOfStudyItem;
                    return (
                      <>
                        <Grid
                          item
                          md={12}
                          xs={12}
                          style={{
                            // margin: "auto",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={name}
                                value={checked}
                                checked={checkBoxState[index]}

                                // onChange={(e) =>
                                //   isCheckboxChecked(index, e.target.checked)
                                // }
                              />
                            }
                            label={`${name}: ${classOneStartDateText} - ${classOneEndDateText}`}
                          />
                        </Grid>
                        {classTwoEndDateText && (
                          <Grid
                            item
                            md={12}
                            xs={12}
                            style={{
                              // margin: "auto",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "flex-start",
                            }}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name={name}
                                  value={checked}
                                  checked={checkBoxState[index]}
                                  // onChange={(e) =>
                                  //   isCheckboxChecked(index, e.target.checked)
                                  // }
                                />
                              }
                              label={`${name}: ${classTwoStartDateText} - ${classTwoEndDateText}`}
                            />
                          </Grid>
                        )}
                      </>
                    );
                  })}
                </Grid>
              </FormGroup>
            </div>

            <hr style={{ margin: "2rem" }} />
            <Button
              type="submit"
              // disabled={true}
            >
              <h4 style={{ padding: "1rem" }}>Submit</h4>
            </Button>
          </LocalizationProvider>
        </form>
      </div>
    </>
  );
};

export default App;
