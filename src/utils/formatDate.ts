import moment from "moment";

export const formatNomalDate = (dateString?: string | null) => {
  if (dateString) {
    return moment(dateString).format("DD/MM/YYYY");
  } else {
    return "";
  }
};
