'use client'

import Button, { ButtonProps } from '@/components/Button'
import Modal from 'react-modal'
import { useEffect, useState } from 'react'
import { Connector, useAccount, useConnect, useNetwork, useSwitchNetwork } from 'wagmi'
import Icon from '@/components/Icon'
import { toast } from 'react-toastify'
import { CHAIN_ID } from '@/config/constants'
import { classNames } from '@/utils'

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '16px'
  },
  overlay: {
    background: 'rgba(0,0,0,0.5)'
  }
}

export default function ConnectWalletButton({ children, className, ...rest }: ButtonProps) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const { isConnected } = useAccount()
  const { connect, connectors, pendingConnector, isLoading } = useConnect()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const handleConnect = async (connector: Connector) => {
    try {
      while (!connector.ready) {
      }
      connect({ connector })
    } catch (e) {
      console.error('Error connecting wallet:', e)
    } finally {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (!!chain?.id && chain?.id !== Number(CHAIN_ID)) {
      toast.warning(<p className="whitespace-nowrap">Wrong network detected</p>, {
        toastId: 'changeNetwork',
        position: 'bottom-center',
        closeOnClick: false,
        autoClose: false,
        closeButton: ({ closeToast }) => (
          <div
            className="cursor-pointer whitespace-nowrap flex justify-center items-center text-body-14 font-semibold text-info mr-2"
            onClick={(e) => {
              switchNetwork?.(Number(CHAIN_ID))
              closeToast(e)
            }}
          >Change now</div>
        )
      })
    }
  }, [chain]);

  return (
    <>
      <div className={isConnected ? '' : 'hidden'}>
        {children}
      </div>
      <Button className={classNames(className, isConnected ? 'hidden' : '')} {...rest} onClick={() => setIsOpen(true)}>
        Connect wallet
      </Button>
      <Modal
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customModalStyles}
        contentLabel="Connect wallet"
      >
        <div className="p-6">
          <h1 className="text-heading-sm font-semibold text-center mb-6">Choose connect method</h1>

          <div className="w-full flex flex-col gap-2">
            {
              connectors.map(connector => {
                return (
                  <div
                    key={connector.id}
                    className="cursor-pointer px-4 py-3 border border-gray-200 rounded-[20px]
                      flex items-center gap-2 transition-all hover:bg-gray-100 hover:border-transparent"
                    onClick={() => handleConnect(connector)}>
                    <Icon name={connector.id} width={28} height={28} />
                    <p className="text-body-14">
                      {connector.name}
                    </p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </Modal>
    </>
  )
}