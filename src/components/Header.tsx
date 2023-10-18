import Button from './ui/Button';
import DropdownMenu from './DropdownMenu';
import { updateTheme, ThemeState } from '../stores/slices/themeSlice';
import { LanguageState } from '../stores/slices/languageSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import '../styles/components/header.scss';

const Header = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state: { theme: ThemeState }) => state.theme);

  const language = useSelector(
    (state: { language: LanguageState }) => state.language
  );

  const handleModifyTheme = () => {
    if (theme === 'light') {
      dispatch(updateTheme('dark'));
    }

    if (theme === 'dark') {
      dispatch(updateTheme('light'));
    }
  };

  const buttonClassName =
    theme === 'light'
      ? 'button button-basic-light'
      : 'button button-basic-dark';

  const dayIcon = <Icon icon="entypo:light-up" />;
  const nightIcon = <Icon icon="material-symbols:mode-night-rounded" />;

  const titleContent = language === 'french' ? 'Application' : 'App';

  const buttonTheme = theme === 'light' ? dayIcon : nightIcon;

  return (
    <header className="header-container">
      <h1 className="title-header-container">{titleContent}</h1>
      <div className="header-menu-container">
        <Button onClick={handleModifyTheme} className={buttonClassName}>
          {buttonTheme}
        </Button>
        <DropdownMenu />
      </div>
    </header>
  );
};

export default Header;
