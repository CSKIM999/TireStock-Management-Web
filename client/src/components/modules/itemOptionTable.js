import * as Axios from "axios";
Axios.get(`/api/tires/items`).then((response) => {
  delete response.data.data[0]._id;
  const data = response.data.data[0];
  Object.keys(data).forEach((item) => {
    itemOptionTable.tire[item].detail = data[item].sort();
  });
});
Axios.get(`/api/wheels/items`).then((response) => {
  delete response.data.data[0]._id;
  const data = response.data.data[0];
  Object.keys(data).forEach((item) => {
    itemOptionTable.wheel[item].detail = data[item].sort();
  });
});
let itemOptionTable = {
  tire: {
    width: {
      title: "단면폭",
      detail: [],
    },
    profile: {
      title: "편평비",
      detail: [],
    },
    size: {
      title: "인치",
      detail: [],
    },
    brand: {
      title: "브랜드",
      detail: [],
    },
    condition: {
      title: "컨디션",
      detail: [],
    },
  },
  wheel: {
    region: {
      title: "수입",
      detail: ["전체", "국산", "수입"],
    },
    design: {
      title: "디자인",
      detail: ["전체", "일반", "커팅"],
    },
    size: {
      title: "인치",
      detail: [],
    },
  },
};

export default itemOptionTable;
