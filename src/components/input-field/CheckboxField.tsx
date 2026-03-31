import { useRef } from "react";

import styles from "./InputField.module.css";

interface CheckboxFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  options?: string[];
  activeList?: string[];
  title: string;
  name: string;
  onCheckClient: (value: string, remove: boolean) => void;
}

export const CheckboxField = ({
  activeList,
  options,
  name,
  title,
  onCheckClient,
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
              ? `Select client(s)`
              : `${activeList.length} client${activeList.length === 1 ? "" : "s"} selected`}
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
                    name="client"
                    value={option}
                    onChange={(e) =>
                      onCheckClient(option, !e.currentTarget.checked)
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
