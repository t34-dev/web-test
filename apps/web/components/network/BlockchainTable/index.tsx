// index.tsx
import React from "react";
import { Table, Collapse, Paper } from "@mantine/core";
import { useWindowVirtualizer } from "@tanstack/react-virtual"; // Изменен импорт
import { useState } from "react";
import { useViewportSize, useWindowScroll } from "@mantine/hooks";
import { dataXX } from "./list.data";
import s from "./BlockchainTable.module.scss";

// Типы данных
export interface BlockchainNode {
  id: string;
  name: string;
  nodesActive: number;
  nodesInactive: number;
  requests: {
    total: number;
    perSecond: number;
  };
  hardFork: string;
  mainnetEndpoints: string[];
  testnetEndpoints: string[];
}

interface RowProps {
  item: BlockchainNode;
  isExpanded: boolean;
  onToggle: () => void;
}

// Заголовки таблицы
const headers = [
  { key: "name", label: "Blockchain nodes" },
  { key: "requests", label: "Requests in 24h" },
  { key: "hardFork", label: "Mainnet hard fork" },
  { key: "mainnetEndpoints", label: "Mainnet endpoint link" },
  { key: "testnetEndpoints", label: "Testnet endpoint link" },
];

// Компонент строки
const TableRow = ({ item, isExpanded, onToggle }: RowProps) => (
  <>
    <tr onClick={onToggle} style={{ cursor: "pointer" }}>
      <td>
        <div className={s.nodeCell}>
          <div className={s.nodeCellIcon} />
          <div className={s.nodeCellInfo}>
            <div>{item.name}</div>
            <div className={s.nodeCellStats}>
              <span className={s.nodeCellStatsActive}>{item.nodesActive}</span>
              <span className={s.nodeCellStatsInactive}>{item.nodesInactive}</span>
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className={s.requests}>
          <div>{item.requests.total.toLocaleString()}</div>
          <div>{item.requests.perSecond} per second</div>
        </div>
      </td>
      <td>{item.hardFork || "—"}</td>
      <td>
        <div className={s.endpoints}>
          {item.mainnetEndpoints.map((endpoint) => (
            <Paper key={endpoint} p="xs" radius="sm">
              {endpoint}
            </Paper>
          ))}
        </div>
      </td>
      <td>
        <div className={s.endpoints}>
          {item.testnetEndpoints.map((endpoint) => (
            <Paper key={endpoint} p="xs" radius="sm">
              {endpoint}
            </Paper>
          ))}
        </div>
      </td>
    </tr>
    <tr>
      <td colSpan={5} style={{ padding: 0 }}>
        <Collapse in={isExpanded}>
          <div style={{ padding: "16px" }}>Expanded content for {item.name}</div>
        </Collapse>
      </td>
    </tr>
  </>
);

// Основной компонент
export const BlockchainTable = ({ data = dataXX }: { data?: BlockchainNode[] }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [scroll] = useWindowScroll();
  const { height } = useViewportSize();

  const rowVirtualizer = useWindowVirtualizer({
    count: data.length,
    estimateSize: () => 60,
    overscan: 5,
  });

  return (
    <Table className={s.table}>
      <Table.Thead>
        <tr>
          {headers.map((header) => (
            <th key={header.key}>{header.label}</th>
          ))}
        </tr>
      </Table.Thead>
      <Table.Tbody>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const item = data[virtualRow.index];
          return (
            <TableRow
              key={item.id}
              item={item}
              isExpanded={expandedId === item.id}
              onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
            />
          );
        })}
      </Table.Tbody>
    </Table>
  );
};
