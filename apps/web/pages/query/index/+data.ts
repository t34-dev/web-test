import { useConfig } from "vike-react/useConfig";
import { api } from "@/utils/api";
import { Todo } from "@/pages/query/types";

export type Data = Awaited<ReturnType<typeof data>>;

export const data = async () => {
  try {
    const config = useConfig();
    const todoData = (await api.get("/todos/1")) as Todo;

    if (!todoData) {
      console.error("No data received from API");
      return null;
    }

    config({
      title: `Todo: ${todoData.title}`,
    });

    return todoData;
  } catch (error) {
    console.error("Data fetching error:", error);
    return null;
  }
};
