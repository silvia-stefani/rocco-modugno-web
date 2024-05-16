export type keyboardModuleEvents = 
"change_module_minus"
| "change_module_plus"
| "enlarge_text"
| "reduce_text"
| "rotate_text"
| "change_shape"
| "undo_action"
| "undo_all"

export interface IModuleActions   {
    id: keyboardModuleEvents,
    key: string,
    icon: string,
    label: {
      it:  string,
      en: string
    }
  }