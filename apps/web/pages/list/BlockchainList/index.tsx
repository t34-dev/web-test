// BlockchainList.tsx
import React, { useState } from "react";
import { Card, UnstyledButton, Modal, Group, Text } from "@mantine/core";
import { Faders } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { blockchainData, Subnet } from "./list.data";
import s from "./BlockchainList.module.scss";

interface SettingsModalProps {
  subnet: Subnet | null;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ subnet, onClose }) => {
  if (!subnet) return null;

  return (
    <Modal opened={!!subnet} onClose={onClose} title={`Settings: ${subnet.name}`}>
      <div>
        <Text>RPC URL: {subnet.settings.rpcUrl}</Text>
        <Text>Chain ID: {subnet.settings.chainId}</Text>
        {/* Другие настройки */}
      </div>
    </Modal>
  );
};

export const BlockchainList: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [modalData, setModalData] = useState<Subnet | null>(null);

  return (
    <div className={s.list}>
      {blockchainData.map((blockchain) => (
        <Card key={blockchain.id} className={s.blockchainCard} radius="md" withBorder>
          <UnstyledButton
            onClick={() => setExpandedId(expandedId === blockchain.id ? null : blockchain.id)}
            className={s.header}
          >
            <Group justify="space-between" w="100%">
              <Group>
                {blockchain.icon && <img src={blockchain.icon} alt="" width={24} height={24} />}
                <Text fw={500}>{blockchain.name}</Text>
              </Group>
              <Faders className={s.chevron} data-expanded={expandedId === blockchain.id} size={20} />
            </Group>
          </UnstyledButton>

          <AnimatePresence>
            {expandedId === blockchain.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={s.content}
              >
                {blockchain.subnets.map((subnet) => (
                  <div key={subnet.id} className={s.subnet}>
                    <Group justify="space-between" wrap="nowrap">
                      <Text size="sm">{subnet.name}</Text>
                      <UnstyledButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalData(subnet);
                        }}
                        className={s.settingsButton}
                      >
                        <Faders size={18} />
                      </UnstyledButton>
                    </Group>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}

      <SettingsModal subnet={modalData} onClose={() => setModalData(null)} />
    </div>
  );
};
