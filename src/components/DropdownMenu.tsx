import { useRef, useState } from 'react';
import Button from './ui/Button';
import { LanguageState, updateLanguage } from '../stores/slices/languageSlice';
import { ThemeState } from '../stores/slices/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useSpring, animated } from '@react-spring/web';
import { Icon } from '@iconify/react';
import '../styles/components/dropdown-menu.scss';
import useDetectOuterClick from '../hooks/useDetectOuterClick';

const DropdownMenu = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const theme = useSelector((state: { theme: ThemeState }) => state.theme);

  const language = useSelector(
    (state: { language: LanguageState }) => state.language
  );

  const dispatch = useDispatch();

  const toggleMenu = () => setIsMenuActive(!isMenuActive);

  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  useDetectOuterClick({
    elementRef: dropdownMenuRef,
    handleFunctions: () => {
      setIsMenuActive(false);
    },
  });

  const animatedDivStyles = useSpring({
    from: {
      opacity: 0,
      display: 'none',
    },
    to: [
      { display: 'flex' },
      { opacity: isMenuActive ? 1 : 0, y: isMenuActive ? 20 : 0 },
      { display: isMenuActive ? 'flex' : 'none' },
    ],
    config: {
      duration: 150,
    },
  });

  const itemSelectedClassNameFrench =
    theme === 'light' && language === 'french'
      ? 'item-selected-light'
      : theme === 'dark' && language === 'french'
      ? 'item-selected-dark'
      : '';

  const itemSelectedClassNameEnglish =
    theme === 'light' && language === 'english'
      ? 'item-selected-light'
      : theme === 'dark' && language === 'english'
      ? 'item-selected-dark'
      : '';

  const dropdownMenuClassName =
    theme === 'light' && isMenuActive
      ? 'dropdown-menu-container dropdown-menu-container-light'
      : theme === 'dark' && isMenuActive
      ? 'dropdown-menu-container dropdown-menu-container-dark'
      : 'dropdown-menu-container';

  const buttonClassName =
    theme === 'light'
      ? 'button button-basic-light'
      : 'button button-basic-dark';

  return (
    <Button onClick={toggleMenu} className={buttonClassName}>
      <Icon icon="material-symbols:language" />
      <animated.div
        style={animatedDivStyles}
        ref={dropdownMenuRef}
        className={dropdownMenuClassName}
      >
        <ul>
          <li
            className={itemSelectedClassNameFrench}
            onClick={() => dispatch(updateLanguage('french'))}
          >
            Français
          </li>
          <li
            className={itemSelectedClassNameEnglish}
            onClick={() => dispatch(updateLanguage('english'))}
          >
            English
          </li>
        </ul>
      </animated.div>
    </Button>
  );
};

export default DropdownMenu;
