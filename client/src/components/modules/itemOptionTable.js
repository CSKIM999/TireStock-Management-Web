const itemOptionTable = {
  tire: {
    width: {
      title: "단면폭",
      detail: Array.from({ length: 15 }, (_, i) => 155 + i * 10),
    },
    profile: {
      title: "편평비",
      detail: Array.from({ length: 11 }, (_, i) => 30 + i * 5),
    },
    size: {
      title: "인치",
      detail: Array.from({ length: 11 }, (_, i) => 13 + i * 1),
    },
    brand: {
      title: "브랜드",
      detail: ["금호", "한국", "미쉐린", "컨티넨탈", "피렐리"],
    },
    condition: {
      title: "컨디션",
      detail: Array.from({ length: 10 }, (_, i) => 100 - i * 5),
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
      detail: Array.from({ length: 11 }, (_, i) => 13 + i * 1),
    },
  },
};
export default itemOptionTable;
