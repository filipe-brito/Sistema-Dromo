import PeopleRecords from "@features/records/people/pages/PeopleRecords";
import IndividualCreatePage from "@features/records/people/pages/IndividualCreatePage";
import CompanyCreatePage from "@features/records/people/pages/CompanyCreatePage";
import IndividualEditPage from "@features/records/people/pages/IndividualEditPage";
import CompanyEditPage from "@features/records/people/pages/CompanyEditPage";
import { Route, Routes } from "react-router-dom";
import React from "react";

const PeopleRecordsRoutes = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/people" element={<PeopleRecords />} />
        <Route path="/individual/create" element={<IndividualCreatePage />} />
        <Route path="/company/create" element={<CompanyCreatePage />} />
        <Route path="/individual/edit/:id" element={<IndividualEditPage />} />
        <Route path="/company/edit/:id" element={<CompanyEditPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default PeopleRecordsRoutes;
