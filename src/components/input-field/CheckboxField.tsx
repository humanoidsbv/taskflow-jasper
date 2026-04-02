import { useRef } from "react";

import styles from "./InputField.module.css";
import { UpdateCheckboxParamsInput } from "../filters/useFilterParams";

interface CheckboxFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  numberChecked?: number;
  name: string;
  onCheck: ({ value, remove, name }: UpdateCheckboxParamsInput) => void;
  options?: string[];
  title: string;
}

export const CheckboxField = ({
  name,
  numberChecked = 0,
  onCheck,
  options,
  title,
}: CheckboxFieldProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className={styles.container}>
      <span className={styles.label}>{title}</span>

      <fieldset className={styles.dropdown}>
        <div
          className={styles.input}
          onClick={() => {
            if (dialogRef.current?.open) {
              dialogRef.current?.close();
            } else {
              dialogRef.current?.show();
            }
          }}
        >
          <span>
            {numberChecked === 0
              ? `Select ${name}(s)`
              : `${numberChecked} ${name}${numberChecked === 1 ? "" : "s"} selected`}
          </span>
        </div>
        <dialog
          className={styles.layover}
          closedby="any"
          ref={dialogRef}
          onMouseDown={(e) =>
            e.target === dialogRef.current && dialogRef.current.close()
          }
        >
          <div className={styles.dialogContainer}>
            {options &&
              options.map((option) => (
                <label key={option} className={styles.checkLabel}>
                  <input
                    type="checkbox"
                    name={name}
                    value={option}
                    onChange={(e) =>
                      onCheck({
                        name,
                        remove: !e.currentTarget.checked,
                        value: option,
                      })
                    }
                  />
                  {option}
                </label>
              ))}
          </div>
        </dialog>
      </fieldset>
    </div>
  );
};
