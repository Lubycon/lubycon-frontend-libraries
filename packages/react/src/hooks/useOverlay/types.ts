export interface OverlayControllerProps {
  isOpen: boolean;
  close: () => void;
}
export type OverlayController = (props: OverlayControllerProps) => JSX.Element;
