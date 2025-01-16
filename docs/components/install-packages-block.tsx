import { Tab, Tabs } from "fumadocs-ui/components/tabs";

type InstallPackagesBlockProps = {
  commands: {
    pnpm?: string;
    npm: string;
    yarn?: string;
    bun?: string;
  };
  groupId: string;
};

const InstallPackagesBlock = ({ commands, groupId }: InstallPackagesBlockProps) => {
  return (
      <Tabs groupId={groupId} items={Object.keys(commands)}>
        {Object.entries(commands).map(([key, value]) => (
          <Tab value={key}>{value}</Tab>
        ))}
      </Tabs>
  );
};

export default InstallPackagesBlock;
