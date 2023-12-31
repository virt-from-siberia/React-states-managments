import { useFetchRepositories } from "./hooks/useRepos";
import { Repository } from "./hooks/types";
import { Card } from "./components/Card";

const App = () => {
  const { data, isLoading } = useFetchRepositories();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.map((repository: Repository) => (
        <Card repository={repository} />
      )) || []}
    </div>
  );
};

export default App;
