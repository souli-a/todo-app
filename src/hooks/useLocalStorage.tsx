import { useEffect } from 'react';

type State = 'light' | 'dark' | 'french' | 'english' | '';
type Item = 'language' | 'theme';

interface UseLocalStorageProps {
  setter: (state: State) => void;
  localStorageItemName: Item;
  state: State;
}

const useLocalStorage = ({
  setter,
  localStorageItemName,
  state,
}: UseLocalStorageProps) => {
  useEffect(() => {
    const localStorageValue = localStorage.getItem(
      `${localStorageItemName}`
    ) as State;

    const browserTheme = window.matchMedia('(prefers-color-scheme: light)')
      .matches
      ? 'light'
      : 'dark';

    const browserLanguage =
      navigator.language === 'fr' || navigator.language === 'fr-FR'
        ? 'french'
        : 'english';

    if (state && state !== localStorageValue) {
      localStorage.setItem(`${localStorageItemName}`, state);
      if (typeof setter === 'function') {
        setter(state);
      }
    }

    if (!state && localStorageValue) {
      setter(localStorageValue);
    }

    if (localStorageItemName === 'theme' && !localStorageValue && !state) {
      setter(browserTheme);
      localStorage.setItem(`${localStorageItemName}`, browserTheme);
    }

    if (localStorageItemName === 'language' && !localStorageValue && !state) {
      setter(browserLanguage);
      localStorage.setItem(`${localStorageItemName}`, browserLanguage);
    }
  }, [state, setter, localStorageItemName]);

  return null;
};

export default useLocalStorage;
