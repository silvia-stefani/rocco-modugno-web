import { IModuleActions } from "../interfaces/IModuleActions";

export const moduleActions: IModuleActions[] = [
  {
    id: "change_module_minus",
    key: "ArrowLeft",
    icon: "←→",
    label: {
      it:  "Configurazione",
      en: "Configuration"
    }
  },
  { //modificato da R
    id: "change_module_plus",
    key: "ArrowRight",
    icon: "",
    label: {
      it:  "",
      en: ""
    }
  }, 
  {
    id: "enlarge_text",
    key: "ArrowUp",
    icon: "↑↓",
    label: {
      it: "Scala",
      en: "Size"
    }
  },
  
  { //modificato da R
    id: "reduce_text",
    key: "ArrowDown",
    icon: "",
    label: {
      it: "",
      en: ""
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
      it: "Forma",
      en: "Shape"
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
      it: "Tabula Rasa",
      en: "Clear All"
    }
  },
];

