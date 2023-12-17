'use client'

import Button, { ButtonProps } from '@/components/Button'
import Modal from 'react-modal'
import { useState } from 'react'
import { Connector, useAccount, useConnect } from 'wagmi'
import Icon from '@/components/Icon'

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

export default function ConnectWalletButton({ children, ...rest }: ButtonProps) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const { isConnected } = useAccount()
  const { connect, connectors, pendingConnector, isLoading } = useConnect()

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

  if (isConnected) {
    return children
  }

  return (
    <>
      <Button {...rest} onClick={() => setIsOpen(true)}>
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