export const classNames = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ')
}

export const shortenAddress = (str: string, head: number = 6, tail: number = 4) => {
  return `${str.substring(0, head)}...${str.substring(str.length - tail)}`
}

export const parseQueryString = (queries: Record<string, any>) => {
  return Object.entries(queries)
    .filter(([_, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0
      }
      return value !== null && value !== undefined && value !== '';
    })
    .map(([key, value]) => `${key}=${value}`).join("&")
}