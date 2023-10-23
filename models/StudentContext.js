import { createRealmContext } from "@realm/react";
import { Student } from "./Student";
import { Attendance } from "./Attendance";

export default createRealmContext({
    schema : [Student,Attendance],
    schemaVersion: 1,
})