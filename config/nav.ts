import {APPLY_URL, MARKETPLACE_URL} from "@/config/constants";

interface NavItem {
  label: string
  href: string
}

export const navs: NavItem[] = [
  {
    label: 'Marketplace',
    href: MARKETPLACE_URL as string,
  },
  {
    label: 'Apply',
    href: APPLY_URL as string,
  },
  // { label: 'Sell', href: '#' }
]