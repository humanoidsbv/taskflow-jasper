import { useRef } from "react";

import styles from "./InputField.module.css";

interface CheckboxFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  activeList?: string[];
  name: string;
  onCheck: (value: string, remove: boolean) => void;
  options?: string[];
  title: string;
}

export const CheckboxField = ({
  activeList,
  name,
  onCheck,
  options,
  title,
  ...props
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
            {!activeList || activeList.length === 0
              ? `Select ${name}(s)`
              : `${activeList.length} ${name}${activeList.length === 1 ? "" : "s"} selected`}
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
                    onChange={(e) => onCheck(option, !e.currentTarget.checked)}
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
