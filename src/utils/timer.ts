export function getCurrentDateTimePicker() {
  return new Date(Date.now()).toISOString().slice(0, 16)
}
