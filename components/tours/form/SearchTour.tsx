// creating a for validation helper.
// creating a for validation helper.
import '../../UI/Input/SearchInput.scss';
import SearchInput from '@/components/UI/Input/SearchInput';

function isEmpty(variable: string) {
  return !variable || variable.trim() === ``;
}

export default function SearchTour() {

  return (
    <>
      {/*<FormSearch action={getResults} />*/}
      <form className="flex gap-sm">

        <label>
          <input type={`text`} name={`searchTerm`} className={`all-tours__search-tour-input`}
                 placeholder={`Search for Tours`}
                 required />
        </label>
        <SearchInput
          type={`search`}
          name={`search-term`}
          className={`all-tours__search-tour-input`}
          placeholder={`Search`}
        />

        <button className={`all-tours__search-tour-btn`} style={{ fontFamily: `Inter` }}>Search</button>
        {/*<FormSubmit*/}
        {/*  btnClassName={`all-tours__search-tour-btn`}*/}
        {/*  btnTextIsPending={`Searching...`}*/}
        {/*  btnTextDefault={`Search`} />*/}
      </form>
    </>
  );
}
