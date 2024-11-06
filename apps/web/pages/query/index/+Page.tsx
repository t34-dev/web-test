import React from "react";
import { useData } from "vike-react/useData";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";
import { useAppStore } from "@/store/appStore";
import { Todo } from "@/pages/query/types";
import { Data } from "./+data";
import { useTypedTranslation } from "@/i18n/useTypedTranslation";
import { Button } from "@repo/ui";

export default function Page() {
  const { t, formatDate, formatNumber, hasTranslation } = useTypedTranslation();
  const initialData = useData<Data>();
  const count = useAppStore((state) => state.count);
  const increment = useAppStore((state) => state.increment);

  const { data, isLoading, isError } = useQuery<Todo | null>({
    queryKey: ["todos"],
    queryFn: () => api.get("/todos/1"),
    initialData,
    staleTime: 1000 * 60,
    retry: 1,
  });

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (isError || !data) {
    return <div className="p-4">Error loading data</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">React Query + Zustand</h1>
      <div className="mb-4">
        <p className="mb-2">Count: {count}</p>
        <Button onClick={increment}>Increment</Button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Data from API:</h2>
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
        <div className="mt-4">
          <p>Title: {data?.title}</p>
          <p>Completed: {data?.completed ? "Yes" : "No"}</p>
          <p>ID: {data?.id}</p>
          <p>User ID: {data?.userId}</p>
        </div>
      </div>
      <hr />

      <div>
        {/* Типизированный перевод */}
        <h1>
          {t("common:welcome", {
            defaultValue: "Welcome!",
            params: { name: "John" },
          })}
        </h1>

        {/* Форматирование даты с учетом локали */}
        <p>Date: {formatDate(new Date())}</p>

        {/* Форматирование числа с учетом локали */}
        <p>Number: {formatNumber(1234567.89)}</p>

        {/* Проверка наличия перевода */}
        {hasTranslation("common:name") && <button>{t("common:name")}</button>}
      </div>
    </div>
  );
}
