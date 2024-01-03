import { abis } from '@/abi'
import { Round } from '@/types'

export const classNames = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ')
}

export const shortenAddress = (str: string, head: number = 6, tail: number = 4) => {
  return `${str.substring(0, head)}...${str.substring(str.length - tail)}`
}

export const parseQueries = (queries?: Record<string, any>) => {
  if (!queries) return ''
  return '?' + Object.entries(queries)
    .filter(([_, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0
      }
      return value !== null && value !== undefined && value !== '';
    })
    .map(([key, value]) => `${key}=${value}`).join("&")
}

export const formatDisplayedBalance = (value: string | number, digits = 2) => {
  if (!value) return '0'

  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup.slice().reverse().find(function(item) {
    return Number(value) >= item.value;
  });

  return item ? (Number(value) / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export const formatThousandDelimiter = (value: string | number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getRoundAbi = (round: Round) => {
  const { type: roundType } = round
  return abis[roundType]
}