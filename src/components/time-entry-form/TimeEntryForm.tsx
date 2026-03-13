import Form from "next/form";
import styles from "./TimeEntryForm.module.css";
import { Button } from "../button/Button";

interface TimeEntryFormProps {
  closeModal: () => void;
}

export const TimeEntryForm = ({ closeModal }: TimeEntryFormProps) => {
  return (
    <>
      <span className={styles.title}>New event</span>
      <Form action="/search">
        <input name="client" required type="text" />
        <input name="activity" required type="text" />
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit">Add event</Button>
      </Form>
    </>
  );
};
