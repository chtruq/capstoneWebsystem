import React, { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tableText } from "@/lib/utils/project";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  data: any
}

const ProviderTabsDetails: FC<Props> = ({ data }) => {
  console.log("data provieaaee", data);

  return (
    <div className="w-full">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-fit grid-cols-3">
          <TabsTrigger value="overview">Tong quan</TabsTrigger>
          <TabsTrigger value="projects">Du an</TabsTrigger>
          <TabsTrigger value="files">Tai lieu lien quan</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="overview">
          <h1>thonog tin</h1>
        </TabsContent>
        <TabsContent className="w-full" value="projects">
          <h1>du an</h1>
        </TabsContent>
        <TabsContent className="w-full" value="files">
          <h1>tai lieu</h1>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default ProviderTabsDetails;