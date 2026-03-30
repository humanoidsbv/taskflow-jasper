import { useRef } from "react";

import styles from "./InputField.module.css";

interface CheckboxFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  options?: string[];
  name: string;
  onCheckClient: (value: string, remove: boolean) => void;
}

export const CheckboxField = ({
  options,
  name,
  onCheckClient,
  ...props
}: CheckboxFieldProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <fieldset className={styles.dropdown}>
      <button
        className={styles.selectBox}
        onClick={() => dialogRef.current?.show()}
      >
        Select client(s)
      </button>
      <dialog
        className={styles.layover}
        ref={dialogRef}
        onMouseDown={(e) =>
          e.target === dialogRef.current && dialogRef.current.close()
        }
      >
        {options &&
          options.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                name="client"
                value={option}
                onChange={(e) =>
                  onCheckClient(option, !e.currentTarget.checked)
                }
              />
              {option}
            </label>
          ))}
      </dialog>
    </fieldset>
  );
};
