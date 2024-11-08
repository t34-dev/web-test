// index.tsx
import React from "react";
import { Table, Collapse, Paper } from "@mantine/core";
import { useWindowVirtualizer } from "@tanstack/react-virtual"; // Изменен импорт
import { useState } from "react";
import { useDebouncedValue, useInViewport, useViewportSize, useWindowScroll } from "@mantine/hooks";
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
  // { key: "requests", label: "Requests in 24h" },
  // { key: "hardFork", label: "Mainnet hard fork" },
  // { key: "mainnetEndpoints", label: "Mainnet endpoint link" },
  // { key: "testnetEndpoints", label: "Testnet endpoint link" },
];

// Компонент строки
const TableRow = ({ item, isExpanded, onToggle }: RowProps) => {
  const { ref, inViewport } = useInViewport();
  return (
    <>
      <tr ref={ref} onClick={onToggle} style={{ cursor: "pointer", height: "5rem" }}>
        {inViewport && <td style={{ background: inViewport ? "green" : "red" }}>{item.id}</td>}
      </tr>
      <tr>
        <td colSpan={1} style={{ padding: 0 }}>
          <Collapse in={isExpanded}>
            <div style={{ padding: "16px" }}>Expanded content for {item.name}</div>
          </Collapse>
        </td>
      </tr>
    </>
  );
};

// Основной компонент
// index.tsx
export const BlockchainTable = ({ data = dataXX }: { data?: BlockchainNode[] }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // const { height: viewportHeight } = useViewportSize();
  // const [scroll] = useWindowScroll();
  // const [debouncedScroll] = useDebouncedValue(scroll, 10);
  //
  // const rowVirtualizer = useWindowVirtualizer({
  //   count: data.length,
  //   estimateSize: () => 80,
  //   overscan: 3,
  //   scrollMargin: viewportHeight * 0.1,
  //   measureElement: (element) => {
  //     if (!element) return 80;
  //     return element.getBoundingClientRect().height;
  //   },
  // });
  //
  // const virtualItems = rowVirtualizer.getVirtualItems();
  // const totalSize = rowVirtualizer.getTotalSize();

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
        {/* Удаляем первый пустой блок, если virtualItems не пустой */}
        {/*{virtualItems.length > 0 && virtualItems[0].start > 0 && (*/}
        {/*  <tr>*/}
        {/*    <td colSpan={5}>*/}
        {/*      <div style={{ height: virtualItems[0].start }} />*/}
        {/*    </td>*/}
        {/*  </tr>*/}
        {/*)}*/}

        {data.map((virtualRow) => {
          const item = virtualRow;
          return (
            <TableRow
              key={item.id}
              item={item}
              isExpanded={expandedId === item.id}
              onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
            />
          );
        })}

        {/* Добавляем нижний падинг только если есть ещё элементы */}
        {/*{virtualItems.length > 0 && virtualItems[virtualItems.length - 1].end < totalSize && (*/}
        {/*  <tr>*/}
        {/*    <td colSpan={5}>*/}
        {/*      <div*/}
        {/*        style={{*/}
        {/*          height: totalSize - virtualItems[virtualItems.length - 1].end,*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    </td>*/}
        {/*  </tr>*/}
        {/*)}*/}
      </Table.Tbody>
    </Table>
  );
};
