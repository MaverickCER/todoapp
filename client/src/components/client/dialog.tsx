import { Close } from '@/assets/icons';
import { useSemanticDialog } from '@/hooks/useSemanticDialog';
import { useTranslations } from 'next-intl';
import { MouseEvent, ReactNode, useCallback, useRef } from 'react';

// Define the types for Dialog component props
type TDialogProps = {
  children?: ReactNode; // Content inside the dialog
  className?: string; // Additional class names for styling
  footer?: ReactNode; // Footer content of the dialog
  onClose?: (e?: any) => void; // Callback function to handle closing the dialog
  open: boolean; // Boolean to control dialog visibility
  title?: ReactNode; // Optional title for the dialog
  unmount?: boolean; // If true, unmount the dialog when closed
};

/**
 * @name Dialog
 * @description A reusable Dialog component that supports modal functionality, close button, and i18n.
 * It uses semantic HTML5 <dialog> element to provide dialog functionality, handles focus and
 * accessibility with hooks and custom utility functions.
 * @param {TDialogProps} props - Properties passed to the component.
 * @returns {JSX.Element} A Dialog component rendered as a <dialog> element.
 */
export const Dialog = ({ children, className, footer, onClose, open, title, unmount }: TDialogProps) => {
  // Initialize i18n translation hook
  const t = useTranslations('dialog');

  // Create a reference for the <dialog> element to control its open/close state
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // Hook to manage dialog's semantic functionality (like 'showModal')
  useSemanticDialog(dialogRef, 'showModal', open);

  /**
   * @name close
   * @description Handles the close event of the dialog. Prevents default event behavior
   * and stops propagation. Calls the provided onClose function if available.
   * @param {MouseEvent} e - The mouse event triggered by the click.
   */
  const close = useCallback(
    (e: MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();

      // If onClose callback is provided, execute it
      if (typeof onClose === 'function') onClose();
    },
    [onClose],
  );

  const stopPropagation = useCallback((e: MouseEvent) => {
    e?.stopPropagation();
  }, []);

  return (
    // Dialog element with ref and click handler for closing
    <dialog ref={dialogRef} onClick={close} className=''>
      {/* Conditionally render nothing if unmount is true and dialog is not open */}
      {unmount && !open ? (
        <></>
      ) : (
        // Main section of the dialog containing title, content, and footer
        <section
          className={className ? className : 'bg-brand-gray shadow-lg max-w-md w-full p-6 text-brand-white'}
          onClick={stopPropagation}
        >
          {/* Render header with title and close button if title is provided */}
          {title && (
            <header className='flex justify-between items-center border-b pb-3'>
              <strong className='text-lg font-semibold'>{title}</strong>
              {onClose && (
                // Button to trigger dialog close with translated 'close' title
                <button onClick={close} title={t('close')} className='text-brand-white hover:opacity-70'>
                  <Close />
                </button>
              )}
            </header>
          )}

          {/* Render main content if children are passed */}
          {children && <main className='py-3'>{children}</main>}

          {/* Render footer content if footer is passed */}
          {footer && <footer className='flex justify-around'>{footer}</footer>}
        </section>
      )}
    </dialog>
  );
};

export default Dialog;
