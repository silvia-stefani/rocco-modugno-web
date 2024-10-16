import { IModuleActions } from "../interfaces/IModuleActions";

export const moduleActions: IModuleActions[] = [
  {
    id: "change_module_minus",
    key: "ArrowLeft",
    icon: "←",
    label: {
      it:  "Nodo",
      en: "Node"
    }
  },
  {
    id: "change_module_plus",
    key: "ArrowRight",
    icon: "→",
    label: {
      it:  "Nodo",
      en: "Node"
    }
  },
  {
    id: "enlarge_text",
    key: "ArrowUp",
    icon: "↑",
    label: {
      it: "Misura",
      en: "Size"
    }
  },
  {
    id: "reduce_text",
    key: "ArrowDown",
    icon: "↓",
    label: {
      it: "Misura",
      en: "Size"
    }
  },
  {
    id: "rotate_text",
    key: "r",
    icon: "R",
    label: {
      it: "Rotazione",
      en: "Rotation"
    }
  },
  {
    id: "change_shape",
    key: "m",
    icon: "M",
    label: {
      it: "Modulo",
      en: "Module"
    }
  },
  {
    id: "undo_all",
    key: "z",
    icon: "Z",
    label: {
      it: "Cancella",
      en: "Undo"
    }
  },
  {
    id: "undo_action",
    key: "a",
    icon: "A",
    label: {
      it: "Ricominciare",
      en: "Clear"
    }
  },
];

