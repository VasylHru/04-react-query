
import toast from "react-hot-toast";
import style from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleFormAction = (formData: FormData) => {
    const query = (formData.get("query") as string).trim();

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(query);
  };

  return (
    <header className={style.header}>
      <div className={style.container}>
        <a
          className={style.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={style.form} action={handleFormAction}>
          <input
            className={style.input}
            type="text"
            name="query"
            aria-label="Search movies"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={style.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
