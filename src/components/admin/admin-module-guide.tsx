import { AdminHelpBox } from "./admin-help-box";
import { MODULE_GUIDANCE, type ModuleKey } from "@/lib/admin/cms-guidance";

type AdminModuleGuideProps = {
  module: ModuleKey;
};

export function AdminModuleGuide({ module }: AdminModuleGuideProps) {
  const guidance = MODULE_GUIDANCE[module];

  return (
    <AdminHelpBox title={guidance.listHelpTitle}>
      <ul className="list-disc space-y-1.5 pl-4">
        {guidance.listHelpBullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
      <p className="mt-3 font-medium text-tb-text">{guidance.listNextAction}</p>
    </AdminHelpBox>
  );
}
