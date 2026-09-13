export type EditableCellSaveHandler<TValue> = (value: TValue) => void | Promise<void>

export type EditableCellErrorHandler = (error: unknown) => void

export type EditableSelectOption<TValue extends string = string> = {
  label: string
  value: TValue
  disabled?: boolean
}
