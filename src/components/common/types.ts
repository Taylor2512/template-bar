export interface BaseComponentProps {
  class?: string;
  id?: string;
}

export interface ButtonVariant {
  variant?: 'primary' | 'secondary' | 'accent' | 'green' | 'blue' | 'pink' | 'outline';
}

export interface SizeVariant {
  size?: 'sm' | 'md' | 'lg';
}

export interface ColorVariant {
  variant?: 'primary' | 'secondary' | 'accent' | 'green';
}

export interface HoverEffects {
  hoverEffect?: boolean;
  clickable?: boolean;
}

export interface ResponsivePadding {
  padding?: string;
}
