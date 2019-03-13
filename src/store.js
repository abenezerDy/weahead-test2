import { types, destroy } from "mobx-state-tree";
import { calculateTimeDifference } from "./js/utils/timeUtil";

export const Report = types
  .model("report", {
    id: types.identifier,
    project: types.optional(types.integer, 0),
    activity: types.optional(types.integer, 0),
    timeFrom: types.optional(types.string, ""),
    timeTo: types.optional(types.string, ""),
    chargeable: types.optional(types.boolean, false),
    note: types.optional(types.string, "")
  })
  .actions(self => ({
    update(newProject) {
      self.project = newProject.project;
      self.activity = newProject.activity;
      self.timeFrom = newProject.timeFrom;
      self.timeTo = newProject.timeTo;
      self.chargeable = newProject.chargeable;
      self.note = newProject.note;
    }
  }));

export const ReportStore = types
  .model("reportStore", {
    reportStore: types.array(Report)
  })
  .actions(self => ({
    add(report) {
      self.reportStore.push(report);
    },
    remove(report) {
      destroy(report);
    },
    update(report) {
      const temp = self.reportStore.filter(r => r.id === report.id)[0];
      self.remove(temp);
      self.add(report);
    },
    summerizeTime() {
      let timeDelta = 0;

      self.reportStore.map(r => {
        if (r && r.timeFrom !== "" && r.timeTo !== "") {
          timeDelta = timeDelta + calculateTimeDifference(r.timeFrom, r.timeTo);
        }
      });
      return timeDelta;
    }
  }))
  .views(self => ({
    get lengt() {
      return self.reportStore.length;
    }
  }));

export default ReportStore;
