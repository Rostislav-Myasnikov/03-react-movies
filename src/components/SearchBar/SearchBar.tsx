import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userQuery = formData.get("query") as string;

    if (userQuery === "") {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(userQuery);
    e.currentTarget.reset();
  };

  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <a
            className={css.link}
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by TMDB
          </a>

          <form className={css.form} onSubmit={handleSubmit}>
            <input
              className={css.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={css.button} type="submit">
              Search
            </button>
          </form>
        </div>
      </header>

      <Toaster />
    </>
  );
}

export default SearchBar;
