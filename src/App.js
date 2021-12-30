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
    classOneStartDate: "",
    classTwoStartDate: "",
    classOneEndDate: "",
    classTwoEndDate: "",
    checked: false,
  },
  {
    name: "Arts",
    classOneStartDate: "",
    classTwoStartDate: "",
    classOneEndDate: "",
    classTwoEndDate: "",
    checked: false,
  },
  {
    name: "Literature",
    classOneStartDate: "",

    classOneEndDate: "",

    checked: false,
  },
  {
    name: "Music",
    classOneStartDate: "",
    classTwoStartDate: "",
    classOneEndDate: "",
    classTwoEndDate: "",
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
      <div style={{ margin: "auto", textAlign: "center" }}>
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
                style={{ marginTop: "1rem" }}
                placeholder={`someone@gmail.com`}
                error={errors.email ? true : false}
                helperText={errors.email ? "Please enter a valid email" : false}
                onBlur={handleBlur}
                required
              />
              <DesktopDatePicker
                label="Date of Birth"
                inputFormat="MM/dd/yyyy"
                // value={value}
                value="Value"
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <FormGroup>
                <h1 style={{ marginTop: "1.5rem", textAlign: "center" }}>
                  Areas of study
                </h1>
                <Grid container>
                  {initAreaOfStudyState.map((areaOfStudyItem, index) => {
                    const { name, checked } = areaOfStudyItem;
                    return (
                      <Grid item md={6} xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={name}
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
