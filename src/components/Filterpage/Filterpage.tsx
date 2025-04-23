import React, { useState } from 'react'
import Select from 'react-select';
import countriesData from './countries.json';
import categorysData from './categorys.json';
import './Filterpage.css';

type Country = {
  name: string;
  code: string;
};

type CountryOption = {
  value: string;
  label: string;
};

type CategoryOption = {
  value: string;
  label: string;
};

type Category = string;

const Filterpage = () => {
  const [query, setQuery] = useState<string>(''); // value must be URL-encoded and the maximum character limit permitted is 100
  const [selectedCountries, setSelectedCountries] = useState<CountryOption[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<CategoryOption[]>([]);

  const countries: Country[] = countriesData as Country[];
  const categories: Category[] = categorysData.categorys as Category[];

  const countryOptions: CountryOption[] = countries.map((c) => ({
    value: c.code,
    label: c.name,
  }));

  const categoryOptions: CategoryOption[] = categories.map((cat) => ({
    value: cat,
    label: cat
  }));

  return (
    <div className='filterpage-container'>
      <h1>Filtern</h1>
      <form>
        <div className="form-group">
          <label htmlFor="query">Suchen</label>
          <input
            type="text"
            name="query"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxLength={100}
          />
        </div>

        <div className='form-group'>
          <label htmlFor="countries">Länder</label>
          <div className='countrie-select-container'>
            <Select
              isMulti
              name="countries"
              options={countryOptions}
              className="countrie-select"
              classNamePrefix="select"
              placeholder="Länder auswählen..."
              onChange={(selected) => setSelectedCountries(selected as CountryOption[])}
              value={selectedCountries}
            />
          </div>
        </div>

        <div className='form-group'>
          <label htmlFor="categories">Kategorien</label>
          <div className='category-button-container'>
            {categoryOptions.map((category) => (
              <button
                key={category.value}
                className={selectedCategories.some(sc => sc.value === category.value) ? 'category-button-selected' : 'category-button'}
                onClick={() => {
                  if (selectedCategories.some(sc => sc.value === category.value)) {
                    // If already selected, remove it
                    setSelectedCategories(selectedCategories.filter(sc => sc.value !== category.value));
                  } else {
                    // If not selected, add it
                    setSelectedCategories([...selectedCategories, category]);
                  }
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        <button type="submit" className="submit-button">Anwenden</button>
      </form>
    </div>
  );
};

export default Filterpage;