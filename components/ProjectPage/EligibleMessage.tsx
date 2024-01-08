import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import Icon from "../Icon";

interface PropsMessageOwnNFT {
  nftSymbol: String | undefined;
  link: Url;
  amountNFT: number;
}
export function MessageOwnNFT({ nftSymbol, link, amountNFT }: PropsMessageOwnNFT) {
  return (
    <p className="font-semibold text-error italic text-body-12">
      <div>Own <Link href={link}>Zero Collection</Link> to join</div>
      <div>Currently own: {amountNFT} items</div>
      {
        amountNFT > 0 ? (
          <div className="flex items-center gap-1">
            <Icon name='verified' />
            <span className='text-green-500'>Qualified</span>
          </div>
        ) : ''
      }
    </p>
  );
}

interface PropsMessageRoundNotEligible {
  eligibleStatus: boolean,
}
export function MessageRoundNotEligible({ eligibleStatus }: PropsMessageRoundNotEligible) {
  return (
    <p className='text-body-16 font-medium'>
      You are{' '}
      <span className={`font-semibold ${eligibleStatus ? 'text-success' : 'text-error'}`}>
      {eligibleStatus ? 'ELIGIBLE' : 'NOT ELIGIBLE'} 
      </span>
      {' '}to join this round
    </p>
  )
}

interface PropsMessageFollowInstructions {
  or: boolean;
  link: Url;
}
export function MessageFollowInstructions({ or, link }: PropsMessageFollowInstructions) {
  return (
    <>
      {or ?
        (<p className="font-semibold text-error italic text-body-12">
          Or follow these {' '}
          <Link href={link}>
            instructions
          </Link>
          {' '} to be whitelisted.
        </p>) : (<p className="font-semibold text-error italic text-body-12">
          Follow these {' '}
          <Link href={link}>
            instructions
          </Link>
          {' '} to be whitelisted.
        </p>)
      }
    </>
  );
}