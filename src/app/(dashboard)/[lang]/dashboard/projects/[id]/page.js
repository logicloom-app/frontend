import { getDictionary } from "@/lib/utils/dictionary";
import ProjectDetails from "./_components/ProjectDetails";

export default async function ProjectPage({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <ProjectDetails params={params} dict={dict?.dashboard?.projects} />;
}
