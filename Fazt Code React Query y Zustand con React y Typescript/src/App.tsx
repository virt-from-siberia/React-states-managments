import { useFetchRepositories } from "./hooks/useRepos";
import { Repository } from "./hooks/types";
import { useFavoriteReposStore } from "./store/favoriteRepos";

import { Card } from "./components/Card";

const App = () => {
  const { data, isLoading } = useFetchRepositories();
  const { favoriteReposIds, removeFavoriteRepo, addFavoriteRepo } =
    useFavoriteReposStore();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.map((repository: Repository) => (
        <Card
          key={repository.id}
          repository={repository}
          isFavorite={favoriteReposIds.includes(repository.id)}
        />
      )) || []}
    </div>
  );
};

export default App;
