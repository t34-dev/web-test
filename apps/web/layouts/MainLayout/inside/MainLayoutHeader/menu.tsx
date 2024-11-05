type Menu = {
  key: string;
  label: string;
  path: string;
};

export const headerMenu: Menu[] = [
  { key: "home", label: "Главная", path: "/" },
  { key: "blog", label: "Блог", path: "/blog/222222" },
  {
    key: "profile",
    label: "Профайл",
    path: "/profile?name=2222",
  },
  { key: "settings", label: "Настройки", path: "/settings/222?name=2222" },
  { key: "labs", label: "Лаборатория", path: "/labs" },
];
