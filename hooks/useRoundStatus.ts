import { Round, RoundStatus } from '@/types'
import { useMemo } from 'react'

const getRoundStatus = (round: Round) => {
  const startTime = new Date(round.start).getTime()
  const endTime = new Date(round.end).getTime()
  switch (true) {
    case Date.now() >= startTime && Date.now() <= endTime:
      return 'MINTING'
    case Date.now() > endTime:
      return 'ENDED'
    case Date.now() < startTime:
    default:
      return 'UPCOMING'
  }
}

export const useRoundStatus = (round: Round): RoundStatus => {
  return useMemo(() => getRoundStatus(round), [round])
}

export const useRoundsWithStatus = (rounds: Round[]): (Round & { status: RoundStatus })[] => {
  return useMemo(() => {
    return rounds.map(round => ({ ...round, status: getRoundStatus(round) }))
  }, [rounds])
}