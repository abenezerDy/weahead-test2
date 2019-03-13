import React from "react";
import { projects, activities } from "../constants/index";

import { Box, Button, Flex } from "rebass";
import { observer, inject } from "mobx-react";

const RaportListHeader = () => (
  <Flex py={5}>
    <Box mx={1} width={200} px={4} bg="lightgray">
      PROJEKT
    </Box>
    <Box mx={1} width={200} px={4} bg="lightgray">
      AKTIVITET{" "}
    </Box>
    <Box mx={1} width={200} px={4} bg="lightgray">
      FRÅN
    </Box>
    <Box mx={1} width={200} px={4} bg="lightgray">
      TILL
    </Box>
    <Box mx={1} width={500} px={4} bg="lightgray">
      ANTEKNIGAR
    </Box>
    <Box mx={1} px={4} bg="lightgray">
      ACTIONS
    </Box>
  </Flex>
);

const ReportList = ({ store, handelEdit }) => {
  return (
    <Box>
      <RaportListHeader />
      {store.reportStore &&
        store.reportStore.map((report, id) => {
          return (
            <Flex key={report.id}>
              <Box mx={2} px={1} width={200}>
                {projects[report.project] ? projects[report.project].label : ""}
              </Box>
              <Box mx={2} px={1} width={200}>
                {activities[report.activity]
                  ? activities[report.activity].label
                  : ""}
              </Box>
              <Box mx={2} px={1} width={200}>
                {report.timeFrom}
              </Box>
              <Box mx={2} px={1} width={200}>
                {report.timeTo}
              </Box>
              <Box mx={2} px={1} width={500}>
                {report.note}
              </Box>
              <Box mx={2} px={1}>
                <button onClick={() => handelEdit(report)}>Editera</button>
                <button onClick={() => store.remove(report)}>delete</button>
              </Box>
            </Flex>
          );
        })}
      <Box> SUMMA TOTAL TID: {(store.summerizeTime(9) / 3600).toString()}</Box>
    </Box>
  );
};

export default inject("store")(observer(ReportList));
