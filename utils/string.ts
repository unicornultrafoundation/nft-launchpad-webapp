export const classNames = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ')
}

export const shortenAddress = (str: string = '', head: number = 6, tail: number = 4) => {
  if (!str) return ''
  return `${str.substring(0, head)}...${str.substring(str.length - tail)}`
}


export const truncate = ({ str, headCount = 5, tailCount = 4 }: {
  str: any ;
  headCount?: number;
  tailCount?: number;
}) => {
  if (!str || headCount > str.length - tailCount) {
    return str
  }
  return str.substring(0, headCount - 1) + '....' + str.substring(str.length - tailCount - 1)
}