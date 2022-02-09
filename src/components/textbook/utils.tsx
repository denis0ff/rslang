export const getProp = (e: React.MouseEvent<HTMLButtonElement>): string => {
  return JSON.parse(e.currentTarget.dataset.prop || '')
}
