import Layout from "@/components/Layout";

export default function Home() {
  const projects = [
    { id: 1, name: "Some basic model", description: 'Some <a href="https://github.com/name/Models" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">cs50ai pset</a> I have worked on.' },
    { id: 2, name: "Prompt Engineering", description: 'Translated educative content about prompt engineering from English to French for <a href="https://www.promptingguide.ai/" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">promptingguide.ai</a>' },
  ];

  const skills = [
    { id: 1, name: "DL Practitioner", title: "I have some basic experience about deep learning and I am in ongoing learning and experiencing." },
  ];

  projects.reverse();
  skills.reverse();
  return (
    <Layout>
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-6 mx-auto text-center sm:text-center">Projects</h1>
        <ul className="mx-500 max-w-300">
          {projects.map((project) => (
            <li key={project.id} className="mb-4 p-4 rounded-md">
              <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
              <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-300" dangerouslySetInnerHTML={{ __html: project.description }} />
            </li>
          ))}
        </ul>

        {/* Skills Section */}
        <div className="mt-10">
          <h2 className="text-4xl font-bold mb-6 mx-auto text-center sm:text-center">Skills</h2>
          <ul className="mx-500 max-w-300">
            {skills.map((skill) => (
              <li key={skill.id} className="mb-4 p-4 rounded-md ">
                <h2 className="text-2xl font-bold mb-2">{skill.name}</h2>
                <p className="text-base text-gray-300">{skill.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
