import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { Address, Hash } from "viem";
import Button from "../Button";

interface PropsMessageClaimSuccess {
  profileAddress: Address;
  txHash: Hash;
}
export default function MessageClaimSuccess({ profileAddress, txHash }: PropsMessageClaimSuccess) {
  return (
    <div>
      <p className="mb-2">Your NFT(s) has been successfully claimed!</p>
      <div className="flex items-center gap-1">
        <Link href={`https://marketplace-dev.uniultra.xyz/user/${profileAddress}`} className="hover:underline text-primary">
          <Button scale="sm">
            View your profile
          </Button>
        </Link>
        <Link href={`https://testnet.u2uscan.xyz/tx/${txHash}`} className="hover:underline text-primary">
          <Button variant="secondary" scale="sm">
            View transaction
          </Button>
        </Link>
      </div>
    </div>
  )
}