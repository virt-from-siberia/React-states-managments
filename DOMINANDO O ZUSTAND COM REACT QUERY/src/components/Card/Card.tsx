import { IRepo } from "../../queries/repo/types";
import "./styles.css";

type CardProps = {
  repo: IRepo;
  addToFavorites: (id: number) => void;
};

export const Card = ({ repo, addToFavorites }: CardProps) => {
  function handleCompleteTodo(): void {
    addToFavorites(repo.id);
  }

  return (
    <div className="card">
      <h2>{repo.name}</h2>
      <div className="card-buttons">
        <button onClick={handleCompleteTodo}>Favorit</button>
      </div>
    </div>
  );
};
