import API from "../API/api";

export const getReports = () => {
    return API.get("/reports");
};

export const exportPDF = () => {
    return API.get("/reports/pdf");
};

export const exportExcel = () => {
    return API.get("/reports/excel");
};