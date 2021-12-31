import { useWatchMe } from "../hooks/useWatchMe";
import { Button } from "./Button";

export function SideBar() {
  const { genres, changeSelectedGenre, selectedGenre } = useWatchMe();

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => changeSelectedGenre(genre.id)}
            selected={selectedGenre.id === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
