const itemOptionTable = {
  tire: {
    width: {
      title: "단면폭",
      detail: {
        start: 155,
        end: 305,
        step: 10,
      },
    },
    profile: {
      title: "편평비",
      detail: {
        start: 30,
        end: 80,
        step: 5,
      },
    },
    size: {
      title: "인치",
      detail: {
        start: 13,
        end: 23,
        step: 1,
      },
    },
    brand: {
      title: "브랜드",
      detail: ["금호", "한국", "미쉐린", "컨티넨탈", "피렐리"],
    },
    condition: {
      title: "컨디션",
      detail: {
        start: 70,
        end: 90,
        step: 10,
      },
    },
  },
  wheel: {
    size: {
      title: "인치",
      detail: {
        start: 13,
        end: 23,
        step: 1,
      },
    },
  },
};
export default itemOptionTable;
