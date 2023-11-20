import Layout from "@/components/Layout";

export default function Home() {
  const projects = [
    {
      id: 1,
      name: "Some Basic Model",
      description: 'A <a href="https://github.com/jim707t/Models" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">cs50ai pset</a> I have worked on.',
    },
    {
      id: 2,
      name: "Prompt Engineering",
      description: 'Translated educative content about prompt engineering from English to French for <a href="https://www.promptingguide.ai/" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">promptingguide.ai</a>',
    },
  ];

  const skills = [
    {
      id: 1,
      name: "DL Practitioner",
      title: "I have some basic experience with deep learning and am continuously learning and experimenting.",
    },
    {
      id: 2,
      name: "Prompt engineer",
      title: "I can build product with LLM API. I have advanced knowledge about prompting technics." 
    }
  ];

  projects.reverse();
  skills.reverse();

  return (
    <Layout>
      <div className="container mx-auto p-10 rounded-md">
        <div>
          <h1 className="text-4xl font-bold mb-6 text-center">Projects</h1>
          <ul className="max-w-300 mx-auto">
            {projects.map((project) => (
              <li key={project.id} className="mb-4 p-4 rounded-md">
                <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
                <p className="text-base text-gray-300" dangerouslySetInnerHTML={{ __html: project.description }} />
              </li>
            ))}
          </ul>
        </div>

        {/* Skills Section */}
        <div>
          <h2 className="text-4xl font-bold mb-6 text-center">Skills</h2>
          <ul className="max-w-300 mx-auto">
            {skills.map((skill) => (
              <li key={skill.id} className="mb-4 p-4 rounded-md">
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
