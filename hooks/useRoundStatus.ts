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

export const useRoundsWithStatus = (rounds: Round[]) => {
  const roundsWithStatus: (Round & { status: RoundStatus })[] = useMemo(() => {
    return rounds.map(round => ({ ...round, status: getRoundStatus(round) }))
  }, [rounds])

  const activeRoundIndex = useMemo(() => {
    const mintingRoundIndex = roundsWithStatus.findIndex(round => round.status === 'MINTING')
    if (mintingRoundIndex > -1) return mintingRoundIndex

    const lastEndedRoundIndex = roundsWithStatus.length - roundsWithStatus.reverse().findIndex(round => round.status === 'ENDED')
    if (lastEndedRoundIndex > -1) {
      return lastEndedRoundIndex + 1 < roundsWithStatus.length ? lastEndedRoundIndex + 1 : lastEndedRoundIndex
    }
    return 0
  }, [roundsWithStatus])

  const activeRound = useMemo(() => roundsWithStatus[activeRoundIndex], [roundsWithStatus, activeRoundIndex])

  return {
    roundsWithStatus,
    activeRoundIndex,
    activeRound
  }
}