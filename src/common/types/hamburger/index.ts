export interface IHamburgerProps {
  className?: string;
  color?: HamburgerColorType;
  isActive?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  children?: React.ReactNode;
}

type HamburgerColorType = 'black' | 'white';
