import { MutableRefObject, useEffect } from 'react';

/**
 * @name useSemanticDialog
 * @description Custom hook to manage the visibility of a semantic dialog element.
 * This hook provides a way to show or close the dialog based on the `open` state.
 *
 * @param {MutableRefObject<HTMLDialogElement | null>} ref - A ref pointing to the dialog element.
 * @param {'show' | 'showModal'} method - Method to call on the dialog ('show' or 'showModal').
 * @param {boolean} open - Boolean indicating whether the dialog should be opened.
 */
export const useSemanticDialog = (
  ref: MutableRefObject<HTMLDialogElement | null>,
  method: 'show' | 'showModal',
  open: boolean,
) => {
  useEffect(() => {
    const dialog = ref.current; // Get the current dialog reference
    if (!dialog) return; // Exit if the dialog reference is null

    if (open) {
      const dialogMethod = dialog[method]; // Access the specified method (show or showModal)
      // If open is true, show the dialog
      if (typeof dialogMethod === 'function') {
        dialogMethod.call(dialog); // Call the method to show the dialog
      }
    } else {
      // If open is false, close the dialog
      const closeMethod = dialog.close; // Access the close method
      if (typeof closeMethod === 'function') {
        closeMethod.call(dialog); // Call the method to close the dialog
      }
    }
  }, [open, method, ref]); // Dependency array includes open state, method, and ref
};

export default useSemanticDialog;
