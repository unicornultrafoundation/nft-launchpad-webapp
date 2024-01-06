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
          <div>
            <Icon name='verified' />
            <span className='text-green-500'>Qualified</span>
          </div>
        ) : ''
      }
    </p>
  );
}

export function MessageRoundNotEligible() {
  return (
    <p className="font-semibold text-error italic text-body-12">
      You are not eligible to join this round
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

export function MessageProjectNotEligible() {
  return (
    <div className="w-full flex gap-4 my-4 px-6 py-4 rounded-2xl bg-surface-soft/50 border border-error">
      <svg
        viewBox="0 0 24 24"
        className="text-error"
        fill="none"
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2597 5.26315C13.2597 4.56553 12.6942 4 11.9966 4C11.2989 4 10.7334 4.56553 10.7334 5.26315V12C10.7334 12.6976 11.2989 13.2631 11.9966 13.2631C12.6942 13.2631 13.2597 12.6976 13.2597 12V5.26315ZM11.9966 17.4736C11.2989 17.4736 10.7334 18.0391 10.7334 18.7368C10.7334 19.4344 11.2989 19.9999 11.9966 19.9999H12.012C12.7096 19.9999 13.2751 19.4344 13.2751 18.7368C13.2751 18.0391 12.7096 17.4736 12.012 17.4736H11.9966Z"
          fill="currentColor" />
      </svg>

      <div className="flex flex-col gap-1">
        <p className="font-semibold text-error italic text-body-12">
          You are not eligible to join this project.
        </p>
      </div>
    </div>
  );
}