export const classNames = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ')
}

export const shortenAddress = (str: string, head: number = 6, tail: number = 4) => {
  return `${str.substring(0, head)}...${str.substring(str.length - tail)}`
}