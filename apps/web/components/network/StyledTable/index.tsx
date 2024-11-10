import React, { useEffect, useState } from "react";
import s from "./StyledTable.module.scss";
import { exampleData } from "./list.data";
import { useInViewport } from "@mantine/hooks";
import { motion } from "framer-motion";
import { transition } from "@/pages/login/+Page";
import { Collapse } from "@mantine/core";
import { useTypedTranslation } from "@/i18n/useTypedTranslation";

export interface TableRow {
  id: string;
  col1: string;
  col2: string;
  col3: string;
  description: string;
}

// index.tsx
const TableRowComponent: React.FC<{
  row: TableRow;
  isExpanded: boolean;
  onToggle: () => void;
  index?: number;
}> = ({ row, isExpanded, onToggle, index = 1 }) => {
  const { ref, inViewport } = useInViewport();
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (inViewport) {
      setInit(true);
    }
  }, [inViewport]);

  return (
    <React.Fragment>
      <motion.tr
        ref={ref}
        onClick={onToggle}
        className={s.tableRow}
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={init ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
        transition={{
          ...transition,
          duration: 0.06,
          delay: index * 0.05,
        }}
      >
        {init ? (
          <>
            <td>{row.col1}</td>
            <td>{row.col2}</td>
            <td>{row.col3}</td>
          </>
        ) : (
          <td colSpan={3} />
        )}
      </motion.tr>
      <tr>
        <td colSpan={3} className={s.expanded}>
          <Collapse in={isExpanded}>
            <div className={s.expanded__content}>{row.description}</div>
          </Collapse>
        </td>
      </tr>
    </React.Fragment>
  );
};
export const StyledTable: React.FC<{ data?: TableRow[] }> = ({ data = exampleData }) => {
  const { t } = useTypedTranslation();
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [rowReady, setRowReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setRowReady(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={s.tableContainer}>
      <table className={s.table}>
        <thead>
          <tr>
            <th>{t("provider:table_column1")}</th>
            <th>{t("provider:table_column2")}</th>
            <th>{t("provider:table_column3")}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <TableRowComponent
              key={row.id}
              row={row}
              index={rowReady ? 1 : index}
              isExpanded={expandedRowId === row.id}
              onToggle={() => setExpandedRowId(expandedRowId === row.id ? null : row.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
