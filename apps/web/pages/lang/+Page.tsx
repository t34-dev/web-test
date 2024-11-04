import React from "react";
import { useTypedTranslation } from "@/i18n/useTypedTranslation";
import { T } from "@/i18n/T/T";

export { Page };

function Page() {
  const { language, t } = useTypedTranslation();

  return (
    <div className="p-4">
      <div className="mb-4">
        <p>Current locale: {language}</p>
      </div>

      <h1 className="text-2xl font-bold mb-4">
        <T k={"common:welcome"} default="Welcome, {{name}}!" params={{ name: "User" }} />
      </h1>

      <div className="space-y-4">
        <p>
          <T
            k="common:agreement"
            default="I agree to terms"
            params={{ terms: t("common:name"), privacy: t("common:name") }}
          />
        </p>
      </div>
    </div>
  );
}
