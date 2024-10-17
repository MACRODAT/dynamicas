export const SET_3D_PRINT = 'SET_3D_PRINT';
export const SET_NOZZLE_DIAMETER = 'SET_NOZZLE_DIAMETER';
export const SET_PRINTING_SPEED = 'SET_PRINTING_SPEED';
export const SET_FILAMENT_DIAMETER = 'SET_FILAMENT_DIAMETER';
export const SET_FILLING_PERCENT = 'SET_FILLING_PERCENT';
export const PROCESS_SET_PROCESS = 'ProcessSetProcess';

interface Set3DPrintAction {
  type: typeof SET_3D_PRINT;
  payload: boolean;
}

interface ProcessSetProcess {
  type: typeof PROCESS_SET_PROCESS;
  payload: string;
}

interface SetNozzleDiameterAction {
  type: typeof SET_NOZZLE_DIAMETER;
  payload: number;
}

interface SetPrintingSpeedAction {
  type: typeof SET_PRINTING_SPEED;
  payload: number;
}

interface SetFilamentDiameterAction {
  type: typeof SET_FILAMENT_DIAMETER;
  payload: number;
}

interface SetFillingPercentAction {
  type: typeof SET_FILLING_PERCENT;
  payload: number;
}

export type ProcessActions =
  | Set3DPrintAction
  | SetNozzleDiameterAction
  | SetPrintingSpeedAction
  | SetFilamentDiameterAction
  | ProcessSetProcess
  | SetFillingPercentAction;
