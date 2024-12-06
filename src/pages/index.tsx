import Layout from "@/components/Layout";

export default function Home() {
  const timeline = [
    {
      id: 5,
      platform: "Substack",
      name: "jimnemorin.substack.com",
      description: 'Sometime I write',
    },
    {
      id: 4,
      platform: "X.com",
      name: "@jimnemorin",
      description: 'I post on the everything app',
    },
    {
      id: 3,
      platform: "TikTok",
      name: "@jimnemorin",
      description: 'I make bizzare video on TikTok',
    },
    {
      id: 2,
      platform: "Instagram",
      name: "@jimnemorin",
      description: 'You can see my pictures on IG',
    },
    {
      id: 1,
      platform: "YouTube",
      name: "@jimescapes",
      description: 'I make videos',
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto p-10 rounded-md bg-black bg-opacity-50">
        <h1 className="text-4xl font-bold mb-6 text-center text-white">Online Acc</h1>
        <ul className="max-w-300 mx-auto">
          {timeline.map((entry) => (
            <li key={entry.id} className="mb-4 p-4 rounded-md bg-gray-900 bg-opacity-70">
              <div className="flex items-center">
                <div className="ml-4">
                  <h2 className="text-2xl font-bold mb-2 text-white">{entry.platform} - {entry.name}</h2>
                  <p className="text-base text-gray-300">{entry.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
