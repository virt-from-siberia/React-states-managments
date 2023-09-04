import useFetchRepos from "./queries/repo";

import { Card } from "./components";

function App() {
  const { data } = useFetchRepos("CarlosLevir");

  const addToFavorites = (id: string): void => {
    console.log("lol");
  };

  return (
    <>
      {data?.map((repo) => (
        <Card key={repo.id} repo={repo} addToFavorites={addToFavorites} />
      ))}
    </>
  );
}

export default App;
