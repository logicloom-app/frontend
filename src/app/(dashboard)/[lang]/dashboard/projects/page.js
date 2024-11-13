import { getDictionary } from "@/lib/utils/dictionary";
import ProjectsList from "./_components/ProjectsList";

export default async function Projects({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return <ProjectsList dict={dict?.dashboard?.projects} />;
}
