import React from "react";
import { Formik, FormikProps, Form, Field } from "formik";
import { Box, Heading, Button, Flex, Text } from "rebass";
import { projects, activities } from "../constants/index";
import { FieldStyles } from "./styles";
const uuidv1 = require("uuid/v1");

const defaultInitialState = {
  id: null,
  project: 0,
  activity: 0,
  timeFrom: "",
  timeTo: "",
  chargeable: false,
  note: ""
};

class ReportForm extends React.PureComponent {
  handleSubmit = (
    values,
    { setErrors, setStatus, setSubmitting, handleReset, resetForm }
  ) => {
    const { store, clearEdit } = this.props;
    if (values.id) {
      resetForm();
      clearEdit();

      return store.update({
        ...values,
        project: parseInt(values.project),
        activity: parseInt(values.activity)
      });
    } else {
      resetForm();
      return store.add({
        ...values,
        project: parseInt(values.project),
        activity: parseInt(values.activity),
        id: uuidv1()
      });
    }
  };

  render() {
    const { toEdit, clearEdit } = this.props;

    return (
      <Formik
        enableReinitialize={true}
        initialValues={toEdit || defaultInitialState}
        validate={values => {
          let errors = [];

          return errors;
        }}
        onSubmit={this.handleSubmit}
        render={({ values, toEdit }) => {
          return (
            <Form>
              <Flex padding={20}>
                <Box width={380}>
                  <Box my={20}>
                    <Text margin={10}>Projekt</Text>
                    <Field
                      value={values.project}
                      name="project"
                      component="select"
                      style={FieldStyles}
                    >
                      {projects.map(option => (
                        <option key={option.value || 0} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                  </Box>
                  <Box my={20}>
                    <Text my={10} variant="lable">
                      Aktivity
                    </Text>
                    <Field
                      value={values.activity}
                      name="activity"
                      component="select"
                      style={FieldStyles}
                    >
                      {activities.map(option => (
                        <option key={option.value || 0} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                  </Box>
                  <Flex>
                    <Box>
                      <Text>Från</Text>
                      <Field
                        value={values.timeFrom}
                        name="timeFrom"
                        component="input"
                        type="time"
                      />
                    </Box>
                    <Box>
                      <Text>Till</Text>

                      <Field
                        values={values.timeTo}
                        name="timeTo"
                        component="input"
                        type="time"
                      />
                    </Box>
                  </Flex>
                  <Flex my={20}>
                    <Text my={10}>debitera</Text>
                    <Field
                      values={values.chargeable}
                      name="chargeable"
                      component="input"
                      type="checkbox"
                      style={FieldStyles}
                    />
                  </Flex>
                </Box>
                <Box width={380} mx={20} my={20}>
                  <Text>Antekningar</Text>
                  <Field
                    values={values.note}
                    name="note"
                    component="textarea"
                    cols="50"
                    rows={10}
                  />
                  <Box>
                    <Button
                      style={{
                        float: "right",
                        backgroundColor: "green",
                        padding: 10,
                        margin: 5,

                        color: "#fff"
                      }}
                      type="submit"
                    >
                      Spara
                    </Button>
                  </Box>
                </Box>
              </Flex>
            </Form>
          );
        }}
      />
    );
  }
}

export default ReportForm;
